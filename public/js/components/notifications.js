import webSocket from '../libs/webSocketWrapper.js';
import inviteNotificationTemplate from './inviteNotification.tmpl.xml';
import notificationTemplate from './notification.tmpl.xml';

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
            case 'AssignOnTask': {
                let taskHref = '/boards/' + msg.metaData.bid;
                taskHref += '/columns/' + msg.metaData.cid;
                taskHref += '/tasks/' + msg.metaData.tid;
                if (msg.uid === msg.metaData?.user?.id) {
                    // this means we are invitee
                    newNotificationData = {
                        user: {nickname: msg.makeUser.nickname, avatar: msg.makeUser.avatar},
                        link: {text: msg.metaData.entityData, href: taskHref},
                        text: 'Назначил Вас исполнителем задачи',
                    };
                    this.renderNotification(newNotificationData, notificationTemplate);
                } else {
                    // this means somebody invited somebody
                    newNotificationData = {
                        inviter: {nickname: msg.makeUser.nickname, avatar: msg.makeUser.avatar},
                        invitee: {nickname: msg.metaData.user?.nickname, avatar: msg.metaData.user?.avatar},
                        link: {text: msg.metaData.entityData, href: taskHref},
                        text: 'назначил исполнителем задачи',
                    };
                    this.renderNotification(newNotificationData, inviteNotificationTemplate);
                }
                break;
            }
            case 'InviteToBoard': {
                if (msg.uid === msg.metaData?.user?.id) {
                    const newNotificationData = {
                        user: {nickname: msg.makeUser.nickname, avatar: msg.makeUser.avatar},
                        link: {text: msg.metaData.entityData, href: `/boards/${msg.metaData.bid}`},
                        text: 'пригласил Вас в доску',
                    };
                    this.renderNotification(newNotificationData, notificationTemplate);
                } else {
                    newNotificationData = {
                        inviter: {nickname: msg.makeUser.nickname, avatar: msg.makeUser.avatar},
                        invitee: {nickname: msg.metaData.user?.nickname, avatar: msg.metaData.user?.avatar},
                        link: {text: msg.metaData.entityData, href: `/boards/${msg.metaData.bid}`},
                        text: 'пригласил в доску',
                    };
                    this.renderNotification(newNotificationData, inviteNotificationTemplate);
                }

                break;
            }
            default:
                // We don`t need to render it because this message type handles in other place
                return;
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
            this.root.removeChild(this.root.childNodes[0]);
        }, NOTIFICATION_LIFE_TIME);
    }
}
