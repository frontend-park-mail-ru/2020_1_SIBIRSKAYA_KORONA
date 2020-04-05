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
            'taskMoved',

            'unauthorized',
            'goToBoards',
        ]);

        this.childController = null;
        this.view = new BoardView(this.eventBus);
        this.model = new BoardModel(this.eventBus);

        this.router = router;
        this.triggerTaskAndBoard = this.triggerTaskAndBoard.bind(this);

        this.eventBus.subscribe('unauthorized', () => router.go('/login'));
        this.eventBus.subscribe('goToBoards', () => router.go('/boards'));
        this.eventBus.subscribe('openTaskSettings', (boardId, columnId, taskId) => {
            this.router.go(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
        });
        this.eventBus.subscribe('closeTaskSettings', () => {
            router.go('/boards/' + this.view.boardId);
        });
    }

    /**
     * Triggers board and task render
     * @param {Object} dataFromUrl
     */
    triggerTaskAndBoard(dataFromUrl) {
        const boardId = Number(dataFromUrl.boardId);
        const columnId = Number(dataFromUrl.columnId);
        const taskId = Number(dataFromUrl.taskId);


        this.view.render(dataFromUrl).then(() => {
            this.childController = new TaskSettingsController(this.eventBus, this.router, boardId, columnId, taskId);
            this.childController.view.render();
        });
    }
}
