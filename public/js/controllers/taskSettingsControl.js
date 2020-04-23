import ControllerChainLink, {ChainLinkSignals} from '../libs/controllerChainLink.js';
import EventBus from '../libs/eventBus.js';

import TaskSettingsModel from '../models/taskSettingsModel.js';
import TaskSettingsView from '../views/board/taskSettings/taskSettingsView.js';
import AddChecklistPopupController from './addChecklistPopupControl.js';

import AddLabelPopupController from './addLabelPopupControl.js';

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

            'openAddChecklistPopup',
            'closeAddChecklistPopup',

            'addChecklist',
            'addChecklistItem',
            'updateChecklistItem',
            'deleteChecklist',

            'saveTaskSettings',
            'deleteTask',

            'addComment',

            'unauthorized',
            'goToBoards',
        ];

        const eventBus = new EventBus(actualSignals.concat(chainLinkSignalsArray));
        super(eventBus, null);

        this.setCustomCloseFunction(() => {
            this.view.closeSelf();
            boardEventBus.call('closeTaskSettings');
        });

        this.router = router;
        this.view = new TaskSettingsView(this.eventBus);
        this.model = new TaskSettingsModel(this.eventBus, boardID, columnID, taskID);

        this.eventBus.subscribe('openAddLabelPopup', (button) => {
            const childController = new AddLabelPopupController(this.eventBus);
            this.setChildEventBus(childController.eventBus);
            childController.view.render(button);
        });

        this.eventBus.subscribe('openAddChecklistPopup', (button) => {
            const checklistPopupController = new AddChecklistPopupController(this.eventBus);
            this.setChildEventBus(checklistPopupController.eventBus);
            checklistPopupController.view.render(button);
        });

        this.eventBus.subscribe('unauthorized', () => router.go('/login'));
        this.eventBus.subscribe('goToBoards', () => router.go('/boards'));
    }
}
