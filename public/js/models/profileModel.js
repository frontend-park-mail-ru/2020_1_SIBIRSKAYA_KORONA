import ApiService from '../libs/apiService.js';

export default class JoinModel {
    constructor(eventBus, router) {
        this.api = new ApiService('http://localhost:8080/');
        this.eventBus = eventBus;
        this.router = router;

        this.eventBus.subscribe('getData', this.getUser.bind(this));
        this.eventBus.subscribe('inputSurname', this.validateSurname.bind(this));
        this.eventBus.subscribe('inputName', this.validateName.bind(this));
        this.eventBus.subscribe('inputOldPassword', this.validatePassword.bind(this));
        this.eventBus.subscribe('inputPassword', this.validatePassword.bind(this));
        this.eventBus.subscribe('inputPasswordRepeat', this.validatePasswordRepeat.bind(this));
        this.eventBus.subscribe('inputEmail', this.validateEmail.bind(this));
    }

    validatePasswordRepeat(data) {
        const error = (data[0] !== data[1]);
        this.eventBus.call('inputPasswordRepeatError', error);
    }

    validatePassword(data) {
        const error = (data === "");
        this.eventBus.call('inputPasswordError', error);
    }

    validateName(data) {
        const error = (data === "");
        this.eventBus.call('inputNameError', error);
    }

    validateSurname(data) {
        const error = (data === "");
        this.eventBus.call('inputSurnameError', error);
    }

    validateEmail(data) {
        const error = (data === "");
        this.eventBus.call('inputSurnameError', error);
    }

    getUser() {
        console.log('profile get user');
        this.api.getUser({}).then((response) => {
            console.log(response.status);
/*            if (response[status] === 200) {
                console.log('ОГОНЬ');
                this.eventBus.call('gotData', {"s": "sasasasasasa"});
            } else {
                console.log('НЕ огонь');
            }*/
        });
    }
}
