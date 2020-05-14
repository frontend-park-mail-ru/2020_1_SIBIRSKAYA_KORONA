import webSocket from '../libs/webSocketWrapper.js';
import inviteNotificationTemplate from './inviteNotification.tmpl.xml';
import notificationTemplate from './notification.tmpl.xml';
import {parseNotification} from '../libs/notificationsParser.js';

const NOTIFICATION_LIFE_TIME = 4000;
/**
 * Real time notifications. (Notifications in header aren't served here)
 */
export default class Notifications {
    /**
     * @param {EventBus} globalEventBus for enable/disable notifications
     */
    constructor(globalEventBus) {
        this.socket = webSocket;
        this.root = document.querySelector('#notifications');
        this.enable = false;
        globalEventBus.subscribe('enableNotifications', this.enableNotifications.bind(this));
    }

    /**
     * Enables or disables realtime notifications
     * @param {boolean} enable
     */
    enableNotifications(enable) {
        console.log('Enable notifications', enable);
        if (this.enable === enable) {
            return;
        }
        this.enable = enable;
        if (this.enable) {
            this.socket.connect();
            this.socket.subscribe('message', this.newNotificationHandler.bind(this));
        } else {
            this.socket.disconnect();
        }
    }

    /**
     * Displays new notification
     * @param {Event} event
     */
    newNotificationHandler(event) {
        const msg = JSON.parse(event.data);
        console.log(msg);
        let newNotificationData;
        switch (msg.eventType) {
            case 'AssignOnTask':
            case 'InviteToBoard':
                newNotificationData = parseNotification(msg);
                break;
            default:
                // We don`t need to render it because this message type handles in other place
        }
        if (newNotificationData?.inviter && newNotificationData?.inviter) {
            this.renderNotification(newNotificationData, inviteNotificationTemplate);
        } else if (newNotificationData?.user) {
            this.renderNotification(newNotificationData, notificationTemplate);
        }
    }

    /**
     * Renders notification in popup, pass inviteNotification = true to render invite notification
     * @param {Object} notificationData
     * @param {Function} template - default false, set to true for use inviteNotificationTemplate for render
     */
    renderNotification(notificationData, template) {
        const newNotification = document.createElement('div');
        newNotification.innerHTML = template(notificationData);
        this.root.append(newNotification);
        setTimeout(() => {
            newNotification.remove();
        }, NOTIFICATION_LIFE_TIME);
    }
}
