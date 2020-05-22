import BaseView from '../../baseView.js';
import template from './addNotificationsPopup.tmpl.xml';
import columnChangedNotificationTemplate from './columnChangedNotification.tmpl.xml';
import defaultNotificationTemplate from './defaultNotification.tmpl.xml';
import inviteNotificationTemplate from './inviteNotification.tmpl.xml';

/**
 * Header notifications popup view
 */
export default class AddAssignsPopupView extends BaseView {
    /**
     * Constructor
     * @param {Object} parentEventBus  - parentEventBus to share events with model
     */
    constructor(parentEventBus) {
        super(parentEventBus);
        this.root = document.getElementById('popup-block');

        this.render = this.render.bind(this);
        this.closeSelf = this.closeSelf.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);

        this.eventBus.subscribe('gotNotifications', this.renderNotifications.bind(this));
        this.eventBus.subscribe('newNotificationReceived', this.renderNotification.bind(this));
    }

    /**
     * Triggers getting data from backend and set popup position
     */
    render() {
        const headerHeight = document.querySelector('#header').getBoundingClientRect().height;
        this.root.removeAttribute('style');
        this.root.style.right = '0';
        this.root.style.top = headerHeight + 'px';
        this.eventBus.call('getNotifications');
    }

    /**
     * Real render method with data from backend
     * @param {Array} notifications
     */
    renderNotifications(notifications) {
        const settings = {
            enableNotifications: JSON.parse(localStorage.getItem('enableNotifications')),
            enableNotificationsSound: JSON.parse(localStorage.getItem('enableNotificationsSound')),
        };
        this.root.innerHTML = template(settings);
        const notificationsList = this.root.querySelector('.js-notifications');
        notifications.forEach((notification) => {
            this.renderNotification(notification, notificationsList);
        });
        this.addEventListeners();
    }

    /**
     * Appends notification in notification list
     * @param {Object} notification - new notification data
     * @param {Element} notificationsListNode - div where new notification should be appended
     */
    renderNotification(notification, notificationsListNode) {
        notificationsListNode = notificationsListNode || this.root.querySelector('.js-notifications');
        if (!notificationsListNode) {
            return;
        }
        const notificationDiv = document.createElement('div');
        switch (notification.type) {
            case 'AssignOnTask':
            case 'InviteToBoard':
                if (notification?.inviter && notification?.inviter) {
                    notificationDiv.innerHTML = inviteNotificationTemplate(notification);
                } else {
                    notificationDiv.innerHTML = defaultNotificationTemplate(notification);
                }
                break;
            case 'TaskColumnChanged':
                notificationDiv.innerHTML = columnChangedNotificationTemplate(notification);
                break;
            case 'AddComment':
            default:
                notificationDiv.innerHTML = defaultNotificationTemplate(notification);
                break;
        }
        notificationDiv.classList.add((notification.isRead) ? 'header-notification__read' : 'header-notification');
        notificationsListNode.append(notificationDiv);
        notificationsListNode.scrollTo(0, 0);
    }

    /**
     * Add event listeners
     */
    addEventListeners() {
        document.addEventListener('click', (event) => {
            if (!event.target.closest('#popup-block')) {
                this.closeSelf();
            }
        });
        const buttons = [
            this.root.querySelector('.js-readNotifications'),
            this.root.querySelector('.js-deleteNotifications'),
            this.root.querySelector('.js-toggleNotifications'),
            this.root.querySelector('.js-toggleSound'),
        ];
        buttons.forEach((button) => {
            button.addEventListener('click', this.handleButtonClick);
        });
    }

    /**
     * @param {MouseEvent} event
     */
    handleButtonClick(event) {
        const targetClassList = event.currentTarget.classList;
        switch (true) {
            case targetClassList.contains('js-readNotifications'):
                this.eventBus.call('readNotifications');
                break;
            case targetClassList.contains('js-deleteNotifications'):
                event.stopPropagation();
                this.eventBus.call('deleteNotifications');
                this.closeSelf();
                break;
            case targetClassList.contains('js-toggleNotifications'):
                this.eventBus.call('toggleNotifications');
                event.currentTarget.classList.toggle('header-notifications-controls__button--selected');
                const enableNotifications = JSON.parse(localStorage.getItem('enableNotifications'));
                localStorage.setItem('enableNotifications', (!enableNotifications).toString());
                break;
            case targetClassList.contains('js-toggleSound'):
                this.eventBus.call('toggleNotificationsSound');
                event.currentTarget.classList.toggle('header-notifications-controls__button--selected');
                const enableNotificationsSound = JSON.parse(localStorage.getItem('enableNotificationsSound'));
                localStorage.setItem('enableNotificationsSound', (!enableNotificationsSound).toString());
                break;
            default:
                break;
        }
    }

    /**
     * Clears popover block from current pop-over
     */
    closeSelf() {
        this.root.innerHTML = '';
    }
}
