'use strict';

import ApiService from '../libs/apiService.js';

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
        this.api = new ApiService();
        this.eventBus = eventBus;
        this.router = router;

        this.eventBus.subscribe('submit', this.login.bind(this));
    }

    validateLogin(data) {
        const valid = (data !== '');
        if (!valid) {
            this.eventBus.call('inputError', !valid);
        }
        return valid;
    }

    validatePassword(data) {
        const valid = (data !== '');
        if (!valid) {
            this.eventBus.call('inputError', !valid);
        }
        return valid;
    }

    login(userInfo) {
        if (!this.validateLogin(userInfo.nickname) || !this.validatePassword(userInfo.password)) {
            return;
        }
        this.api.login(userInfo).then((response) => {
            console.log('login: ' + response.status);
            switch (response.status) {
                case 200: // - OK (успешный запрос)
                case 308: // - PermanentRedirect (уже залогинен, редирект на главную)
                    this.router.go('/profile', {});
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
