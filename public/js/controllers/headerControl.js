import EventBus from '../libs/eventBus.js';
import HeaderModel from '../models/headerModel.js';
import HeaderView from '../views/header/headerView.js';

/**
 * Header controller
 */
export default class HeaderController {
    /**
     * Controller constructor
     * @param {Object} router - for model to redirect
     * @param {Object} globalEventBus - for subscribe on global events
     */
    constructor(router, globalEventBus) {
        this.eventBus = new EventBus([
            // model calls
            'login',
            'logout',
            'gotData',
            'unauthorized',
            // view calls
            'getData',
            'submitLogin',
            'submitJoin',
            'submitLogout',
            'submitBoards',
            'submitSettings',
        ]);
        this.view = new HeaderView(this.eventBus);
        this.model = new HeaderModel(this.eventBus);

        this.eventBus.subscribe('submitSettings', () => router.go('/profile'));
        this.eventBus.subscribe('unauthorized', () => router.go('/login'));
        this.eventBus.subscribe('submitBoards', () => router.go('/boards'));
        this.eventBus.subscribe('submitLogin', () => router.go('/login'));
        this.eventBus.subscribe('submitJoin', () => router.go('/join'));

        globalEventBus.subscribe('login', this.model.getUserData);
        globalEventBus.subscribe('userDataChanged', this.model.onLogin);
        globalEventBus.subscribe('logout', () => {
            this.model.onLogout();
            globalEventBus.call('enableNotifications', false);
        });
    }
}
