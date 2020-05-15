import * as http from 'http-status-codes';
import {
    notificationsDelete,
    notificationsGet,
    notificationsPut,
    sessionDelete,
    settingsGet,
} from '../libs/apiService.js';
import {parseNotification} from '../libs/notificationsParser.js';
import responseSwitchBuilder from '../libs/responseSwitchBuilder.js';
import webSocket from '../libs/webSocketWrapper.js';

/**
 * Main header model
 */
export default class HeaderModel {
    /**
     * Model constructor
     * @param {Object} eventBus to share events with main header view
     */
    constructor(eventBus) {
        this.eventBus = eventBus;

        this.socket = webSocket;

        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.logout = this.logout.bind(this);
        this.getNotifications = this.getNotifications.bind(this);
        this.getNotificationsCount = this.getNotificationsCount.bind(this);
        this.readNotifications = this.readNotifications.bind(this);
        this.deleteNotifications = this.deleteNotifications.bind(this);
        this.socketMessageHandler = this.socketMessageHandler.bind(this);

        this.eventBus.subscribe('getData', this.getUserData);
        this.eventBus.subscribe('submitLogout', this.logout);
        this.eventBus.subscribe('getNotifications', this.getNotifications);
        this.eventBus.subscribe('readNotifications', this.readNotifications);
        this.eventBus.subscribe('deleteNotifications', this.deleteNotifications);

        this.socket.subscribe('message', this.socketMessageHandler);

        this.notificationEvents = new Set(['AssignOnTask', 'InviteToBoard', 'AddComment']);
        this.notificationCounter = 0;

        const errorResponseStatusMap = new Map([
            [http.UNAUTHORIZED, () => this.eventBus.call('unauthorized')],
            [http.INTERNAL_SERVER_ERROR, () => console.log(500)],
            ['default', null],
        ]);

        this.handleResponseStatus = responseSwitchBuilder(errorResponseStatusMap).bind(this);
    }

    /**
     * Reaction for success login or getUserData event
     * Triggers view rerender
     * @param {Object} userData - logged in user data
     */
    onLogin(userData) {
        this.authorized = true;
        userData.auth = true;
        this.eventBus.call('gotData', userData);
        this.getNotificationsCount();
    }

    /**
     * Reaction for global event bus logout event
     */
    onLogout() {
        this.authorized = false;
        this.eventBus.call('logout', {auth: false}); // trigger view render
    }

    /**
     * Use api to logout user
     */
    async logout() {
        sessionDelete().then((response) => {
            switch (response.status) {
                case http.OK:
                case http.UNAUTHORIZED:
                    this.onLogout();
                    this.eventBus.call('unauthorized');
                    break;
                case http.INTERNAL_SERVER_ERROR:
                    break;
                default:
                    console.log('Бекендер молодец!!!');
            }
        });
    }

    /**
     * Handles socket message
     * @param {Event} event - websocket message event
     */
    socketMessageHandler(event) {
        const msg = JSON.parse(event.data);
        if (this.notificationEvents.has(msg.eventType)) {
            this.notificationCounter++;
            this.eventBus.call('setNotificationsCounter', this.notificationCounter);
        }
        console.log(this.notificationCounter);
    }

    /**
     * Use api to get user data and settings from backend
     */
    async getUserData() {
        settingsGet().then((response) => {
            switch (response.status) {
                case http.OK:
                    response.json().then((responseJson) => {
                        this.onLogin(responseJson);
                    });
                    break;
                case http.UNAUTHORIZED:
                case http.INTERNAL_SERVER_ERROR:
                    this.eventBus.call('logout');
                    break;
                default:
                    console.log('Бекендер молодец!!!');
            }
        });
    }

    /**
     * Count unread notifications
     */
    async getNotificationsCount() {
        const response = await notificationsGet();
        this.handleResponseStatus(response, (notifications) => {
            this.notificationCounter = 0;
            notifications.forEach((notification) => {
                if (!notification.isRead && this.notificationEvents.has(notification.eventType)) {
                    this.notificationCounter++;
                }
            });
        });
    }

    /**
     * Get user notifications
     */
    async getNotifications() {
        const response = await notificationsGet();
        this.handleResponseStatus(response, (body) => {
            const notifications = [];
            const parseConfig = {enableDate: true, enableIsRead: true};
            body.forEach((notification) => {
                const parsedNotification = parseNotification(notification, parseConfig);
                if (parsedNotification) {
                    notifications.push(parsedNotification);
                }
            });
            console.log(notifications);
            this.eventBus.call('gotNotifications', notifications);
        });
    }

    /**
     * Delete all user notifications
     */
    async deleteNotifications() {
        this.notificationCounter = 0;
        this.eventBus.call('setNotificationsCounter', this.notificationCounter);
        const response = await notificationsDelete();
        this.handleResponseStatus(response, null);
    }

    /**
     * Mark all user notifications read
     */
    async readNotifications() {
        this.notificationCounter = 0;
        this.eventBus.call('setNotificationsCounter', this.notificationCounter);
        const response = await notificationsPut();
        this.handleResponseStatus(response, () => this.getNotifications());
    }
}
