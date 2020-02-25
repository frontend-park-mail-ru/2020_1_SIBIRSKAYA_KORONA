import './joinView.tmpl.js';

/**
 * View of join page
 */
export default class JoinView {
    /**
     * View constructor
     * @param {object} eventBus - application's root element
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.root = document.getElementById('application');
        this.inputtedData = {};

        this.render = this.render.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
    }

    /**
     * Render view method
     * @param {object} data - render data
     */
    render(data) {
        this.root.innerHTML = window.fest['js/views/join/joinView.tmpl'](data);

        const submitButton = document.getElementById('submit_button');
        submitButton.addEventListener('click', this.handleSubmit);

        const formElements = document.getElementById('joinForm').elements;
        /*for (let i = 0; i !== formElements.length; i++) {*/
        for (let element of formElements) {
            if (element.nodeName === 'INPUT') {
                element.addEventListener('input', this.handleUserInput);
                element.addEventListener('blur', this.handleUserInput);

                const errorInputSignal = element.id + 'Error';
                const errorInputHandler = this[errorInputSignal + 'Handler'];
                console.log(errorInputSignal + 'Handler');
                this.eventBus.subscribe(errorInputSignal, errorInputHandler);
            }
        }
    }

    inputNameErrorHandler(error) {
        const errorLabel = document.getElementById('inputNameError');
        if (error) {
            errorLabel.classList.remove('hidden');
        } else {
            errorLabel.classList.add('hidden');
        }
    }

    inputSurnameErrorHandler(error) {
        const errorLabel = document.getElementById('inputSurnameError');
        if (error) {
            errorLabel.classList.remove('hidden');
        } else {
            errorLabel.classList.add('hidden');
        }
    }

    inputNicknameErrorHandler(error) {
        const errorLabel = document.getElementById('inputNicknameError');
        if (error) {
            errorLabel.classList.remove('hidden');
        } else {
            errorLabel.classList.add('hidden');
        }
    }

    inputPasswordErrorHandler(error) {
        const errorLabel = document.getElementById('inputPasswordError');
        if (error) {
            errorLabel.classList.remove('hidden');
        } else {
            errorLabel.classList.add('hidden');
        }
    }

    inputPasswordRepeatErrorHandler(error) {
        const errorLabel = document.getElementById('inputPasswordRepeatError');
        if (error) {
            errorLabel.classList.remove('hidden');
        } else {
            errorLabel.classList.add('hidden');
        }
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
