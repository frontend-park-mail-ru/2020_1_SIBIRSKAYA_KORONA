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
            'submitBoard',
            'unauthorized',
        ]);
        this.view = new BoardsView(this.eventBus);
        this.model = new BoardsModel(this.eventBus);
        this.eventBus.subscribe('unauthorized', () => router.go('/login'));
        this.eventBus.subscribe('submitBoard', (id) => {
            const params = {id: Number(id)};
            console.log(params);
            router.go('/board', params);
        });
    }
}
