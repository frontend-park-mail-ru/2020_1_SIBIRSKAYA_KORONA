import template from './loginView.tmpl.xml';
import BaseView from '../baseView.js';

/**
 * View of login page
 */
export default class LoginView extends BaseView {
    /**
     * View constructor
     * @param {object} eventBus - local event bus
     */
    constructor(eventBus) {
        super(eventBus);

        this.render = this.render.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.eventBus.subscribe('inputError', this.displayError.bind(this));
    }

    /**
     * Render view method
     */
    render() {
        this.root.innerHTML = template();
        this.addEventListeners();
    };

    /**
     * Set handlers for user input and submit
     */
    addEventListeners() {
        const submitButton = document.getElementById('submit_button');
        submitButton.addEventListener('click', this.handleSubmit);
    }

    /**
     * Displays user input error, is triggered when model validation failed
     * @param {boolean} display - show or hide error string
     */
    displayError(display) {
        this.render();
        const errorLabel = document.getElementById('inputError');
        display ? errorLabel.classList.remove('hidden') : errorLabel.classList.add('hidden');
    }

    /**
     * Handle user submit
     * @param {Event} event - button click event
     */
    handleSubmit(event) {
        event.preventDefault();
        this.eventBus.call('submit', this.getUserData());
    }

    /**
     * Get user input data
     * @return {{password: string, login: string}}
     */
    getUserData() {
        return {
            nickname: document.getElementById('inputLogin').value,
            password: document.getElementById('inputPassword').value,
        };
    }
}
