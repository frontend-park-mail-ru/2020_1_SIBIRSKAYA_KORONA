import BaseView from '../../baseView.js';
import template from './addNotificationsPopup.tmpl.xml';
import inviteNotificationTemplate from './inviteNotification.tmpl.xml';
import defaultNotificationTemplate from './notification.tmpl.xml';

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
        this.root.innerHTML = template();
        const notificationsList = this.root.querySelector('.js-notifications');
        notifications.forEach((notification) => {
            const notificationDiv = document.createElement('div');
            if (notification?.inviter && notification?.inviter) {
                notificationDiv.innerHTML = inviteNotificationTemplate(notification);
            } else if (notification?.user) {
                notificationDiv.innerHTML = defaultNotificationTemplate(notification);
            }
            notificationDiv.classList.add((notification.isRead) ? 'header-notification__read' : 'header-notification');
            notificationsList.append(notificationDiv);
        });
        this.addEventListeners();
        notificationsList.scrollTo(0, 0);
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
        ];
        buttons.forEach((button) => {
            button.addEventListener('click', this.handleButtonClick);
        });
    }

    /**
     * @param {MouseEvent} event
     */
    handleButtonClick(event) {
        const targetClassList = event.target.classList;
        switch (true) {
            case targetClassList.contains('js-readNotifications'):
                this.eventBus.call('readNotifications');
                break;
            case targetClassList.contains('js-deleteNotifications'):
                this.eventBus.call('deleteNotifications');
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
