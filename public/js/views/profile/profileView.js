import './profileView.tmpl.js';

/**
 * View of profile page
 */
export default class ProfileView {
    /**
     * View constructor
     * @param {Object} eventBus for share events with model
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.root = document.getElementById('application');
        this.inputtedData = {};

        this.render = this.render.bind(this);
        this.showError = this.showError.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleAvatarChange = this.handleAvatarChange.bind(this);

        this.eventBus.subscribe('gotData', this.renderUserData.bind(this));
        this.eventBus.subscribe('userInputError', this.showError);
    }

    /**
     * Method which triggers getting data from model
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
        this.inputtedData = {};
        this.root.innerHTML = window.fest['js/views/profile/profileView.tmpl'](data);
        this.addEventListeners();
    }

    /**
     * Set handlers for user input and submit
     */
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
            this.eventBus.subscribe('userInputError', this.showError);
        });

        const inputImage = document.getElementById('avatarInput');
        inputImage.addEventListener('change', this.handleAvatarChange);
    }

    /**
     * Displays user input error, is triggered when model validation failed
     * @param {boolean} show - show or hide error string
     * @param {string} field - input with invalid data
     * @param {string} text - optional error text
     */
    showError(show, field, text) {
        const errorLabel = document.getElementById(field + 'Error');
        if (errorLabel) {
            show ? errorLabel.classList.remove('hidden') : errorLabel.classList.add('hidden');
            if (text) {
                errorLabel.innerText = text;
            }
            if (errorLabel.id === 'inputOldPasswordError') {
                this.clearPasswordInputs();
            }
        }
    };

    /**
     * Handle user input
     * @param {Event} event - input event
     */
    handleUserInput(event) {
        const inputField = event.target;
        this.inputtedData[inputField.id] = inputField.value;

        if (inputField.id !== 'inputPasswordRepeat' && inputField.id !== 'inputOldPassword') {
            const type = inputField.id;
            this.eventBus.call('userInput', type, inputField.value);
        }
    }

    /**
     * Clear iser inputted data from password fields
     */
    clearPasswordInputs() {
        document.getElementById('inputOldPassword').value = '';
        document.getElementById('inputPassword').value = '';
        document.getElementById('inputPasswordRepeat').value = '';
        delete this.inputtedData.inputOldPassword;
        delete this.inputtedData.inputPassword;
        delete this.inputtedData.inputPasswordRepeat;
    }

    /**
     * Handle avatar change
     * @param {Event} event - change event of avatar input file field
     */
    handleAvatarChange(event) {
        event.preventDefault();
        this.inputtedData.avatar = event.target.files[0];
        this.inputtedData.inputNickname = document.getElementById('inputNickname').value;
        console.log(this.inputtedData);
        this.eventBus.call('submitImg', this.inputtedData);
    }

    /**
     * Handle user submit
     * @param {Event} event - button click event
     */
    handleSubmit(event) {
        event.preventDefault();
        const dataToSend = {
            'inputNickname': document.getElementById('inputNickname').value,
        };
        switch (event.target.id) {
            case 'submitAbout':
                if (!this.inputtedData.inputName || !this.inputtedData.inputName) {
                    return;
                }
                dataToSend.inputName = this.inputtedData.inputName;
                dataToSend.inputSurname = this.inputtedData.inputSurname;
                break;
            case 'submitPasswords':
                if (!this.inputtedData.inputPassword || !this.inputtedData.inputOldPassword) {
                    return;
                }
                if (this.inputtedData.inputPassword === this.inputtedData.inputPasswordRepeat) {
                    dataToSend.inputOldPassword = this.inputtedData.inputOldPassword;
                    dataToSend.inputPassword = this.inputtedData.inputPassword;
                    this.showError(false, 'inputPassword');
                } else {
                    this.showError(true, 'inputPassword', 'Пароли не совпадают');
                    return;
                }
                break;
            case 'submitEmail':
                if (!this.inputtedData.inputEmail) {
                    return;
                }
                dataToSend.inputEmail = this.inputtedData.inputEmail;
                break;
        }
        console.log(dataToSend);
        const eventBusSubmitSignal = event.target.id;
        this.eventBus.call(eventBusSubmitSignal, dataToSend);
    }
}
