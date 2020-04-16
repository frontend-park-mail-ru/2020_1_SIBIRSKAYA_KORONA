import BoardSettingsModel from '../models/boardSettingsModel.js';
import BoardSettingsView from '../views/board/boardSettings/boardSettingsView.js';
import EventBus from '../libs/eventBus.js';
import ControllerChainLink from '../libs/controllerChainLink.js';
import {ChainLinkSignals} from '../libs/controllerChainLink.js';

/**
 * Task settings controller
 */
export default class TaskSettingsController extends ControllerChainLink {
    /**
     * Task settings controller constructor
     * @param {EventBus} boardEventBus - event bus to communicate with board
     * @param {Object} router - main router
     * @param {number} boardID - board id
     */
    constructor(boardEventBus, router, boardID) {
        const chainLinkSignalsArray = Object.values(ChainLinkSignals);
        const actualSignals = [
            'getBoardSettings',
            'gotBoardSettings',

            'saveBoardSettings',
            'deleteBoard',

            'unauthorized',
            'goToBoards',
        ];

        const eventBus = new EventBus(actualSignals.concat(chainLinkSignalsArray));
        super(eventBus, null);

        this.setCustomCloseFunction(() => {
            this.view.closeSelf();
            boardEventBus.call('closeBoardSettings');
        });

        this.router = router;
        this.view = new BoardSettingsView(this.eventBus);
        this.model = new BoardSettingsModel(this.eventBus, boardID);

        this.eventBus.subscribe('unauthorized', () => router.go('/login'));
        this.eventBus.subscribe('goToBoards', () => router.go('/boards'));
    }
}
