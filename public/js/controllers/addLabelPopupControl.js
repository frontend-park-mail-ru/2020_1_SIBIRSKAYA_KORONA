import AddLabelPopupModel from '../models/addLabelPopupModel.js';
import AddLabelPopupView from '../views/board/addLabelPopup/addLabelPopupView.js';
import CreateLabelPopupController from './createLabelPopupControl.js';
import ChangeLabelPopupController from './changeLabelPopupControl.js';

import EventBus from '../libs/eventBus.js';

import ControllerChainLink from '../libs/controllerChainLink.js';
import {ChainLinkSignals} from '../libs/controllerChainLink.js';


/**
 * Add label popup controller
 */
export default class AddLabelPopupController extends ControllerChainLink {
    /**
     * Controller constructor
     * @param {EventBus} parentEventBus - for communication with parent mvc
     * @param {Object} taskData - (boardID, columnID, taskID, labels)
     */
    constructor(parentEventBus, taskData = {boardID: null, columnID: null, taskID: null, labels: null}) {
        const chainLinkSignalsArray = Object.values(ChainLinkSignals);
        const actualSignals = [
            'getLabels',
            'gotLabels',

            'addLabel',
            'removeLabel',
            'labelStatusChanged',
            'updatedTaskLabel',

            'openCreateLabelPopup',
            'closedCreateLabelPopup',

            'openChangeLabelPopup',
            'closedChangeLabelPopup',
        ];

        const eventBus = new EventBus(actualSignals.concat(chainLinkSignalsArray));
        super(eventBus, parentEventBus);

        this.setCustomCloseFunction(() => {
            this.view.closeSelf();
            parentEventBus.call('closedAddLabelPopup');
        });

        this.taskData = taskData;
        this.view = new AddLabelPopupView(this.eventBus);
        this.model = new AddLabelPopupModel(this.eventBus, this.taskData);


        this.eventBus.subscribe('updatedTaskLabel', () => {
            this.parentEventBus.call('updatedTaskLabel');
        });

        this.eventBus.subscribe('openCreateLabelPopup', (button) => {
            const childController = new CreateLabelPopupController(this.eventBus, this.taskData.boardID);
            this.setChildEventBus(childController.eventBus);
            childController.view.render(button);
        });

        this.eventBus.subscribe('openChangeLabelPopup', (button, labelID) => {
            const childController = new ChangeLabelPopupController(this.eventBus, {
                labelID,
                boardID: this.taskData.boardID,
            });
            this.setChildEventBus(childController.eventBus);
            childController.view.render(button);
        });

        this.eventBus.subscribe('closedCreateLabelPopup', () => {
            this.view.render();
        });
        this.eventBus.subscribe('closedChangeLabelPopup', () => {
            this.view.render();
        });
    }
}
