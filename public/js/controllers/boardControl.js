import EventBus from '../libs/eventBus.js';
import BoardModel from '../models/boardModel.js';
import BoardView from '../views/board/boardView.js';
import BoardSettingsController from './boardSettingsControl.js';
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
            'addNewUser',
            'inviteWithLink',
            'addNewColumn',
            'deleteColumn',
            'addNewTask',
            'openBoardSettings',
            'getBoardSettings',
            'gotBoardSettings',
            'closeBoardSettings',

            'openCardSettings',
            'openTaskSettings',
            'closeTaskSettings',
            'boardDataChanged',
            'taskMoved',

            'unauthorized',
            'goToBoards',
            'redirectToBoard',
        ]);

        this.childController = null;
        this.view = new BoardView(this.eventBus);
        this.model = new BoardModel(this.eventBus);

        this.router = router;
        this.handleInvite = this.handleInvite.bind(this);
        this.triggerTaskAndBoard = this.triggerTaskAndBoard.bind(this);
        this.triggerBoardSettingsAndBoard = this.triggerBoardSettingsAndBoard.bind(this);

        this.eventBus.subscribe('unauthorized', () => router.go('/login'));
        this.eventBus.subscribe('goToBoards', () => router.go('/boards'));

        this.eventBus.subscribe('openBoardSettings', (boardId) => {
            this.router.go(`/boards/${boardId}/settings`);
        });
        this.eventBus.subscribe('openTaskSettings', (boardId, columnId, taskId) => {
            this.router.go(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
        });

        this.eventBus.subscribe('redirectToBoard', (boardId) => {
            this.router.go(`/boards/${boardId}`);
        });

        const redirectToThisBoard = () => {
            this.childController = null;
            router.go('/boards/' + this.view.boardID);
        };
        this.eventBus.subscribe('closeBoardSettings', redirectToThisBoard);
        this.eventBus.subscribe('closeTaskSettings', redirectToThisBoard);
    }

    /**
     * Triggers board and task render
     * @param {Object} dataFromUrl
     */
    triggerBoardSettingsAndBoard(dataFromUrl) {
        const boardId = Number(dataFromUrl.boardId);
        this.view.render(dataFromUrl);
        this.childController = new BoardSettingsController(this.eventBus, this.router, boardId);
        this.childController.view.render();
    }

    /**
     * Triggers board and task render
     * @param {Object} dataFromUrl
     */
    triggerTaskAndBoard(dataFromUrl) {
        const boardId = Number(dataFromUrl.boardId);
        const columnId = Number(dataFromUrl.columnId);
        const taskId = Number(dataFromUrl.taskId);

        this.childController = new TaskSettingsController(this.eventBus, this.router, boardId, columnId, taskId);
        this.childController.view.render();
        this.view.render(dataFromUrl);
    }

    /**
     * Invite link route handler
     * @param {Object} dataFromUrl - contains inviteHash
     */
    handleInvite(dataFromUrl) {
        this.eventBus.call('inviteWithLink', dataFromUrl.inviteHash);
    }
}
