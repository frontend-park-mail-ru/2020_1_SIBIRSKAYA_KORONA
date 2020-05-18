import ControllerChainLink, {ChainLinkSignals} from '../libs/controllerChainLink.js';
import EventBus from '../libs/eventBus.js';
import AddChecklistPopupView from '../views/board/addChecklistPopup/addChecklistPopupView.js';


/**
 * Add checklist popup controller
 */
export default class AddChecklistPopupController extends ControllerChainLink {
    /**
     * Controller constructor
     * @param {EventBus} parentEventBus - for communication with parent mvc
     */
    constructor(parentEventBus) {
        const eventBus = new EventBus(Object.values(ChainLinkSignals));
        super(eventBus, parentEventBus);

        this.setCustomCloseFunction(() => {
            this.view.closeSelf();
            // parentEventBus.call('closeAddChecklistPopup');
        });

        this.view = new AddChecklistPopupView(parentEventBus);
    }
}
