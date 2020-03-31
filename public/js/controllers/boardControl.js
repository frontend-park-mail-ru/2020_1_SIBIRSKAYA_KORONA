import EventBus from '../libs/eventBus.js';
import BoardModel from '../models/boardModel.js';
import BoardView from '../views/board/boardView.js';
import TaskSettingsController from './taskSettingsControl.js';

/**
 * Board controller
 */
export default class BoardController {
    /**
     * Controller constructor
     * @param {Object} router for redirect
     */
    constructor(router) {
        this.eventBus = new EventBus([
            'getBoardData',
            'gotBoardData',
            // TODO(Alexandr): 'gotBoardDataError',
            'addNewMember',
            'addNewColumn',
            'addNewTask',
            'openBoardSettings',
            'openCardSettings',
            'openTaskSettings',
            'closeTaskSettings',
            'boardDataChanged',
        ]);

        this.router = router;

        this.childController = null;
        this.view = new BoardView(this.eventBus);
        this.model = new BoardModel(this.eventBus);

        this.triggerTaskAndBoard = this.triggerTaskAndBoard.bind(this);

        this.eventBus.subscribe('openTaskSettings', (boardId, taskId) => {
            this.router.go('/boards/' + boardId + '/tasks/' + taskId);
            this.childController = new TaskSettingsController(this.eventBus, taskId);
            this.childController.view.render();
        });

        this.eventBus.subscribe('closeTaskSettings', () => router.go('/boards/' + this.view.boardId));
    }

    /**
     * Triggers board and task render
     * @param {Number} boardId
     * @param {Number} taskId
     */
    triggerTaskAndBoard(boardId, taskId) {
        this.view.render(boardId);
        this.childController = new TaskSettingsController(this.eventBus, taskId);
        this.childController.view.render();
    }
}
