import HeaderModel from '../models/headerModel.js';
import HeaderView from '../views/header/headerView.js';
import EventBus from '../libs/eventBus.js';

/**
 * Header controller
 */
export default class HeaderController {
    /**
     * Controller constructor
     * @param {Object} router - for model to redirect on success registration
     */
    constructor(router) {
        this.eventBus = new EventBus([
            'login', // model call
            'logout', // model call
            'submitLogin',
            'submitLogout',
            'submitBoards',
            'submitSettings',
        ]);
        this.view = new HeaderView(this.eventBus);
        this.model = new HeaderModel(this.eventBus, router);

        router.globalEventBus.subscribe('login', this.model.onLogin);
        router.globalEventBus.subscribe('logout', this.model.onLogout);
    }
}
