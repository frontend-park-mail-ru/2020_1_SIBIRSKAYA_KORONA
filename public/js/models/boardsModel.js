import {sessionGet} from '../libs/apiService.js';

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

        // Заглушка пока бек не умеет в доски
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
        sessionGet().then((response) => {
            switch (response.status) {
                case 200:
                    this.eventBus.call('gotBoards', this.localStorage);
                    break;
                case 401:
                    this.eventBus.call('unauthorized');
                    break;
                default:
                    console.log('Бекендер молодец!!!');
            }
        });
    }


    /**
     * Dummy for add new board
     * TODO: put data to back
     * @param {Object} boardData - new board data
     */
    addNewBoard(boardData) {
        boardData.url = Math.random() + 'url';
        this.localStorage.myBoards.push(boardData);
        this.getBoards();
    }
}
