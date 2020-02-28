'use strict';

import './profileView.tmpl.js';

/**
 * View of login page
 */
export default class ProfileView {
    /**
     * View constructor
     * @param {Object} eventBus
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.root = document.getElementById('application');
        this.inputtedData = {};

        this.render = this.render.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleAvatarChange = this.handleAvatarChange.bind(this);

        this.eventBus.subscribe('gotData', this.renderUserData.bind(this));
        this.eventBus.subscribe('userInputError', this.showError);
    }

    /**
     * Render view method
     * @param {object} data user data to render
     */
    render(data) {
        this.eventBus.call('getData');
    }

    /**
     * Real render view method
     * @param {object} data user data to render
     */
    renderUserData(data) {
        this.root.innerHTML = window.fest['js/views/profile/profileView.tmpl'](data);
        this.addEventListeners();
    }

    addEventListeners() {
        const submitButtons = [
            document.getElementById('submitAbout'),
            document.getElementById('submitPasswords'),
            document.getElementById('submitEmail'),
        ];
        const inputs = [
            document.getElementById('inputName'),
            document.getElementById('inputSurname'),
            document.getElementById('inputEmail'),
            document.getElementById('inputOldPassword'),
            document.getElementById('inputPassword'),
            document.getElementById('inputPasswordRepeat'),
        ];

        submitButtons.forEach((button) => {
            button.addEventListener('click', this.handleSubmit);
        });

        inputs.forEach((input) => {
            input.addEventListener('input', this.handleUserInput);
            input.addEventListener('blur', this.handleUserInput);
            this.eventBus.subscribe('userInputError', this.showError);
        });

        const inputImage = document.getElementById('avatarInput');
        inputImage.addEventListener('change', this.handleAvatarChange);
    }

    handleUserInput(e) {
        const inputField = e.target;
        this.inputtedData[inputField.id] = inputField.value;

        if (inputField.id !== 'inputPasswordRepeat') {
            const type = inputField.id;
            this.eventBus.call('userInput', type, inputField.value);
        }
    }

    showError(show, fieldId, text) {
        console.log(show, fieldId, text);
        const errorLabel = document.getElementById(fieldId + 'Error');
        show ? errorLabel.classList.remove('hidden') : errorLabel.classList.add('hidden');
        if (text) {
            errorLabel.innerText = text;
        }
    };

    handleAvatarChange(e) {
        e.preventDefault();
        this.inputtedData.avatar = e.target.files[0];
        this.inputtedData.inputNickname = document.getElementById('inputNickname').value;
        this.eventBus.call('submitImg', this.inputtedData);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.inputtedData);

        const eventBusSubmitSignal = e.target.id;
        const dataToSend = {
            'inputNickname': document.getElementById('inputNickname').value,
        };
        switch (e.target.id) {
            case 'submitAbout':
                dataToSend.inputName = this.inputtedData.inputName;
                dataToSend.inputSurname = this.inputtedData.inputSurname;
                break;
            case 'submitPasswords':
                if (this.inputtedData.inputPassword === this.inputtedData.inputPasswordRepeat) {
                    dataToSend.inputOldPassword = this.inputtedData.inputOldPassword;
                    dataToSend.inputPassword = this.inputtedData.inputPassword;
                } else {
                    this.showError(true, 'inputPasswordRepeat', 'Пароли не совпадают');
                    return;
                }
                break;
            case 'submitEmail':
                dataToSend.inputEmail = this.inputtedData.inputEmail;
                break;
        }
        this.eventBus.call(eventBusSubmitSignal, dataToSend);
    }
}
