import ApiService from '../libs/apiService.js';

export default class JoinModel {
    constructor(eventBus) {
        this.api = new ApiService('http://localhost:8080/');
        this.eventBus = eventBus;

        this.join = this.join.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validateNickname = this.validateNickname.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validatePasswordRepeat = this.validatePasswordRepeat.bind(this);

        this.eventBus.subscribe('submit', this.join);
        this.eventBus.subscribe('inputEmail', this.validateEmail);
        this.eventBus.subscribe('inputNickname', this.validateNickname);
        this.eventBus.subscribe('inputName', this.validateName);
        this.eventBus.subscribe('inputPassword', this.validatePassword);
        this.eventBus.subscribe('inputPasswordRepeat', this.validatePasswordRepeat);
    }

    validatePasswordRepeat(data) {
        console.log(data);
        let a = 4;
        if(a === 3) {
            this.eventBus.call('inputPasswordRepeatError');
        }
    }

    validatePassword(data) {
        let a = 4;
        if(a === 3) {
            this.eventBus.call('inputPasswordError');
        }
    }

    validateName(data) {
        let a = 4;
        if(a === 3) {
            this.eventBus.call('inputNameError');
        }
    }

    validateNickname(data) {
        let a = 4;
        if(a === 3) {
            this.eventBus.call('inputNicknameError');
        }
    }

    validateEmail(data) {
        let a = 4;
        if(a === 3) {
            this.eventBus.call('inputEmailError');
        }
    }

    join(userInfo) {
        return this.api.join(userInfo).then((response) => {
            if (response['status'] === 308) {
                console.log('ОГОНЬ');
            } else {
                console.log('НЕ огонь');
            }
        });
    }

}
