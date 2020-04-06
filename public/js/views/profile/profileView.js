import './profileView.tmpl.js';
import BaseView from '../baseView.js';

/**
 * View of profile page
 */
export default class ProfileView extends BaseView {
    /**
     * View constructor
     * @param {Object} eventBus for share events with model
     */
    constructor(eventBus) {
        super(eventBus);

        this.render = this.render.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleAvatarChange = this.handleAvatarChange.bind(this);

        this.eventBus.subscribe('userInputError', this.showError);
        this.eventBus.subscribe('gotData', this.renderUserData.bind(this));
        this.eventBus.subscribe('wrongPassword', this.clearPasswordInputs.bind(this));
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
     * Clear user inputted data from password fields
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
                if (!this.inputtedData.inputName && !this.inputtedData.inputSurname) {
                    return;
                }
                dataToSend.inputName = this.inputtedData.inputName;
                dataToSend.inputSurname = this.inputtedData.inputSurname;
                break;
            case 'submitPasswords':
                if (this.inputtedData.inputPassword === this.inputtedData.inputPasswordRepeat &&
                    this.inputtedData.inputPassword !== '') {
                    dataToSend.inputOldPassword = this.inputtedData.inputOldPassword;
                    dataToSend.inputPassword = this.inputtedData.inputPassword;
                    this.showError({show: false, field: 'inputPassword'});
                } else {
                    this.showError({show: true, field: 'inputPassword', text: 'Пароли не совпадают'});
                    return;
                }
                break;
            case 'submitEmail':
                if (!this.inputtedData.inputEmail) {
                    return;
                }
                dataToSend.inputEmail = this.inputtedData.inputEmail;
                break;
            default:
                break;
        }
        const eventBusSubmitSignal = event.target.id;
        this.eventBus.call(eventBusSubmitSignal, dataToSend);
    }
}
