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
     * @param {Object} router - main router
     * @param {number} boardID - board id
     * @param {number} columnID - column id
     * @param {number} taskID - task id
     */
    constructor(boardEventBus, router, boardID, columnID, taskID) {
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

            'addComment',

            'unauthorized',
            'goBack',
        ];

        const eventBus = new EventBus(actualSignals.concat(chainLinkSignalsArray));
        super(eventBus, null);

        this.setCustomCloseFunction(() => {
            this.view.closeSelf();
            boardEventBus.call('closeTaskSettings');
        });

        this.taskData = {boardID, columnID, id: taskID};
        this.router = router;
        this.view = new TaskSettingsView(this.eventBus);
        this.model = new TaskSettingsModel(this.eventBus, this.taskData);

        this.eventBus.subscribe('openAddLabelPopup', (button) => {
            const childController = new AddLabelPopupController(this.eventBus, this.taskData);
            this.setChildEventBus(childController.eventBus);
            childController.view.render(button);
        });

        this.eventBus.subscribe('unauthorized', () => router.go('/login'));
        this.eventBus.subscribe('goBack', () => router.goBack());
    }
}
