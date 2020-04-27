import ChangeLabelPopupModel from '../models/changeLabelPopupModel.js';
import ChangeLabelPopupView from '../views/board/changeLabelPopup/changeLabelPopupView.js';
import EventBus from '../libs/eventBus.js';

import ControllerChainLink from '../libs/controllerChainLink.js';
import {ChainLinkSignals} from '../libs/controllerChainLink.js';


/**
 * Change label popup controller
 */
export default class ChangeLabelPopupController extends ControllerChainLink {
    /**
     * Controller constructor
     * @param {EventBus} parentEventBus - for communication with parent mvc
     * @param {Object} labelData - board id and label id
     */
    constructor(parentEventBus, labelData = {boardID: null, labelID: null}) {
        const chainLinkSignalsArray = Object.values(ChainLinkSignals);
        const actualSignals = [
            'getLabel',
            'gotLabel',

            'saveLabel',
            'deleteLabel',
            'updatedTaskLabel',
        ];

        const eventBus = new EventBus(actualSignals.concat(chainLinkSignalsArray));
        super(eventBus, parentEventBus);

        this.eventBus.subscribe('updatedTaskLabel', ()=>{
            this.parentEventBus.call('updatedTaskLabel');
        });

        this.setCustomCloseFunction(() => {
            this.view.closeSelf();
            parentEventBus.call('closedChangeLabelPopup');
        });

        this.view = new ChangeLabelPopupView(this.eventBus);
        this.model = new ChangeLabelPopupModel(this.eventBus, labelData);
    }
}
