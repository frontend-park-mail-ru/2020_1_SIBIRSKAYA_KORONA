import Validator from '../libs/validator.js';
import {settingsGet, settingsPut} from '../libs/apiService.js';

/**
 * Profile model
 */
export default class JoinModel {
    /**
     * Model constructor
     * @param {Object} eventBus to share events with join view
     */
    constructor(eventBus) {
        this.eventBus = eventBus;

        this.putUser = this.putUser.bind(this);
        this.eventBus.subscribe('submitAbout', this.putUser);
        this.eventBus.subscribe('submitPasswords', this.putUser);
        this.eventBus.subscribe('submitEmail', this.putUser);
        this.eventBus.subscribe('submitImg', this.putUser);
        this.eventBus.subscribe('userInput', this.validate.bind(this));
        this.eventBus.subscribe('getData', this.getUserData.bind(this));
    }

    /**
     * Validation, triggers on user input
     * @param {string} dataType - validation type: email, password ...
     * @param {string} data - data to validate
     * @return {boolean} is valid
     */
    validate(dataType, data) {
        const eventBusCallParams = {
            text: '', // error text
            show: false, // show error or not
            field: dataType, // field with invalid input data
        };
        switch (dataType) {
            case 'inputName':
                eventBusCallParams.show = !Validator.validateName(data);
                break;
            case 'inputSurname':
                eventBusCallParams.show = !Validator.validateSurname(data);
                break;
            case 'inputPassword':
                eventBusCallParams.show = data === '' || !Validator.validatePassword(data);
                eventBusCallParams.text = (eventBusCallParams.show) ? 'Недопустимый пароль' : '';
                break;
            case 'inputOldPassword':
                eventBusCallParams.show = data === '' || !Validator.validatePassword(data);
                eventBusCallParams.text = (eventBusCallParams.show) ? 'Неверный пароль' : '';
                break;
            case 'inputEmail':
                eventBusCallParams.show = !Validator.validateEmail(data);
                break;
            default:
                return true;
        }
        this.eventBus.call('userInputError', eventBusCallParams);
        return !eventBusCallParams.show;
    }

    /**
     * Validates all user input data on user submit
     * @param {Object} data - all user inputted data
     * @return {boolean}
     */
    validateAll(data) {
        for (const [key, value] of Object.entries(data)) {
            if (!this.validate(key + '', value)) { // undefined is valid
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

        settingsPut(formData).then((response) => {
            switch (response.status) {
                case 200: // - OK (успешный запрос)
                    this.getUserData();
                    break;
                case 400: // - Unauthorized (Невалидное тело запроса с информацией для обновления)
                    this.eventBus.call('unauthorized');
                    break;
                case 403: // - NotFound (В запросе отсутствует кука)
                    break;
                case 403:
                    this.eventBus.call('wrongPassword');
                    this.eventBus.call('userInputError', {show: true, field: 'inputOldPassword'});
                    break;
                default:
                    console.log('Бекендер молодец!!!');
            }
        });
    }

    /**
     * Use api to get user data and settings from backend
     */
    getUserData() {
        settingsGet().then((response) => {
            switch (response.status) {
                case 200: // - OK (Валидный запрос данных пользователя)
                    response.json()
                        .then((responseJson) => {
                            this.eventBus.call('gotData', responseJson.user); // for local eventBus (View subscribed)
                            this.eventBus.call('userDataChanged', responseJson.user); // for global eventBus (Header)
                        });
                    break;
                case 403: // - Forbidden (В запросе на данные отсутствует кука)
                    this.eventBus.call('unauthorized');
                    break;
                case 404: // - NotFound (Пользователя по куке не нашли)
                    console.log('BadRequest');
                    break;
                case 500: // - Internal Server Error (Внутренная ошибка при маршалинге найденного пользователя)
                    break;
                default:
                    console.log('Бекендер молодец!!!');
            }
        });
    }
}
