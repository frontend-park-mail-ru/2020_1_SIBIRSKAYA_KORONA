import template from './boardsView.tmpl.xml';
import addBoardFormTemplate from './addBoardForm.tmpl.xml';

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
        this.root.innerHTML = template(data);
        this.addEventListeners();
    }

    /**
     * Set handlers on buttons click
     */
    addEventListeners() {
        document.getElementById('addBoard').addEventListener('click', this.handleAddBoardButtonClick);
    }

    /**
     * Generate new board form
     */
    handleAddBoardButtonClick() {
        const fakeBoard = document.getElementById('addBoard');
        fakeBoard.classList.remove('group-fake-board');
        fakeBoard.classList.add('group-mini-board');
        fakeBoard.removeEventListener('click', this.handleAddBoardButtonClick);
        fakeBoard.innerHTML = addBoardFormTemplate({form: true});
        const newBoardTitleInput = document.getElementById('inputNewBoardTitle');
        newBoardTitleInput.focus();
        const handleSubmit = () => {
            if (newBoardTitleInput.value) {
                this.eventBus.call('addBoard', newBoardTitleInput.value);
                document.onkeypress = null;
            }
        };
        document.getElementById('submitAddBoard').addEventListener('click', handleSubmit);
        document.onkeypress = (event) => {
            if (event.code === 'Enter') {
                handleSubmit();
            }
        };
        document.getElementById('closeForm').addEventListener('click', (event) => {
            event.stopPropagation();
            fakeBoard.classList.add('group-fake-board');
            fakeBoard.classList.remove('group-mini-board');
            fakeBoard.addEventListener('click', this.handleAddBoardButtonClick);
            fakeBoard.innerHTML = addBoardFormTemplate({form: false});
        });
    }
}
