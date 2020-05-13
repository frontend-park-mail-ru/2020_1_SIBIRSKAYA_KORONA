import * as http from 'http-status-codes';
import {notificationsDelete, notificationsGet, sessionDelete, settingsGet} from '../libs/apiService.js';
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

        this.eventBus.subscribe('getData', this.getUserData);
        this.eventBus.subscribe('submitLogout', this.logout);
        this.eventBus.subscribe('getNotifications', this.getNotifications);
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
    getNotifications() {
        notificationsGet().then((response) => {
            switch (response.status) {
                case http.OK:
                    const notifications = [];
                    response.json().then((responseJson) => {
                        responseJson.forEach((notification) => {
                            notifications.push(parseNotification(notification));
                        });
                        this.eventBus.call('gotNotifications', notifications);
                    }).catch((error) => {
                        console.log(error);
                    });

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
        notificationsDelete().then((response) => {
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
