import ControllerChainLink, {ChainLinkSignals} from '../libs/controllerChainLink.js';
import AddAssignsPopupView from '../views/board/addAssignsPopup/addAssignsPopupView.js';
import EventBus from '../libs/eventBus.js';


/**
 * Add assigns popup controller
 */
export default class AddAssignsPopupController extends ControllerChainLink {
    /**
     * Controller constructor
     * @param {EventBus} parentEventBus - for communication with parent mvc
     */
    constructor(parentEventBus) {
        const eventBus = new EventBus(Object.values(ChainLinkSignals));
        super(eventBus, parentEventBus);

        this.setCustomCloseFunction(() => {
            this.view.closeSelf();
            parentEventBus.call('closeAssignsPopup');
        });

        this.view = new AddAssignsPopupView(parentEventBus);
    }
}
