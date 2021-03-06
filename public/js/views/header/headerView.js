import BaseView from '../baseView.js';
import template from './headerView.tmpl.xml';

/**
 * Main header view
 */
export default class HeaderView extends BaseView {
    /**
     * View constructor
     * @param {object} eventBus - local event bus
     */
    constructor(eventBus) {
        super(eventBus);
        this.root = document.getElementById('header');

        this.render = this.render.bind(this);
        this.renderUserData = this.renderUserData.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.setNotificationsCounter = this.setNotificationsCounter.bind(this);

        this.eventBus.subscribe('login', this.render);
        this.eventBus.subscribe('logout', this.renderUserData);
        this.eventBus.subscribe('gotData', this.renderUserData);
        this.eventBus.subscribe('setNotificationsCounter', this.setNotificationsCounter);
    }

    /**
     * Triggers getting data from model
     * @param {object} data user data to render
     */
    render(data) {
        this.eventBus.call('getData');
    }

    /**
     * Real render view method with user data from model
     * @param {object} data user data to render
     */
    renderUserData(data) {
        data = data || {auth: false};
        this.root.innerHTML = template(data);
        this.addEventListeners(data.auth);
    }

    /**
     * Set handlers on buttons click
     * @param {boolean} authorized is user authorized or not
     */
    addEventListeners(authorized) {
        let buttons = [];
        if (authorized) {
            buttons = [
                document.querySelector('#submitSettings'),
                document.querySelector('#submitLogout'),
                document.querySelector('#submitBoards'),
                document.querySelector('.js-notifications'),
            ];
        } else {
            buttons = [
                document.querySelector('#submitLogin'),
                document.querySelector('#submitJoin'),
            ];
        }
        buttons.forEach((button) => {
            button.addEventListener('click', this.handleButtonClick);
        });
    }

    /**
     * Handle user click on buttons
     * @param {Event} event - button click event
     */
    handleButtonClick(event) {
        if (event.currentTarget.classList.contains('js-notifications')) {
            this.eventBus.call('openNotificationsPopup');
        } else {
            event.preventDefault();
            this.eventBus.call(event.target.id);
        }
    }

    /**
     * Sets notification count in header
     * @param {Number} count - unread notifications count
     */
    setNotificationsCounter(count) {
        const notificationCounterDiv = this.root.querySelector('.js-notificationCounter');
        if (count > 0) {
            notificationCounterDiv.classList.remove('display-none');
        } else {
            notificationCounterDiv.classList.add('display-none');
        }
        notificationCounterDiv.innerText = count;
    }
}
