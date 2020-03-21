import {sessionDelete, settingsGet} from '../libs/apiService.js';

/**
 * Main header model
 */
export default class HeaderModel {
    /**
     * Model constructor
     * @param {Object} eventBus to share events with main header view
     */
    constructor(eventBus) {
        this.eventBus = eventBus;

        this.logout = this.logout.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.getUserData = this.getUserData.bind(this);

        this.eventBus.subscribe('getData', this.getUserData);
        this.eventBus.subscribe('submitLogout', this.logout);
    }

    /**
     * Reaction for success login or getUserData event
     * Triggers view rerender
     * @param {Object} userData - logged in user data
     */
    onLogin(userData) {
        this.authorized = true;
        userData.auth = true;
        this.eventBus.call('gotData', userData);
    }

    /**
     * Reaction for global event bus logout event
     */
    onLogout() {
        this.authorized = false;
        this.eventBus.call('logout', {auth: false}); // trigger view render
    }

    /**
     * Use api to logout user
     */
    logout() {
        sessionDelete().then((response) => {
            switch (response.status) {
                case 200: // - OK (успешный запрос)
                case 403: // - Forbidden (В запросе куки нет)
                    this.onLogout();
                    this.eventBus.call('redirectLogin');
                    break;
                case 500: // - Internal Server Error (На сервере ошибка удаления куки из хранилища)
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
                case 200: // - OK (успешный запрос)
                    response.json()
                        .then((responseJson) => {
                            const data = responseJson.user;
                            this.onLogin(data);
                        }
                        );
                    break;

                case 403: // - Forbidden (В запросе на данные отсутствует кука)
                case 404: // - Not Found (Пользователя по куке не нашли)
                case 500: // - Internal Server Error (Внутренная ошибка при маршалинге найденного пользователя)
                    this.eventBus.call('logout');
                    break;

                default:
                    console.log('Бекендер молодец!!!');
            }
        });
    }
}
