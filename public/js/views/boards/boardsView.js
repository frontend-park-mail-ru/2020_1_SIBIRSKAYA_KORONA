import './addBoardForm.tmpl.js';
import './boardsView.tmpl.js';
import BaseView from '../baseView.js';

/**
 * Main header view
 */
export default class BoardsView extends BaseView {
    /**
     * View constructor
     * @param {object} eventBus - local event bus
     */
    constructor(eventBus) {
        super(eventBus);
        this.root = document.getElementById('application');

        this.render = this.render.bind(this);
        this.renderData = this.renderData.bind(this);
        this.addEventListeners = this.addEventListeners.bind(this);
        this.handleAddBoardButtonClick = this.handleAddBoardButtonClick.bind(this);
        this.handleBoardClick = this.handleBoardClick.bind(this);

        this.eventBus.subscribe('gotBoards', this.renderData);
    }

    /**
     * Calls event bus to get user data
     */
    render() {
        this.eventBus.call('getBoards');
    }

    /**
     * Render user data
     * @param {Object} data to render
     */
    renderData(data) {
        this.root.innerHTML = window.fest['js/views/boards/boardsView.tmpl'](data);
        this.addEventListeners();
    }

    /**
     * Set handlers on buttons click
     */
    addEventListeners() {
        const buttons = [
            document.getElementById('addBoard'),
        ];
        buttons.forEach((button) => {
            button.addEventListener('click', this.handleAddBoardButtonClick);
        });

        const boards = [...document.getElementsByClassName('js-dashboard')];
        boards.forEach((board) => {
            board.addEventListener('click', this.handleBoardClick);
        });
    }

    /**
     * Handle board click and go to board
     * @param {object} event - click event
     */
    handleBoardClick(event) {
        this.eventBus.call('submitBoard', event.target.dataset.boardId);
    }


    /**
     * Generate new board form
     */
    handleAddBoardButtonClick() {
        const fakeBoard = document.getElementById('addBoard');
        fakeBoard.classList.remove('fake-dashboard');
        fakeBoard.removeEventListener('click', this.handleAddBoardButtonClick);
        fakeBoard.innerHTML = window.fest['js/views/boards/addBoardForm.tmpl']();

        const newBoardTitleInput = document.getElementById('inputNewBoardTitle');
        document.getElementById('submitAddBoard').addEventListener('click', () => {
            if (newBoardTitleInput.value) {
                this.eventBus.call('addBoard', newBoardTitleInput.value);
            }
        });
    }
}
