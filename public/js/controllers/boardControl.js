import BoardModel from '../models/boardModel.js';
import BoardView from '../views/board/boardView.js';
import EventBus from '../libs/eventBus.js';


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
        ]);

        this.view = new BoardView(this.eventBus);
        this.model = new BoardModel(this.eventBus);
    }
}
