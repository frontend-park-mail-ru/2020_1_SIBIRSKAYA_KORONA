import Validator from '../libs/validator.js';
import {sessionPost} from '../libs/apiService.js';

/**
 * Login model
 */
export default class LoginModel {
    /**
     * @description Constructor
     * @param {Object} eventBus to call and subscribe for signals
     * @param {Object} router to route on main page after login
     */
    constructor(eventBus, router) {
        this.eventBus = eventBus;
        this.router = router;
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
                case 308: // - PermanentRedirect (уже залогинен, редирект на главную)
                    this.router.go('/profile', {});
                    this.router.globalEventBus.call('login', userInfo);
                    break;
                case 400: // - BadRequest (неверный запрос)
                case 404: // - NotFound (нет пользвателя с указанным ником)
                case 412: // - PreconditionFailed (неверный пароль)
                    this.eventBus.call('inputError', true);
                    break;
                default:
                    console.log('Бэкендер молодец!!!');
            }
        });
    }
}
