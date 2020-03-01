import Validator from '../libs/validator.js';
import {apiJoin} from '../libs/apiService.js';

/**
 * Join(Registration) model
 */
export default class JoinModel {
    /**
     * Model constructor
     * @param {Object} eventBus to share events with join view
     * @param {Object} router for redirect on success join
     */
    constructor(eventBus, router) {
        this.eventBus = eventBus;
        this.router = router;
        this.eventBus.subscribe('submit', this.join.bind(this));
        this.eventBus.subscribe('userInput', this.validate.bind(this));
    }

    /**
     * Validation, triggers on user input
     * @param {string} dataType - validation type: email, password ...
     * @param {string} data - data to validate
     * @return {boolean} is valid
     */
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

    /**
     * Validates all user input data on user submit
     * @param {Object} data - all user inputted data
     * @return {boolean}
     */
    validateAll(data) {
        return this.validate('inputName', data.name) &&
            this.validate('inputSurname', data.surname) &&
            this.validate('inputNickname', data.nickname) &&
            this.validate('inputPassword', data.password);
    }

    /**
     * Use api to send data to backend
     * @param {Object} userInfo - to send
     */
    join(userInfo) {
        if (!this.validateAll(userInfo)) {
            return;
        }
        apiJoin(userInfo).then((response) => {
            console.log('JOIN : ', response.status);
            switch (response.status) {
                case 200: // - OK (успешный запрос)
                case 308: // - PermanentRedirect (уже залогинен, редирект на главную)
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
