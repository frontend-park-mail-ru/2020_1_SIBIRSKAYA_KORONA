import ApiService from '../libs/apiService.js';

export default class JoinModel {
    constructor(eventBus, router) {
        this.api = new ApiService();

        this.eventBus = eventBus;
        this.router = router;
        this.eventBus.subscribe('submit', this.join.bind(this));
        /*   this.eventBus.subscribe('inputSurname', this.validateSurname.bind(this));
           this.eventBus.subscribe('inputNickname', this.validateNickname.bind(this));
           this.eventBus.subscribe('inputName', this.validateName.bind(this));
           this.eventBus.subscribe('inputPassword', this.validatePassword.bind(this));
           this.eventBus.subscribe('inputPasswordRepeat', this.validatePasswordRepeat.bind(this));*/
        this.eventBus.subscribe('userInput', this.validate.bind(this));

        this.fieldsValidated = 0;
    }

    /*
    validatePasswordRepeat(data) {
        console.log(data);
        const valid = (data[0] !== data[1]);
        this.eventBus.call('inputPasswordRepeatError', valid);
    }

    validatePassword(data) {
        const valid = (data === '');
        this.eventBus.call('inputPasswordError', valid);
    }

    validateName(data) {
        const valid = (data === '');
        this.eventBus.call('inputNameError', valid);
    }

    validateNickname(data) {
        const valid = (data === '');
        this.eventBus.call('inputNicknameError', valid);
    }

    validateSurname(data) {
        const valid = (data === '');
        this.eventBus.call('inputSurnameError', valid);
    }
*/
    validate(dataType, data) {
        let valid = true;
        switch (dataType) {
            case 'inputName':
                valid = (data !== '');
                break;
            case 'inputSurname':
                valid = (data !== '');
                break;
            case 'inputNickname':
                valid = (data !== '');
                break;
            case 'inputPassword':
                valid = (data !== '');
                break;
            default:
                return false;
        }
        this.eventBus.call('userInputError', !valid, dataType);
        return valid;
    }

    validateAll(data) {
        return (
            this.validate('inputName', data.name) &&
            this.validate('inputSurname', data.surname) &&
            this.validate('inputNickname', data.nickname) &&
            this.validate('inputPassword', data.password)
        );
    }

    join(userInfo) {
        if (!this.validateAll(userInfo)) {
            console.log('INVALID');
            return;
        }
        this.api.join(userInfo).then((response) => {
            console.log(response.status);
            switch (response.status) {
                case 200: // - OK (успешный запрос)
                case 308: // - PermanentRedirect (уже залогинен, редирект на главную)
                    console.log('OK');
                    this.router.go('/profile', {});
                    break;
                case 400: // - BadRequest (неверный запрос)
                    console.log('BadRequest');
                    break;
                case 409: // - Conflict (пользователь с таким ником уже существует)
                    this.eventBus.call('userInputError', true, 'nicknameConflict');
                    break;
                default:
                    console.log('Бэкендер молодец!!!');
            }
        });
    }
}
