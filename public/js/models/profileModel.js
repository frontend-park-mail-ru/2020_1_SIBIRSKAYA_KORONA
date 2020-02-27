import {apiPutUser, apiGetUser} from '../libs/apiService.js';

export default class JoinModel {
    constructor(eventBus, router) {
        this.eventBus = eventBus;
        this.router = router;

        this.eventBus.subscribe('getData', this.getUser.bind(this));
        this.eventBus.subscribe('inputSurname', this.validateSurname.bind(this));
        this.eventBus.subscribe('inputName', this.validateName.bind(this));
        this.eventBus.subscribe('inputOldPassword', this.validatePassword.bind(this));
        this.eventBus.subscribe('inputPassword', this.validatePassword.bind(this));
        this.eventBus.subscribe('inputPasswordRepeat', this.validatePasswordRepeat.bind(this));
        this.eventBus.subscribe('inputEmail', this.validateEmail.bind(this));

        this.putUser = this.putUser.bind(this);
        this.eventBus.subscribe('submitAbout', this.putUser);
        this.eventBus.subscribe('submitPasswords', this.putUser);
        this.eventBus.subscribe('submitEmail', this.putUser);
        this.eventBus.subscribe('submitImg', this.putUser);
    }

    validatePasswordRepeat(data) {
        console.log(data);
        const error = (data[0] !== data[1]);
        this.eventBus.call('inputPasswordRepeatError', error);
    }

    validatePassword(data) {
        const error = (data === '');
        this.eventBus.call('inputOldPasswordError', error);
    }

    validateName(data) {
        const error = (data === '');
        this.eventBus.call('inputNameError', error);
    }

    validateSurname(data) {
        const error = (data === '');
        this.eventBus.call('inputSurnameError', error);
    }

    validateEmail(data) {
        const error = (data === '');
        this.eventBus.call('inputEmailError', error);
    }

    putUser(data) {
        const formData = new FormData();
        formData.append('newNickname', data.inputNickname);
        formData.append('newName', data.inputName || '');
        formData.append('newSurname', data.inputSurname || '');
        formData.append('newEmail', data.inputEmail || '');
        formData.append('oldPassword', data.inputOldPassword || '');
        formData.append('newPassword', data.inputPassword || '');

        if (data.avatar !== void 0) {
            formData.append('avatar', data.avatar);
            formData.append('avatarExtension', data.avatar.name.split('.').pop());
        }

        apiPutUser(formData).then((response) => {
            // console.log(response.status);
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
        apiGetUser({}).then((response) => {
            console.log('profile get user' + response.status);
            switch (response.status) {
            case 200: // - OK (успешный запрос)
                // console.log(response);
                const data = response.body.user;
                data.avatar = (data.avatar === 'avatars/kek.jpg') ? '/img/default_avatar.png' : data.avatar;
                this.eventBus.call('gotData', data);
                break;
            case 303: // - SeeOther (не авторизован, случай без query string)
                this.router.go('/login');
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
