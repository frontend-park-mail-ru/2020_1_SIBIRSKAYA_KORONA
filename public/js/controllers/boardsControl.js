import EventBus from '../libs/eventBus.js';
import BoardsModel from '../models/boardsModel.js';
import BoardsView from '../views/boards/boardsView.js';

/**
 * Boards controller
 */
export default class BoardsController {
    /**
     * Controller constructor
     * @param {Object} router - for redirect
     */
    constructor(router) {
        this.eventBus = new EventBus([
            'getBoards',
            'gotBoards',
            'addBoard',
            'unauthorized',
        ]);
        this.view = new BoardsView(this.eventBus);
        this.model = new BoardsModel(this.eventBus);
        this.eventBus.subscribe('unauthorized', () => router.go('/login'));
    }
}
