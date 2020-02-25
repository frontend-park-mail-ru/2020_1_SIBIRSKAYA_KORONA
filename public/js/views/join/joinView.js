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
    }

    /**
     * Render view method
     * @param {object} data - render data
     */
    render(data) {
        this.root.innerHTML = window.fest['js/views/join/joinView.tmpl'](data);
        this.addEventListeners();
    }

    addEventListeners () {
        const submitButton = document.getElementById('submit_button');
        submitButton.addEventListener('click', this.handleSubmit);

        const formElements = document.getElementById('joinForm').elements;
        for (let element of formElements) {
            if (element.nodeName === 'INPUT') {
                element.addEventListener('input', this.handleUserInput);
                element.addEventListener('blur', this.handleUserInput);

                const errorInputSignal = element.id + 'Error';
                const errorInputHandler = this[errorInputSignal + 'Handler'];
                this.eventBus.subscribe(errorInputSignal, errorInputHandler);
            }
        }
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

    handleUserInput(e) {
        const inputField = e.target;
        this.inputtedData[inputField.id] = inputField.value;
        console.log(inputField.id);

        const eventBusValidateSignal = inputField.id;
        const dataToValidate = this.inputtedData[inputField.id];
        this.eventBus.call(eventBusValidateSignal, dataToValidate);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.eventBus.call('submit', this.getUserData());
    }

    /**
     * Get user input data
     * @return {{password: *, surname: *, name: *, nickname: *}}
     */
    getUserData() {
        // return this.inputtedData;
        return {
            name: document.getElementById('inputName').value,
            surname: document.getElementById('inputSurname').value,
            nickname: document.getElementById('inputNickname').value,
            password: document.getElementById('inputPassword').value,
        };
    }
}
