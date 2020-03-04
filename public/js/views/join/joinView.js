import './joinView.tmpl.js';
import BaseView from '../baseView.js';

/**
 * View of join page
 */
export default class JoinView extends BaseView {
    /**
     * View constructor
     * @param {object} eventBus - local event bus
     */
    constructor(eventBus) {
        super(eventBus);
        this.render = this.render.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    /**
     * Render view method
     */
    render() {
        this.root.innerHTML = window.fest['js/views/join/joinView.tmpl'](this.inputtedData);
        this.addEventListeners();
    }

    /**
     * Set handlers for user input and submit
     */
    addEventListeners() {
        const submitButton = document.getElementById('submit_button');
        submitButton.addEventListener('click', this.handleSubmit);

        const formElements = document.getElementById('joinForm').elements;
        for (const element of formElements) {
            if (element.nodeName === 'INPUT') {
                element.addEventListener('input', this.handleUserInput);
                this.eventBus.subscribe('userInputError', this.showError);
            }
        }
    }

    /**
     * Displays user input error, is triggered when model validation failed
     * @param {boolean} show - show or hide error string
     * @param {string} field - input with invalid data
     * @param {string} text - optional error text
     */

    /**
     * Handle user input
     * @param {Event} event - input event
     */
    handleUserInput(event) {
        const inputField = event.target;
        this.inputtedData[inputField.id] = inputField.value;
        if (inputField.id !== 'inputPasswordRepeat') {
            const type = inputField.id;
            this.eventBus.call('userInput', type, inputField.value);
        }
    }

    /**
     * Handle user submit
     * @param {Event} event - button click event
     */
    handleSubmit(event) {
        event.preventDefault();
        if (this.inputtedData.inputPassword === this.inputtedData.inputPasswordRepeat) {
            this.showError({show: false, field: 'inputPassword'});
            this.eventBus.call('submit', this.getUserData());
        } else {
            this.showError({show: true, field: 'inputPassword', text: 'Пароли не совпадают'});
        }
    }

    /**
     * Get user input data from input fields
     * @return {{password: string, surname: string, name: string, nickname: string}}
     */
    getUserData() {
        return {
            name: document.getElementById('inputName').value,
            surname: document.getElementById('inputSurname').value,
            nickname: document.getElementById('inputNickname').value,
            password: document.getElementById('inputPassword').value,
        };
    }
}
