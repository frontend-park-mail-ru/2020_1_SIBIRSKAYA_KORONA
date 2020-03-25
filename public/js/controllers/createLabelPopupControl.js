import CreateLabelPopupModel from '../models/createLabelPopupModel.js';
import CreateLabelPopupView from '../views/createLabelPopup/createLabelPopupView.js';
import EventBus from '../libs/eventBus.js';

import ControllerChainLink from '../libs/controllerChainLink.js';
import {ChainLinkSignals} from '../libs/controllerChainLink.js';


/**
 * Create label popup controller
 */
export default class CreateLabelPopupController extends ControllerChainLink {
    /**
     * Controller constructor
     * @param {EventBus} parentEventBus - for communication with parent mvc
     */
    constructor(parentEventBus) {
        const chainLinkSignalsArray = Object.values(ChainLinkSignals);
        const actualSignals = [
            'getLabelColors',
            'gotLabelColors',

            'createLabel',
        ];

        const eventBus = new EventBus(actualSignals.concat(chainLinkSignalsArray));
        super(eventBus, parentEventBus);

        this.setCustomCloseFunction(() => {
            this.view.closeSelf();
            parentEventBus.call('closedCreateLabelPopup');
        });

        this.view = new CreateLabelPopupView(this.eventBus);
        this.model = new CreateLabelPopupModel(this.eventBus);
    }
}
