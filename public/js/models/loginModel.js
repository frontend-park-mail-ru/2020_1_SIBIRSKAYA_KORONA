import ApiService from '../libs/apiService.js';

export default class LoginModel {
    constructor(eventBus, router) {
        this.api = new ApiService('http://localhost:8080/');
        this.eventBus = eventBus;
        this.router = router;

        this.eventBus.subscribe('submit', this.login.bind(this));
        this.eventBus.subscribe('inputLogin', this.validateLogin.bind(this));
        this.eventBus.subscribe('inputPassword', this.validatePassword.bind(this));
    }

    validateLogin(data) {
        const error = (data === "");
        this.eventBus.call('inputLoginError', error);
    }

    validatePassword(data) {
        const error = (data === "");
        this.eventBus.call('inputPasswordError', error);
    }

    login(userInfo) {
        return this.api.login(userInfo).then((response) => {
            if (response['status'] === 308) {
                console.log(this);
                this.router.go('/profile', {});
            } else {
                console.log('НЕ огонь');
            }
        });
    }
}