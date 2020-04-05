import Validator from '../libs/validator.js';
import {sessionPost} from '../libs/apiService.js';

/**
 * Login model
 */
export default class LoginModel {
    /**
     * @description Constructor
     * @param {Object} eventBus to call and subscribe for signals
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.subscribe('submit', this.login.bind(this));
    }

    /**
     * Validate user inputted login
     * @param {string} data - login to validate
     * @return {boolean} is valid
     */
    validateLogin(data) {
        const valid = Validator.validateLogin(data);
        if (!valid) {
            this.eventBus.call('inputError', !valid);
        }
        return valid;
    }

    /**
     * Validate user inputted password
     * @param {string} data - password to validate
     * @return {boolean} is valid
     */
    validatePassword(data) {
        const valid = Validator.validatePassword(data);
        if (!valid) {
            this.eventBus.call('inputError', !valid);
        }
        return valid;
    }

    /**
     * Use api to send data to backend
     * @param {Object} userInfo - to send
     */
    login(userInfo) {
        if (!this.validateLogin(userInfo.nickname) || !this.validatePassword(userInfo.password)) {
            return;
        }
        sessionPost(userInfo).then((response) => {
            switch (response.status) {
                case 200: // - OK (успешный запрос)
                case 303: // - See Other (Постучались на данный endpoint с выставленной кукой)
                    this.eventBus.call('loginSuccess', userInfo);
                    break;
                case 400: // - Bad Request (Невалидное тело запроса)
                case 404: // - Bad Request (Невалидное тело запроса)
                case 401: // - Conflict (Пароль неверный)
                    this.eventBus.call('inputError', true);
                    break;
                default:
                    console.log('Бэкендер молодец!!!');
            }
        });
    }
}
