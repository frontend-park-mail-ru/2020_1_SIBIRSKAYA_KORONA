import ControllerChainLink, {ChainLinkSignals} from '../libs/controllerChainLink.js';
import EventBus from '../libs/eventBus.js';
import HeaderModel from '../models/headerModel.js';
import HeaderView from '../views/header/headerView.js';
import AddNotificationPopupController from './addNotificationPopupControl.js';

/**
 * Header controller
 */
export default class HeaderController extends ControllerChainLink {
    /**
     * Controller constructor
     * @param {Object} router - for model to redirect
     * @param {Object} globalEventBus - for subscribe on global events
     */
    constructor(router, globalEventBus) {
        const actualSignals = [
            // model calls
            'login',
            'logout',
            'gotData',
            'unauthorized',
            'gotNotifications',
            // view calls
            'getData',
            'submitLogin',
            'submitJoin',
            'submitLogout',
            'submitBoards',
            'submitSettings',
            'openNotificationsPopup',
            'getNotifications',
            'closeNotificationPopup',
        ];
        const eventBus = new EventBus(actualSignals.concat(Object.values(ChainLinkSignals)));
        super(eventBus, null);

        this.view = new HeaderView(this.eventBus);
        this.model = new HeaderModel(this.eventBus);

        this.eventBus.subscribe('submitSettings', () => router.go('/profile'));
        this.eventBus.subscribe('submitBoards', () => router.go('/boards'));
        this.eventBus.subscribe('submitLogin', () => router.go('/login'));
        this.eventBus.subscribe('submitJoin', () => router.go('/join'));
        this.eventBus.subscribe('unauthorized', () => {
            router.go('/login');
            globalEventBus.call('enableNotifications', false);
        });

        this.eventBus.subscribe('openNotificationsPopup', (button) => {
            const notificationController = new AddNotificationPopupController(this.eventBus);
            this.setChildEventBus(notificationController.eventBus);
            notificationController.view.render(button);
        });

        globalEventBus.subscribe('login', this.model.getUserData);
        globalEventBus.subscribe('userDataChanged', this.model.onLogin);
        globalEventBus.subscribe('logout', this.model.onLogout);
    }
}
