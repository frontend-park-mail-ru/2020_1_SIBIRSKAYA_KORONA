import {sessionDelete} from '../libs/apiService.js';
/**
 * Join(Registration) model
 */
export default class HeaderModel {
    /**
     * Model constructor
     * @param {Object} eventBus to share events with join view
     * @param {Object} router for redirect on success join
     */
    constructor(eventBus, router) {
        this.eventBus = eventBus;
        this.router = router;

        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);

        this.eventBus.subscribe('submitLogin', this.onLogin);
        this.eventBus.subscribe('submitLogout', this.onLogout);
        this.eventBus.subscribe('submitBoards', () => this.router.go('/board'));
        this.eventBus.subscribe('submitSettings', () => this.router.go('/profile'));
    }

    onLogin(userData) {
        this.authorized = true;
        userData.auth = true;
        this.eventBus.call('login', userData);
    }

    onLogout() {
        this.authorized = false;
        sessionDelete().then((response) => {
            switch (response.status) {
                case 200: // - OK (успешный запрос)
                case 303: // - нет куки (Уже разлогинен)
                    this.eventBus.call('logout', {auth: false});
                    this.router.go('/login');
            }
        });
    }
}
