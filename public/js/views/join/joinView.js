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
        this.inputedData = {};

        // this.eventBus.subscribe('inputError', this.render);

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
        submitButton.addEventListener('click', this.handleSubmit)
        const formElements = document.getElementById('joinForm').elements;
        for (let i = 0; i !== formElements.length; i++) {
            if (formElements[i].nodeName === 'INPUT') {
                formElements[i].addEventListener('blur', this.handleUserInput);
                /* formElements[i].addEventListener('input', (e) => {
                    // console.log('timeout');
                    // setTimeout(this.handleUserInput, 500, e);
                });*/
            }
        }
    }

    handleUserInput(e) {
        const inputField = e.target;
        this.inputedData[inputField.id] = inputField.value;

        this.eventBus.call('userInput', this.inputedData[inputField.id]);

        /* const formElements = document.getElementById('joinForm').elements;
        console.log(form);
        for (let i = 0; i !== formElements.length; i++) {
            if (formElements[i].nodeName === 'INPUT') {
                this.inputedData[formElements[i].id] = formElements[i].value;
            }
        }*/
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
        // return this.inputedData;
        return {
            name: document.getElementById('userName').value,
            surname: document.getElementById('userSurname').value,
            nickname: document.getElementById('userNickname').value,
            password: document.getElementById('userPassword').value,
        };
    }
}
