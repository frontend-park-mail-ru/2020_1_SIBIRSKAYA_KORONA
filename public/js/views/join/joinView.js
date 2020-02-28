'use strict';

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
        this.displayError = this.displayError.bind(this);
    }

    /**
     * Render view method
     */
    render() {
        this.root.innerHTML = window.fest['js/views/join/joinView.tmpl'](this.inputtedData);
        this.addEventListeners();
    }

    addEventListeners() {
        const submitButton = document.getElementById('submit_button');
        submitButton.addEventListener('click', this.handleSubmit);

        const formElements = document.getElementById('joinForm').elements;
        for (const element of formElements) {
            if (element.nodeName === 'INPUT') {
                element.addEventListener('input', this.handleUserInput);
                element.addEventListener('blur', this.handleUserInput);

                this.eventBus.subscribe('userInputError', this.displayError);
            }
        }
    }

    displayError(display, field, text) {
        const errorLabel = document.getElementById(field + 'Error');
        display ? errorLabel.classList.remove('hidden') : errorLabel.classList.add('hidden');
        if (text) {
            errorLabel.innerText = text;
        }
    };

    handleUserInput(e) {
        const inputField = e.target;
        this.inputtedData[inputField.id] = inputField.value;
        if (inputField.id !== 'inputPasswordRepeat') {
            const type = inputField.id;
            this.eventBus.call('userInput', type, inputField.value);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.inputtedData.inputPassword === this.inputtedData.inputPasswordRepeat) {
            this.displayError(false, 'inputPasswordRepeat');
            this.eventBus.call('submit', this.getUserData());
        } else {
            this.displayError(true, 'inputPasswordRepeat', 'Пароли не совпадают');
        }
    }

    /**
     * Get user input data
     * @return {{password: *, surname: *, name: *, nickname: *}}
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
