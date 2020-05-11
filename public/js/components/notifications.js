import webSocket from '../libs/webSocketWrapper.js';
import template from './notification.tmpl.xml';

const NOTIFICATION_LIFE_TIME = 4000;
/**
 * Real time notifications
 */
export default class Notifications {
    /**
     * @param {EventBus} globalEventBus for enable/disable notifications
     */
    constructor(globalEventBus) {
        this.socket = webSocket;
        this.root = document.querySelector('#notifications');
        console.log(this.root);
        globalEventBus.subscribe('enableNotifications', this.enableNotifications.bind(this));
    }

    /**
     * Enables or disables realtime notifications
     * @param {boolean} enable
     */
    enableNotifications(enable) {
        console.log('Enable notifications', enable);
        this.enable = enable;
        if (this.enable && !this.socket.connected) {
            this.socket.connect();
            this.socket.subscribe('message', this.newNotificationHandler.bind(this));
        } else if (!this.enable) {
            this.socket.disconnect();
        }
    }

    /**
     * Displays new notification
     * @param {Event} event
     */
    newNotificationHandler(event) {
        const message = JSON.parse(event.data);
        console.log(message);
        let newNotificationData;
        switch (message.eventType) {
            case 'AssignOnTask':
                console.log(message.metaData);
                newNotificationData = {

                };
                break;
            case 'InviteToBoard':
                newNotificationData = {};
                break;
            default:
                // We don`t need to render it because this message type handles in other place
                return;
        }
        this.render(newNotificationData);
    }

    /**
     * Renders notification in popup
     * @param {Object} notificationData
     */
    render(notificationData) {
        const newNotification = document.createElement('div');
        newNotification.innerHTML = template(notificationData);
        this.root.append(newNotification);
        setTimeout(() => {
            this.root.removeChild(this.root.childNodes[0]);
        }, NOTIFICATION_LIFE_TIME);
    }
}
