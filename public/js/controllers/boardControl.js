import BoardModel from '../models/boardModel.js';
import BoardView from '../views/board/boardView.js';
import EventBus from '../libs/eventBus.js';
import TaskSettingsController from './taskSettingsControl.js';

/**
 * Board controller
 */
export default class BoardController {
    /**
     * Controller constructor
     */
    constructor() {
        this.eventBus = new EventBus([
            'getBoardData',
            'gotBoardData',
            // TODO(Alexandr): 'gotBoardDataError',
            'inviteNewMember',
            'addNewCard',
            'addNewTask',
            'openBoardSettings',
            'openCardSettings',
            'openTaskSettings',
            'boardDataChanged',
        ]);

        this.childController = null;
        this.view = new BoardView(this.eventBus);
        this.model = new BoardModel(this.eventBus);

        this.eventBus.subscribe('openTaskSettings', (target)=> {
            const taskId = Number(target.dataset.taskId);
            this.childController = new TaskSettingsController(this.eventBus, taskId);
            this.childController.view.render();
        });
    }
}
