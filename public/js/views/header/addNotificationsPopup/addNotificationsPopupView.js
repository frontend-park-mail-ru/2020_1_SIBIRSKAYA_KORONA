import BaseView from '../../baseView.js';
import template from './addNotificationsPopup.tmpl.xml';

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

        this.eventBus.subscribe('gotNotifications', this.renderNotifications.bind(this));
    }

    /**
     * Triggers getting data from backend and set popup position
     */
    render() {
        const headerHeight = document.querySelector('#header').getBoundingClientRect().height;
        this.root.style.right = '0';
        this.root.style.top = headerHeight + 'px';
        this.eventBus.call('getNotifications');
    }

    /**
     * Real render method with data from backend
     * @param {Object} data - board members with mark (assigned or not)
     */
    renderNotifications(data) {
        this.root.innerHTML = template(data);
        console.log(data);
        this.addEventListeners();
    }

    /**
     * Add event listeners
     */
    addEventListeners() {

    }

    /**
     * Clears popover block from current pop-over
     */
    closeSelf() {
        this.root.innerHTML = '';
    }
}
