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
                case 303: // - нет куки (Уже разлогинен)
                    this.onLogout();
                    this.eventBus.call('redirectLogin');
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
                    const data = response.body.user;
                    this.onLogin(data);
                    break;
                case 303: // - SeeOther (не авторизован, случай без query string)
                    this.eventBus.call('logout');
                    break;
                case 400: // - BadRequest (неверный запрос)
                    console.log('BadRequest');
                    break;
                case 404: // - NotFound (нет пользвателя с указанным ником)
                    break;
                default:
                    console.log('Бекендер молодец!!!');
            }
        });
    }
}
