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

        // Заглушка пока бек не умеет в доски
        this.localStorage = {
            myBoards: [
                {
                    url: 'board1',
                    title: 'Frontend',
                    members: []
                },
            ],
            sharedBoards: [
                {
                    url: 'board2',
                    title: 'Backend',
                    admin: {},
                    members: []
                },
            ],
        };
    }

    /**
     * Call api to get all boards
     */
    getBoards() {
        boardsGet().then((response) => {
            console.log(response);
            switch (response.status) {
                case 200:
                    response.json().then((responseJson) => {
                            this.eventBus.call('gotBoards', {
                                myBoards: responseJson.admin,
                                sharedBoards: responseJson.member
                            });
                            console.log(responseJson);
                        }
                    );
                    break;
                case 403:
                    this.eventBus.call('unauthorized');
                    break;
                case 404:
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
                    this.eventBus.call('unauthorized');
                    break;
                case 404:
                    break;
                default:
                    console.log('Бекендер молодец!!!');
            }


        });
        // boardTitle.url = Math.random() + 'url';
        // this.localStorage.myBoards.push(boardTitle);

    }
}
