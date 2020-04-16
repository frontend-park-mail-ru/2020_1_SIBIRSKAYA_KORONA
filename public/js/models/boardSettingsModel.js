import {boardGet} from '../libs/apiService.js';

/**
 * Board settings model
 */
export default class TaskSettingsModel {
    /**
     * Board settings model constructor
     * @param {Object} eventBus to share events with task settings view
     * @param {number} boardID - board id
     */
    constructor(eventBus, boardID) {
        this.eventBus = eventBus;
        /*          'getBoardSettings',
                    'gotBoardSettings',

                    'saveBoardSettings',boardId
                    'deleteBoard',

                    'unauthorized',
                    'goToBoards',*/
        this.getBoardSettings = this.getBoardSettings.bind(this);
        this.boardId = boardID;
        // this.saveBoardSettings = this.saveBoardSettings.bind(this);
        // this.deleteBoard = this.deleteBoard.bind(this);

        this.eventBus.subscribe('getBoardSettings', this.getBoardSettings);
        // this.eventBus.subscribe('saveBoardSettings', this.saveBoardSettings);
        // this.eventBus.subscribe('deleteBoard', this.deleteBoard);
    }

    /**
     * Returns board data
     */
    async getBoardSettings() {
        const boardResponse = await boardGet(this.boardId);
        switch (boardResponse.status) {
            case 200:
                const boardData = await boardResponse.json();
                this.eventBus.call('gotBoardSettings', boardData);
                break;
            case 401:
                this.eventBus.call('unauthorized');
                break;
            case 400:
            case 403:
            case 500:
                this.eventBus.call('goToBoards');
                break;
            default:
                console.log('Бекендер молодец!!!');
                this.eventBus.call('goToBoards');
                break;
        }
    }
};
