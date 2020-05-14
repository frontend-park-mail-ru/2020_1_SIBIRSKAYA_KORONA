import {ChainLinkSignals} from '../../libs/controllerChainLink.js';
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
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.renderUserData = this.renderUserData.bind(this);

        this.eventBus.subscribe('login', this.render);
        this.eventBus.subscribe('logout', this.renderUserData);
        this.eventBus.subscribe('gotData', this.renderUserData);
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
                document.getElementById('submitSettings'),
                document.getElementById('submitLogout'),
                document.getElementById('submitBoards'),
                document.getElementById('js-notifications'),
            ];
        } else {
            buttons = [
                document.getElementById('submitLogin'),
                document.getElementById('submitJoin'),
            ];
            const windowOverlay = taskSettings.querySelector('.window-overlay');
            windowOverlay.addEventListener('click', (event) => {
                if (event.target === event.currentTarget) {
                    event.stopPropagation();
                    this.eventBus.call(ChainLinkSignals.closeLastChainLinkOrSelf);
                }
            });
        }
        buttons.forEach((button) => {
            button.addEventListener('click', this.handleButtonClick);
        });
    }

    //
    // 'openNotificationsPopup'
    // 'closeNotificationPopup'
    //
    //
    /**
     * Handle user click on buttons
     * @param {Event} event - button click event
     */
    handleButtonClick(event) {
        if (event.target.id === 'js-notifications') {
            this.eventBus.call('openNotificationsPopup');
        } else {
            event.preventDefault();
            this.eventBus.call(event.target.id);
        }
    }
}
