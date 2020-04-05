import TaskSettingsModel from '../models/taskSettingsModel.js';
import TaskSettingsView from '../views/board/taskSettings/taskSettingsView.js';
import EventBus from '../libs/eventBus.js';
import AddLabelPopupController from './addLabelPopupControl.js';

import ControllerChainLink from '../libs/controllerChainLink.js';
import {ChainLinkSignals} from '../libs/controllerChainLink.js';

/**
 * Task settings controller
 */
export default class TaskSettingsController extends ControllerChainLink {
    /**
     * Task settings controller constructor
     * @param {EventBus} boardEventBus - event bus to communicate with board
     * @param {number} boardID - board id
     * @param {number} columnID - column id
     * @param {number} taskID - task id
     */
    constructor(boardEventBus, boardID, columnID, taskID) {
        const chainLinkSignalsArray = Object.values(ChainLinkSignals);
        const actualSignals = [
            'getTaskSettings',
            'gotTaskSettings',

            'openAddLabelPopup',
            'closedAddLabelPopup',

            'openAddMemberPopup',
            'closedAddMemberPopup',

            'saveTaskSettings',
            'deleteTask',
        ];

        const eventBus = new EventBus(actualSignals.concat(chainLinkSignalsArray));
        super(eventBus, null);

        this.setCustomCloseFunction(() => {
            this.view.closeSelf();
            boardEventBus.call('closeTaskSettings');
        });


        this.view = new TaskSettingsView(this.eventBus);
        this.model = new TaskSettingsModel(this.eventBus, boardID, columnID, taskID);

        this.eventBus.subscribe('openAddLabelPopup', (button) => {
            const childController = new AddLabelPopupController(this.eventBus);
            this.setChildEventBus(childController.eventBus);
            childController.view.render(button);
        });
    }
}
