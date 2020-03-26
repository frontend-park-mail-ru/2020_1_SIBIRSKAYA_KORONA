import {boardsGet, boardsPost} from '../libs/apiService.js';

/**
 * Main header model
 */
export default class HeaderModel {
    /**
     * Model constructor
     * @param {Object} eventBus to share events with main header view
     */
    constructor(eventBus) {
        this.eventBus = eventBus;

        this.getBoards = this.getBoards.bind(this);
        this.addNewBoard = this.addNewBoard.bind(this);

        this.eventBus.subscribe('getBoards', this.getBoards);
        this.eventBus.subscribe('addBoard', this.addNewBoard);
    }

    /**
     * Call api to get all boards
     */
    getBoards() {
        boardsGet().then((response) => {
            switch (response.status) {
                case 200:
                    response.json().then((responseJson) => {
                        this.eventBus.call('gotBoards', {
                            myBoards: responseJson.admin,
                            sharedBoards: responseJson.member,
                        });
                    });
                    break;
                case 403:
                case 404:
                    this.eventBus.call('unauthorized');
                    break;
                default:
                    console.log('Бекендер молодец!!!');
            }
        });
    }

    /**
     * Call api to add new board
     * @param {String} boardTitle - new board title
     */
    addNewBoard(boardTitle) {
        boardsPost(boardTitle).then((response) => {
            switch (response.status) {
                case 200:
                    response.json().then(this.getBoards);
                    break;
                case 403:
                case 404:
                    this.eventBus.call('unauthorized');
                    break;
                default:
                    console.log('Бекендер молодец!!!');
            }
        });
    }
}
