import {parseNotification} from '../libs/notificationsParser.js';
import webSocket from '../libs/webSocketWrapper.js';
import columnChangedNotificationTemplate from './columnChangedNotification.tmpl.xml';
import defaultNotificationTemplate from './defaultNotification.tmpl.xml';
import inviteNotificationTemplate from './inviteNotification.tmpl.xml';

const NOTIFICATION_LIFE_TIME = 4000;
/**
 * Real time notifications. (Notifications in header aren't served here)
 */
export default class Notifications {
    /**
     * @param {EventBus} globalEventBus for enable/disable notifications
     */
    constructor(globalEventBus) {
        this.root = document.querySelector('#notifications');
        this.socket = webSocket;
        this.socket.subscribe('message', this.newNotificationHandler.bind(this));
        this.enable = true;

        this.enableSound = true;
        this.notificationSound = new Audio('/sounds/drill.mp3');
        document.addEventListener('mousemove', () => this.notificationSound.load, {once: true});

        globalEventBus.subscribe('enableSocketConnection', this.enableSocketConnection.bind(this));
        globalEventBus.subscribe('toggleNotifications', this.enableNotifications.bind(this));
        globalEventBus.subscribe('toggleNotificationsSound', this.enableNotificationsSound.bind(this));
    }

    /**
     * Connects with socket or disconnects
     * @param {boolean} enable
     */
    enableSocketConnection(enable) {
        console.log('Enable socket', enable);
        if (enable) {
            this.socket.connect();
        } else {
            this.socket.disconnect();
        }
    }

    /**
     * Sets enable notifications
     */
    enableNotifications() {
        this.enable = !this.enable;
    }

    /**
     * Sets enable notifications sound
     */
    enableNotificationsSound() {
        this.enableSound = !this.enableSound;
    }

    /**
     * Displays new notification
     * @param {Event} event
     */
    newNotificationHandler(event) {
        if (!this.enable) {
            return;
        }
        const msg = JSON.parse(event.data);
        const newNotificationData = parseNotification(msg);
        switch (newNotificationData?.type) {
            case 'AssignOnTask':
            case 'InviteToBoard':
                if (newNotificationData?.inviter && newNotificationData?.inviter) {
                    this.renderNotification(newNotificationData, inviteNotificationTemplate);
                } else {
                    this.renderNotification(newNotificationData, defaultNotificationTemplate);
                }
                break;
            case 'AddComment':
                this.renderNotification(newNotificationData, defaultNotificationTemplate);
                break;
            case 'TaskColumnChanged':
                this.renderNotification(newNotificationData, columnChangedNotificationTemplate);
                break;
            default:
                break;
        }
    }

    /**
     * Renders notification in popup, pass inviteNotification = true to render invite notification
     * @param {Object} notificationData
     * @param {Function} template - default false, set to true for use inviteNotificationTemplate for render
     */
    renderNotification(notificationData, template) {
        if (this.enableSound) {
            this.notificationSound.pause();
            this.notificationSound.currentTime = 0;
            this.notificationSound.play();
        }

        const newNotification = document.createElement('div');
        newNotification.innerHTML = template(notificationData);
        this.root.append(newNotification);
        setTimeout(() => {
            newNotification.remove();
        }, NOTIFICATION_LIFE_TIME);
    }
}
