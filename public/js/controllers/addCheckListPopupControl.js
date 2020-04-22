import ControllerChainLink, {ChainLinkSignals} from '../libs/controllerChainLink.js';
import EventBus from '../libs/eventBus.js';
import AddCheckListPopupView from '../views/board/addCheckListPopup/addCheckListPopupView.js';


/**
 * Add checklist popup controller
 */
export default class AddCheckListPopupController extends ControllerChainLink {
    /**
     * Controller constructor
     * @param {EventBus} parentEventBus - for communication with parent mvc
     */
    constructor(parentEventBus) {
        const eventBus = new EventBus(Object.values(ChainLinkSignals));
        super(eventBus, parentEventBus);

        this.setCustomCloseFunction(() => {
            this.view.closeSelf();
            // parentEventBus.call('closeAddCheckListPopup');
        });

        this.view = new AddCheckListPopupView(parentEventBus);
    }
}
