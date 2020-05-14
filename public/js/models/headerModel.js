import * as http from 'http-status-codes';
import {
    notificationsDelete,
    notificationsGet,
    notificationsPut,
    sessionDelete,
    settingsGet,
} from '../libs/apiService.js';
import {parseNotification} from '../libs/notificationsParser.js';

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

        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.logout = this.logout.bind(this);
        this.getNotifications = this.getNotifications.bind(this);
        this.readNotifications = this.readNotifications.bind(this);
        this.deleteNotifications = this.deleteNotifications.bind(this);

        this.eventBus.subscribe('getData', this.getUserData);
        this.eventBus.subscribe('submitLogout', this.logout);
        this.eventBus.subscribe('getNotifications', this.getNotifications);
        this.eventBus.subscribe('readNotifications', this.readNotifications);
        this.eventBus.subscribe('deleteNotifications', this.deleteNotifications);
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
    logout() {
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
     * Use api to get user data and settings from backend
     */
    getUserData() {
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
     * Get user notifications
     */
    async getNotifications() {
        const response = await notificationsGet();
        switch (response.status) {
            case http.OK:
                const notifications = [];
                const responseJson = await response.json();
                const parseConfig = {enableDate: true, enableIsRead: true};
                responseJson.forEach((notification) => {
                    const parsedNotification = parseNotification(notification, parseConfig);
                    if (parsedNotification) {
                        notifications.push(parsedNotification);
                    }
                });
                console.log(notifications);
                this.eventBus.call('gotNotifications', notifications);
                break;
            case http.UNAUTHORIZED:
                this.eventBus.call('logout');
                break;
            default:
                console.log('Бекендер молодец!!!', response.status);
        }
    }

    /**
     * Delete all user notifications
     */
    deleteNotifications() {
        notificationsDelete().then((response) => {
            switch (response.status) {
                case http.OK:
                    this.eventBus.call('gotNotifications', []);
                    break;
                case http.UNAUTHORIZED:
                    this.eventBus.call('logout');
                    break;
                default:
                    console.log('Бекендер молодец!!!', response.status);
            }
        });
    }

    /**
     * Mark all user notifications read
     */
    readNotifications() {
        notificationsPut().then((response) => {
            switch (response.status) {
                case http.OK:
                    this.getNotifications();
                    break;
                case http.UNAUTHORIZED:
                    this.eventBus.call('logout');
                    break;
                default:
                    console.log('Бекендер молодец!!!', response.status);
            }
        });
    }
}
