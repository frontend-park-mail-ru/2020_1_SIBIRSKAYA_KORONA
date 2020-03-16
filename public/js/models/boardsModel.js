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

        this.localStorage = {
            myBoards: [
                {url: 'board1', title: 'Frontend'},
            ],
            sharedBoards: [
                {url: 'board2', title: 'Backend'},
            ],
        };
    }

    /**
     * Dummy for get data
     * TODO: get data from back
     */
    getBoards() {
        this.eventBus.call('gotBoards', this.localStorage);
    }


    /**
     * Dummy for add new board
     * TODO: put data to back
     * @param {Object} boardData - new board data
     */
    addNewBoard(boardData) {
        // dummy, back has no api for this
        boardData.url = Math.random() + 'url';
        this.localStorage.myBoards.push(boardData);
        this.getBoards();
    }
}
