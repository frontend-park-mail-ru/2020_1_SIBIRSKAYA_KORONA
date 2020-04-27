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
                        responseJson.admin.concat(responseJson.member).forEach((board) => {
                            board.url = '/boards/' + board.id;
                        });
                        this.eventBus.call('gotBoards', {
                            myBoards: responseJson.admin,
                            sharedBoards: responseJson.member,
                        });
                    });
                    break;
                case 401:
                    this.eventBus.call('unauthorized');
                    break;
                case 500:
                    console.log('Server error');
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
    async addNewBoard(boardTitle) {
        const response = await boardsPost(boardTitle);
        switch (response.status) {
            case 200: // Успешно создали доску
                const newBoardID = (await response.json()).id;
                this.eventBus.call('goToBoard', newBoardID);
                break;
            case 400: // Невалидное тело
                console.log('Bad request');
                break;
            case 401:
            case 403: // В запросе отсутствует кука
                this.eventBus.call('unauthorized');
                break;
            case 500:
                console.log('Server error');
                break;
            default:
                console.log('Бекендер молодец!!!');
        }
    }
}
