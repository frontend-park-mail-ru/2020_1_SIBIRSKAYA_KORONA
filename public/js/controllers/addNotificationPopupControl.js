import ControllerChainLink, {ChainLinkSignals} from '../libs/controllerChainLink.js';
import EventBus from '../libs/eventBus.js';
import AddNotificationsPopupView from '../views/header/addNotificationsPopup/addNotificationsPopupView.js';

/**
 * Add header notifications popup controller
 */
export default class AddNotificationPopupController extends ControllerChainLink {
    /**
     * Controller constructor
     * @param {EventBus} parentEventBus - for communication with parent mvc
     */
    constructor(parentEventBus) {
        const eventBus = new EventBus(Object.values(ChainLinkSignals));
        super(eventBus, parentEventBus);

        this.setCustomCloseFunction(() => {
            this.view.closeSelf();
            parentEventBus.call('closeNotificationPopup');
        });

        this.view = new AddNotificationsPopupView(parentEventBus);
    }
}
