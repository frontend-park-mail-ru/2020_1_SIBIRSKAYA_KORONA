import './loginView.tmpl.js';

/**
 * View of login page
 */
export default class LoginView {
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
        data = data ||this.inputtedData;
        this.root.innerHTML = window.fest['js/views/login/loginView.tmpl'](data);
        this.addEventListeners();
    }

    addEventListeners() {
        const submitButton = document.getElementById('submit_button');
        submitButton.addEventListener('click', this.handleSubmit);

        const formElements = document.getElementById('loginForm').elements;
        for (const element of formElements) {
            if (element.nodeName === 'INPUT') {
                element.addEventListener('input', this.handleUserInput);
                element.addEventListener('blur', this.handleUserInput);

                const errorInputSignal = element.id + 'Error';
                const errorInputHandler = this[errorInputSignal + 'Handler'];
                this.eventBus.subscribe(errorInputSignal, errorInputHandler);
            }
        }
    }

    inputLoginErrorHandler(error) {
        const errorLabel = document.getElementById('inputLoginError');
        error ? errorLabel.classList.remove('hidden') : errorLabel.classList.add('hidden');
    }

    inputPasswordErrorHandler(error) {
        const errorLabel = document.getElementById('inputPasswordError');
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
     * @return {{password: *, login: *}}
     */
    getUserData() {
        return {
            nickname: document.getElementById('inputLogin').value,
            password: document.getElementById('inputPassword').value,
        };
    }
}
