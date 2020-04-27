import ControllerChainLink, {ChainLinkSignals} from '../libs/controllerChainLink.js';
import EventBus from '../libs/eventBus.js';

import TaskSettingsModel from '../models/taskSettingsModel.js';
import TaskSettingsView from '../views/board/taskSettings/taskSettingsView.js';
import AddChecklistPopupController from './addChecklistPopupControl.js';
import AddLabelPopupController from './addLabelPopupControl.js';
import AddAssignsPopupController from './addAssignsPopupControl.js';

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

            'updatedTaskLabel',
            'openAddLabelPopup',
            'closedAddLabelPopup',
            'addedTaskLabel',

            'openAssignsPopup',
            'getTaskAssigns',
            'gotTaskAssigns',
            'updateAssign',
            'assignSuccess',
            'closeAssignsPopup',

            'openAddChecklistPopup',
            'addChecklist',
            'addChecklistItem',
            'updateChecklistItem',
            'deleteChecklist',
            'closeAddChecklistPopup',

            'saveTaskSettings',
            'deleteTask',

            'addComment',
            'deleteComment',

            'uploadAttach',
            'uploadAttachSuccess',
            'deleteAttach',
            'deleteAttachSuccess',

            'unauthorized',
            'goBack',
            'goToBoards',
        ];

        const eventBus = new EventBus(actualSignals.concat(chainLinkSignalsArray));
        super(eventBus, null);

        this.setCustomCloseFunction(() => {
            this.view.closeSelf();
            boardEventBus.call('closeTaskSettings');
        });

        this.taskData = {boardID, columnID, taskID};
        this.router = router;
        this.view = new TaskSettingsView(this.eventBus);
        this.model = new TaskSettingsModel(this.eventBus, this.taskData);

        this.eventBus.subscribe('openAddLabelPopup', (button) => {
            const childController = new AddLabelPopupController(this.eventBus, this.taskData);
            this.setChildEventBus(childController.eventBus);
            childController.view.render(button);
        });

        this.eventBus.subscribe('openAddChecklistPopup', (clickCoords) => {
            const checklistPopupController = new AddChecklistPopupController(this.eventBus);
            this.setChildEventBus(checklistPopupController.eventBus);
            checklistPopupController.view.render(clickCoords);
        });

        this.eventBus.subscribe('openAssignsPopup', (clickCoords) => {
            const assignsPopupController = new AddAssignsPopupController(this.eventBus);
            this.setChildEventBus(assignsPopupController.eventBus);
            assignsPopupController.view.render(clickCoords);
        });

        this.eventBus.subscribe('unauthorized', () => {
            router.go('/login');
            this.view.closeSelfAndAllChildren();
        });
        this.eventBus.subscribe('goToBoards', () => router.go('/boards'));
        this.eventBus.subscribe('goBack', () => router.goBack());
    }
}
