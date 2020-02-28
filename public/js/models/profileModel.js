import Validator from '../libs/validator.js';
import {apiGetUser, apiPutUser} from '../libs/apiService.js';

export default class JoinModel {
    constructor(eventBus, router) {
        this.eventBus = eventBus;
        this.router = router;

        this.eventBus.subscribe('getData', this.getUser.bind(this));

        this.putUser = this.putUser.bind(this);
        this.eventBus.subscribe('submitAbout', this.putUser);
        this.eventBus.subscribe('submitPasswords', this.putUser);
        this.eventBus.subscribe('submitEmail', this.putUser);
        this.eventBus.subscribe('submitImg', this.putUser);

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
            case 'inputPassword':
                valid = Validator.validatePassword(data);
                break;
            case 'inputEmail':
                valid = Validator.validateEmail(data);
                break;
            default:
                return true;
        }
        this.eventBus.call('userInputError', !valid, dataType);
        return valid;
    }

    validateAll(data) {
        for (const [key, value] of Object.entries(data)) {
            if (!this.validate(key + '', value)) {
                return false;
            }
        }
        return true;
    }

    putUser(data) {
        if (!this.validateAll(data)) {
            console.log('INVALID');
            return;
        }
        console.log(data);
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
        apiPutUser(formData).then((res) => res.json()).then((response) => {
            console.log('Put status    ', response.status);
            switch (response.status) {
                case 200: // - OK (успешный запрос)
                    this.getUser();
                    break;
                case 401: // - Unauthorized (не авторизован)
                    this.router.go('/');
                    break;
                case 403: // - Forbidden (нет прав)
                    console.log('403');
                    this.eventBus.call('userInputError', true, 'inputOldPassword');
                    break;
                case 404: // - NotFound (нет пользвателя с указанным ником)
                    break;
                default:
                    console.log('Бекендер молодец!!!');
            }
        });
    }

    getUser() {
        apiGetUser({}).then((response) => {
            console.log('profile get user' + response.status);
            switch (response.status) {
                case 200: // - OK (успешный запрос)
                    const data = response.body.user;
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
                    console.log('Бекендер молодец!!!');
            }
        });
    }
}
