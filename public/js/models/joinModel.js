import Validator from '../libs/validator.js';
import {settingsPost} from '../libs/apiService.js';

/**
 * Join(Registration) model
 */
export default class JoinModel {
    /**
     * Model constructor
     * @param {Object} eventBus to share events with join view
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
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
        const eventBusCallParams = {
            text: '', // error text
            show: false, // show error or not
            field: dataType, // field with invalid input data
        };
        switch (dataType) {
            case 'inputName':
                eventBusCallParams.show = !Validator.validateName(data);
                break;
            case 'inputSurname':
                eventBusCallParams.show = !Validator.validateSurname(data);
                break;
            case 'inputNickname':
                eventBusCallParams.text = 'Недопустимый ник';
                eventBusCallParams.show = !Validator.validateNickname(data);
                break;
            case 'inputPassword':
                eventBusCallParams.show = !Validator.validatePassword(data);
                break;
            default:
                return false;
        }
        this.eventBus.call('userInputError', eventBusCallParams);
        return !eventBusCallParams.show;
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

        settingsPost(userInfo).then((response) => {
            switch (response.status) {
                case 200: // - OK (Успешная регистрация)
                case 303: // - See Other (Постучались на данный endpoint с выставленной кукой)
                    this.eventBus.call('joinSuccess', userInfo);
                    break;
                case 400: // - BadRequest (Тело запроса не соответствует модели пользователя)
                    console.log('BadRequest');
                    break;
                case 409: // - Conflict (Пользователь с такими регистрационными данными уже существует)
                    const errorText = 'Пользователь с таким ником уже существует';
                    this.eventBus.call('userInputError', {show: true, field: 'inputNickname', text: errorText});
                    break;
                default:
                    console.log('Бэкендер молодец!!!');
            }
        });
    }
}
