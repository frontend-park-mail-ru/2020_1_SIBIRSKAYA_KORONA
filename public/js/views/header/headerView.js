import './headerView.tmpl.js';
import BaseView from '../baseView.js';

/**
 * View of header
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

        this.eventBus.subscribe('login', this.render);
        this.eventBus.subscribe('logout', this.render);
    }

    render(data) {
        data = data || {auth: false};
        this.root.innerHTML = window.fest['js/views/header/headerView.tmpl'](data);
        this.addEventListeners(data.auth);
    }

    addEventListeners(authorized) {
        let buttons = [];
        if (authorized) {
            buttons = [
                document.getElementById('submitSettings'),
                document.getElementById('submitLogout'),
                document.getElementById('submitBoards'),
            ];
        } else {

        }
        buttons.forEach((button) => {
            button.addEventListener('click', this.handleButtonClick);
        });
    }

    handleButtonClick(event) {
        event.preventDefault();
        this.eventBus.call(event.target.id);
    }
}
