import './profileView.tmpl.js';

/**
 * View of login page
 */
export default class ProfileView {
    /**
     * View constructor
     * @param eventBus
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.root = document.getElementById('application');
        this.inputtedData = {
            inputPasswordRepeat : "",
        };

        this.render = this.render.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleUserInputPasswordRepeat = this.handleUserInputPasswordRepeat.bind(this);

        eventBus.subscribe('gotData', this.render);
        this.eventBus.call('getData');
    }

    /**
     * Render view method
     * @param {object} data user data to render
     */
    render(data) {
        console.log("render profile");
        // data = data || this.inputtedData;

        this.root.innerHTML = window.fest['js/views/profile/profileView.tmpl'](data);
        this.addEventListeners();
    }

    addEventListeners() {
        const submitAbout = document.getElementById('submitAbout');
        submitAbout.addEventListener('click', this.handleSubmitAbout);

        const submitPasswords = document.getElementById('submitPasswords');
        submitPasswords.addEventListener('click', this.handleSubmitPasswords);

        const submitEmail = document.getElementById('submitEmail');
        submitEmail.addEventListener('click', this.handleSubmitEmail);

        const inputs = [
            document.getElementById('inputName'),
            document.getElementById('inputSurname'),
            document.getElementById('inputEmail'),
            document.getElementById('inputOldPassword'),
            document.getElementById('inputPassword'),
        ];
        for (let element of inputs) {
            element.addEventListener('input', this.handleUserInput);
            element.addEventListener('blur', this.handleUserInput);

            const errorInputSignal = element.id + 'Error';
            const errorInputHandler = this[errorInputSignal + 'Handler'];
            this.eventBus.subscribe(errorInputSignal, errorInputHandler);
        }

        const inputPasswordRepeat = document.getElementById('inputPasswordRepeat');
        inputPasswordRepeat.addEventListener('input', this.handleUserInputPasswordRepeat);
        inputPasswordRepeat.addEventListener('blur', this.handleUserInputPasswordRepeat);

        this.eventBus.subscribe('inputPasswordRepeatError',this.inputPasswordRepeatErrorHandler);
    }

    handleUserInput(e) {
        const inputField = e.target;
        this.inputtedData[inputField.id] = inputField.value;
        console.log(inputField.id);

        const eventBusValidateSignal = inputField.id;
        const dataToValidate = this.inputtedData[inputField.id];
        this.eventBus.call(eventBusValidateSignal, dataToValidate);
    }

    handleUserInputPasswordRepeat(e) {
        const inputPasswordRepeatField = e.target;
        this.inputtedData[inputPasswordRepeatField.id] = inputPasswordRepeatField.value;
        console.log(inputPasswordRepeatField.id);

        const data = [this.inputtedData.inputPasswordRepeat, inputPasswordRepeatField.value];
        this.eventBus.call('inputPasswordRepeat', data);
    }

    inputNameErrorHandler(error) {
        const errorLabel = document.getElementById('inputNameError');
        error ? errorLabel.classList.remove('hidden') : errorLabel.classList.add('hidden');
    }

    inputSurnameErrorHandler(error) {
        const errorLabel = document.getElementById('inputSurnameError');
        error ? errorLabel.classList.remove('hidden') : errorLabel.classList.add('hidden');
    }

    inputNicknameErrorHandler(error) {
        const errorLabel = document.getElementById('inputNicknameError');
        error ? errorLabel.classList.remove('hidden') : errorLabel.classList.add('hidden');
    }

    inputPasswordErrorHandler(error) {
        const errorLabel = document.getElementById('inputPasswordError');
        error ? errorLabel.classList.remove('hidden') : errorLabel.classList.add('hidden');
    }

    inputPasswordRepeatErrorHandler(error) {
        const errorLabel = document.getElementById('inputPasswordRepeatError');
        error ? errorLabel.classList.remove('hidden') : errorLabel.classList.add('hidden');
    }

    handleSubmitAbout() {

    }

    handleSubmitPasswords() {

    }

    handleSubmitEmail() {

    }

    getUserData() {
        return {
            name: document.getElementById('inputName').value,
            surname: document.getElementById('inputSurname').value,
            password: document.getElementById('inputPassword').value,
            passwordNew: document.getElementById('inputPassword').value,
            email: document.getElementById('inputPassword').value,
        };
    }
}
