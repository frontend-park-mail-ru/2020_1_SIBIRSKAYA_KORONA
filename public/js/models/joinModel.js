import ApiService from '../libs/apiService.js';

export default class JoinModel {
    constructor(eventBus, router) {
        this.api = new ApiService('http://localhost:8080/join');
        this.eventBus = eventBus;
        this.router = router;

        this.join = this.join.bind(this);
        this.validateSurname = this.validateSurname.bind(this);
        this.validateNickname = this.validateNickname.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validatePasswordRepeat = this.validatePasswordRepeat.bind(this);

        this.eventBus.subscribe('submit', this.join);
        this.eventBus.subscribe('inputSurname', this.validateSurname);
        this.eventBus.subscribe('inputNickname', this.validateNickname);
        this.eventBus.subscribe('inputName', this.validateName);
        this.eventBus.subscribe('inputPassword', this.validatePassword);
        this.eventBus.subscribe('inputPasswordRepeat', this.validatePasswordRepeat);
    }

    validatePasswordRepeat(data) {
        console.log(data);
        const error = (data === "");
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

    validateNickname(data) {
        const error = (data === "");
        this.eventBus.call('inputNicknameError', error);
    }

    validateSurname(data) {
        const error = (data === "");
        this.eventBus.call('inputSurnameError', error);
    }

    join(userInfo) {
        return this.api.join(userInfo).then((response) => {
            if (response['status'] === 308) {
                console.log(this);
                this.router.go('/', {});
                console.log('ОГОНЬ');
            } else {
                console.log('НЕ огонь');
            }
        });
    }

}
