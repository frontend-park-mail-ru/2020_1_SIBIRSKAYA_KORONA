import template from './joinView.tmpl.xml';
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
        this.clearInputtedData = this.clearInputtedData.bind(this);

        this.eventBus.subscribe('userInputError', this.showError);
    }

    /**
     * Render view method
     */
    render() {
        this.root.innerHTML = template(this.inputtedData);
        this.addEventListeners();
    }

    /**
     * Set handlers for user input and submit
     */
    addEventListeners() {
        document.getElementById('submit_button').addEventListener('click', this.handleSubmit);

        const inputs = [
            document.getElementById('inputName'),
            document.getElementById('inputSurname'),
            document.getElementById('inputNickname'),
            document.getElementById('inputPassword'),
            document.getElementById('inputPasswordRepeat'),
        ];

        inputs.forEach((input) => {
            input.addEventListener('input', this.handleUserInput);
        });

        document.onkeydown = (event) => {
            if (event.code === 'Enter') {
                this.handleSubmit();
            }
        };
    }

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
     * Clears inputted data from local storage
     */
    clearInputtedData() {
        this.inputtedData = {};
    }

    /**
     * Handle user submit
     */
    handleSubmit() {
        if (this.inputtedData.inputPassword === this.inputtedData.inputPasswordRepeat) {
            this.showError({show: false, field: 'inputPassword'});
            this.eventBus.call('submit', this.getUserData());
            document.onkeydown = null;
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
