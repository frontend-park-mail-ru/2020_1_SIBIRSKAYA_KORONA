import './joinView.tmpl.js';

/**
 * View of join page
 */
export default class JoinView {
    /**
     * View constructor
     * @param {object} eventBus - local event bus
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.root = document.getElementById('application');
        this.inputtedData = {};

        this.render = this.render.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.showError = this.showError.bind(this);
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
    showError(show, field, text) {
        const errorLabel = document.getElementById(field + 'Error');
        show ? errorLabel.classList.remove('hidden') : errorLabel.classList.add('hidden');
        if (text) {
            errorLabel.innerText = text;
        }
    };

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
            this.showError(false, 'inputPasswordRepeat');
            this.eventBus.call('submit', this.getUserData());
        } else {
            this.showError(true, 'inputPasswordRepeat', 'Пароли не совпадают');
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
