import Validator from '../libs/validator.js';
import {apiGetUser, apiPutUser} from '../libs/apiService.js';

/**
 * Profile model
 */
export default class JoinModel {
    /**
     * Model constructor
     * @param {Object} eventBus to share events with join view
     * @param {Object} router for redirect on unauthorized
     */
    constructor(eventBus, router) {
        this.eventBus = eventBus;
        this.router = router;

        this.putUser = this.putUser.bind(this);
        this.eventBus.subscribe('submitAbout', this.putUser);
        this.eventBus.subscribe('submitPasswords', this.putUser);
        this.eventBus.subscribe('submitEmail', this.putUser);
        this.eventBus.subscribe('submitImg', this.putUser);
        this.eventBus.subscribe('userInput', this.validate.bind(this));
        this.eventBus.subscribe('getData', this.getUser.bind(this));
    }

    /**
     * Validation, triggers on user input
     * @param {string} dataType - validation type: email, password ...
     * @param {string} data - data to validate
     * @return {boolean} is valid
     */
    validate(dataType, data) {
        let valid = true;
        let errorText;
        switch (dataType) {
            case 'inputName':
                valid = Validator.validateName(data);
                break;
            case 'inputSurname':
                valid = Validator.validateSurname(data);
                break;
            case 'inputPassword':
                valid = Validator.validatePassword(data);
                errorText = (!valid) ? 'Недопустимый пароль' : '';
                break;
            case 'inputOldPassword':
                valid = Validator.validatePassword(data);
                errorText = (!valid) ? 'Неверный пароль' : '';
                break;
            case 'inputEmail':
                valid = Validator.validateEmail(data);
                break;
            default:
                return true;
        }
        this.eventBus.call('userInputError', !valid, dataType, errorText);
        return valid;
    }

    /**
     * Validates all user input data on user submit
     * @param {Object} data - all user inputted data
     * @return {boolean}
     */
    validateAll(data) {
        for (const [key, value] of Object.entries(data)) {
            console.log(key);
            if (!this.validate(key + '', value)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Use api to send data to backend and change user settings
     * @param {Object} data - user data to update
     */
    putUser(data) {
        if (!this.validateAll(data)) {
            console.log('ZALUPA');
            return;
        }
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
            console.log('PUT USER : ', response.status);
            switch (response.status) {
                case 200: // - OK (успешный запрос)
                    this.getUser();
                    break;
                case 401: // - Unauthorized (не авторизован)
                    this.router.go('/');
                    break;
                case 403: // - Forbidden (нет прав)
                    this.eventBus.call('userInputError', true, 'inputOldPassword');
                    break;
                case 404: // - NotFound (нет пользвателя с указанным ником)
                    break;
                default:
                    console.log('Бекендер молодец!!!');
            }
        });
    }

    /**
     * Use api to get user data and settings from backend
     */
    getUser() {
        apiGetUser({}).then((response) => {
            console.log('GET USER : ', response.status);
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
