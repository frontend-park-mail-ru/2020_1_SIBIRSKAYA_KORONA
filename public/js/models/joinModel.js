import ApiService from '../libs/apiService.js';

export default class JoinModel {
    constructor(eventBus, router) {
        this.api = new ApiService('http://localhost:8080/');
        // this.api = new ApiService('http://89.208.197.150:8080/');

        this.eventBus = eventBus;
        this.router = router;

        this.eventBus.subscribe('submit', this.join.bind(this));
        this.eventBus.subscribe('inputSurname', this.validateSurname.bind(this));
        this.eventBus.subscribe('inputNickname', this.validateNickname.bind(this));
        this.eventBus.subscribe('inputName', this.validateName.bind(this));
        this.eventBus.subscribe('inputPassword', this.validatePassword.bind(this));
        this.eventBus.subscribe('inputPasswordRepeat', this.validatePasswordRepeat.bind(this));
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
            console.log(response.status);
            if (response.status === 200) {
                this.router.go('/profile', {});
                console.log('ОГОНЬ');
            } else {
                console.log('НЕ огонь');
            }
        });
    }

}
