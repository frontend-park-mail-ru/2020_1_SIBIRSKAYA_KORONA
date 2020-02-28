import Validator from '../libs/validator.js';
import {apiLogin} from '../libs/apiService.js';

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

    validateLogin(data) {
        const valid = Validator.validateLogin(data);
        if (!valid) {
            this.eventBus.call('inputError', !valid);
        }
        return valid;
    }

    validatePassword(data) {
        const valid = Validator.validatePassword(data);
        if (!valid) {
            this.eventBus.call('inputError', !valid);
        }
        return valid;
    }

    login(userInfo) {
        if (!this.validateLogin(userInfo.nickname) || !this.validatePassword(userInfo.password)) {
            return;
        }
        apiLogin(userInfo).then((response) => {
            switch (response.status) {
                case 200: // - OK (успешный запрос)
                case 308: // - PermanentRedirect (уже залогинен, редирект на главную)
                    this.eventBus.call('routeToProfile', '/profile');
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
