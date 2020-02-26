import ApiService from '../libs/apiService.js';

export default class JoinModel {
    constructor(eventBus, router) {
        // this.api = new ApiService('http://localhost:8080/');
        this.api = new ApiService('http://89.208.197.150:8080/');
        this.eventBus = eventBus;
        this.router = router;

        this.eventBus.subscribe('getData', this.getUser.bind(this));
        this.eventBus.subscribe('inputSurname', this.validateSurname.bind(this));
        this.eventBus.subscribe('inputName', this.validateName.bind(this));
        this.eventBus.subscribe('inputOldPassword', this.validatePassword.bind(this));
        this.eventBus.subscribe('inputPassword', this.validatePassword.bind(this));
        this.eventBus.subscribe('inputPasswordRepeat', this.validatePasswordRepeat.bind(this));
        this.eventBus.subscribe('inputEmail', this.validateEmail.bind(this));
    }

    validatePasswordRepeat(data) {
        const error = (data[0] !== data[1]);
        this.eventBus.call('inputPasswordRepeatError', error);
    }

    validatePassword(data) {
        const error = (data === "");
        this.eventBus.call('inputPasswordError', error);
    }

    validateName(data) {
        const error = (data === "");
        this.eventBus.call('inputNameError', error);
    }

    validateSurname(data) {
        const error = (data === "");
        this.eventBus.call('inputSurnameError', error);
    }

    validateEmail(data) {
        const error = (data === "");
        this.eventBus.call('inputSurnameError', error);
    }

    putUser() {
        const data = {};
        this.api.postUser(data).then((response) => {
            console.log(response.status);
            switch (response.status) {
                case 200: // - OK (успешный запрос)
                    this.getUser();
                    break;
                case 401: // - Unauthorized (не авторизован)
                    break;
                case 403: // - Forbidden (нет прав)
                    break;
                case 404: // - NotFound (нет пользвателя с указанным ником)
                    break;
                default:
                    console.log('Пора орать на бекендеров!!!');
            }
        });
    }

    getUser() {
        console.log('profile get user');
        this.api.getUser({}).then((response) => {
            console.log(response.status);
            switch (response.status) {
                case 200: // - OK (успешный запрос)
                    console.log('ОГОНЬ');
                    const data = response.body.user;
                    console.log(data);
                    data.avatar = data.avatar || '/img/default_avatar.png';
                    this.eventBus.call('gotData', data);
                    break;
                case 303: // - SeeOther (не авторизован, случай без query string)
                    break;
                case 400: // - BadRequest (неверный запрос)
                    break;
                case 404: // - NotFound (нет пользвателя с указанным ником)
                    break;
                default:
                    console.log('Пора идти орать на бекендеров!!');
            }
        });
    }
}
