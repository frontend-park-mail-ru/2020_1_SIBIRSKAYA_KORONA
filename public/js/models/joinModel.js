'use strict';

import Validator from '../libs/validator.js';
import ApiService from '../libs/apiService.js';

export default class JoinModel {
    constructor(eventBus, router) {
        this.api = new ApiService();

        this.eventBus = eventBus;
        this.router = router;
        this.eventBus.subscribe('submit', this.join.bind(this));
        this.eventBus.subscribe('userInput', this.validate.bind(this));
    }

    validate(dataType, data) {
        let valid = true;
        switch (dataType) {

            case 'inputName':
                valid = Validator.validateName(data);
                break;
            case 'inputSurname':
                valid = Validator.validateSurname(data);
                break;
            case 'inputNickname':
                valid = Validator.validateNickname(data);
                break;
            case 'inputPassword':
                valid = Validator.validatePassword(data);
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
