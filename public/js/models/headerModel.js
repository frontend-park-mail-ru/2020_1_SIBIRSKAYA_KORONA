import {sessionDelete} from '../libs/apiService.js';

/**
 * Main header model
 */
export default class HeaderModel {
    /**
     * Model constructor
     * @param {Object} eventBus to share events with main header view
     * @param {Object} router for redirect
     */
    constructor(eventBus, router) {
        this.eventBus = eventBus;
        this.router = router;

        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.logout = this.logout.bind(this);

        this.eventBus.subscribe('submitLogin', this.onLogin);
        this.eventBus.subscribe('submitLogout', this.logout);
        this.eventBus.subscribe('submitBoards', () => this.router.go('/board'));
        this.eventBus.subscribe('submitSettings', () => this.router.go('/profile'));
    }

    /**
     * Reaction for global event bus login event
     * @param {Object} userData - logged in user data
     */
    onLogin(userData) {
        this.authorized = true;
        userData.auth = true;
        this.eventBus.call('login', userData);
    }

    /**
     * Reaction for global event bus logout event
     */
    onLogout() {
        this.authorized = false;
        this.eventBus.call('logout', {auth: false});
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
                    this.router.go('/login');
            }
        });
    }
}
