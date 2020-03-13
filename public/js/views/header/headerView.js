import './headerView.tmpl.js';
import BaseView from '../baseView.js';

/**
 * Main header veiw
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
        this.root.innerHTML = window.fest['js/views/header/headerView.tmpl'](data);
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
            ];
        } else {
            buttons = [
                document.getElementById('submitLogin'),
                document.getElementById('submitJoin'),
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
        event.preventDefault();
        this.eventBus.call(event.target.id);
    }
}
