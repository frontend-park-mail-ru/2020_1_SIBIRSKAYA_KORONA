import TaskSettingsModel from '../models/taskSettingsModel.js';
import TaskSettingsView from '../views/board_taskSettings/taskSettingsView.js';
import EventBus from '../libs/eventBus.js';
import AddLabelPopupController from './addLabelPopupControl.js';

/**
 * Task settings controller
 */
export default class TaskSettingsController {
    /**
     *
     * @param {EventBus} boardEventBus - event bus to communicate with board
     * @param {number} taskId - task id
     */
    constructor(boardEventBus, taskId) {
        this.eventBus = new EventBus([
            'closedChild', // internal signal
            'closeLastChild', // outside signal
            'closeLastChildOrSelf', // outside signal
            'closeAllChildren', // outside signal
            'closeAllChildrenAndSelf', // outside signal

            'closeSelf',

            'getTaskSettings',
            'gotTaskSettings',

            'openAddLabelPopup',
            'closedAddLabelPopup',

            'openAddMemberPopup',
            'closedAddMemberPopup',

            'saveTaskSettings',
        ]);


        this.view = new TaskSettingsView(this.eventBus);
        this.model = new TaskSettingsModel(this.eventBus, taskId);

        this.eventBus.subscribe('openAddLabelPopup', (position) => {
            const childController = new AddLabelPopupController(this.eventBus);
            this.childEventBus = childController.eventBus;
            childController.view.render(position);
        });

        this.eventBus.subscribe('closeSelf', () => {
            this.view.closeSelf();
            if (this.parentEventBus !== null) {
                this.parentEventBus.call('closedChild');
            }

            boardEventBus.call('closedTaskSettings');
        });


        this.parentEventBus = null;
        this.childEventBus = null;

        this.eventBus.subscribe('closedChild', () => {
            this.childEventBus = null;
        });

        this.eventBus.subscribe('closeLastChild', () => {
            if (this.childEventBus !== null) {
                this.childEventBus.call('closeLastChildOrSelf');
            }
        });

        this.eventBus.subscribe('closeLastChildOrSelf', () => {
            if (this.childEventBus !== null) {
                this.childEventBus.call('closeLastChildOrSelf');
            } else {
                this.eventBus.call('closeSelf');
            }
        });

        this.eventBus.subscribe('closeAllChildren', () => {
            if (this.childEventBus !== null) {
                this.childEventBus.call('closeAllChildrenAndSelf');
                this.childEventBus = null;
            }
        });

        this.eventBus.subscribe('closeAllChildrenAndSelf', () => {
            if (this.childEventBus !== null) {
                this.childEventBus.call('closeAllChildrenAndSelf');
            }

            this.eventBus.call('closeSelf');
        });
    }
}
