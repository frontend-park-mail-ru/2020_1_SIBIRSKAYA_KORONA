import Validator from '../libs/validator.js';
import {settingsGet, settingsPut, sessionDelete} from '../libs/apiService.js';

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
        this.eventBus.subscribe('logout', this.logout.bind(this));
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
            // console.log(key);
            if (!this.validate(key + '', value)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Appends value to form data if value is not empty
     * @param {FormData} formData - Form to add fields
     * @param {string} fieldName - field key
     * @param {string} fieldValue - field value
     * @return {boolean} true if value was appended
     */
    appendFieldIfNotEmpty(formData, fieldName, fieldValue) {
        if (fieldValue) {
            formData.append(fieldName, fieldValue);
            return true;
        }
        return false;
    }

    /**
     * Use api to send data to backend and change user settings
     * @param {Object} data - user data to update
     */
    putUser(data) {
        if (!this.validateAll(data)) {
            return;
        }
        console.log(data);
        const formData = new FormData();
        this.appendFieldIfNotEmpty(formData, 'newNickname', data.inputNickname);
        this.appendFieldIfNotEmpty(formData, 'newName', data.inputName);
        this.appendFieldIfNotEmpty(formData, 'newSurname', data.inputSurname);
        this.appendFieldIfNotEmpty(formData, 'newEmail', data.inputEmail);
        this.appendFieldIfNotEmpty(formData, 'oldPassword', data.inputOldPassword);
        this.appendFieldIfNotEmpty(formData, 'newPassword', data.inputPassword);
        if (data.avatar !== void 0) {
            this.appendFieldIfNotEmpty(formData, 'avatar', data.avatar);
            this.appendFieldIfNotEmpty(formData, 'avatarExtension', data.avatar.name.split('.').pop());
        }
        console.log(formData);

        settingsPut(formData).then((response) => {
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
        settingsGet({}).then((response) => {
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

    /**
     * Use api to logout user
     */
    logout() {
        sessionDelete().then((response) => {
            console.log('LOGOUT : ', response.status);
            switch (response.status) {
                case 200: // - OK (успешный запрос)
                case 303: // - SeeOther (смотреть другое, редирект на логин)
                    this.router.go('/login');
            }
        });
    }
}
