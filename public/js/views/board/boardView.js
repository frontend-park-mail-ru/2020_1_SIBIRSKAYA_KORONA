import './board.tmpl.js';
import './taskSettings/taskSettings.tmpl.js';
import BaseView from '../baseView.js';

/**
 * Board view
 */
export default class BoardView extends BaseView {
    /**
     * Board view constructor
     * @param {Object} eventBus - eventBus to share events with model
     */
    constructor(eventBus) {
        super(eventBus);

        this.render = this.render.bind(this);
        this.renderBoard = this.renderBoard.bind(this);

        eventBus.subscribe('gotBoardData', this.renderBoard);
    }

    /**
     * Method which triggers getting data from model
     */
    render() {
        this.eventBus.call('getBoardData');
    }

    /**
     * Real render view method with board data from model
     * @param {Object} boardData - board data to render
     */
    renderBoard(boardData) {
        this.root.innerHTML = window.fest['js/views/board/board.tmpl'](boardData);
        this.addEventListeners();
    }

    /**
     * Set handlers for task, labels, etc.
     */
    addEventListeners() {
        // ADD NEW MEMBER
        const addNewMemberButton = document.getElementById('inviteNewMemberButton');
        addNewMemberButton.addEventListener('click', () => {
            this.eventBus.call('inviteNewMember');
        });

        // ADD NEW CARD
        const addNewColumnButton = document.getElementById('addNewColumnButton');
        addNewColumnButton.addEventListener('click', () => {
            this.eventBus.call('addNewColumn');
        });

        // ADD NEW TASK
        const addNewTaskButtons = Array.from(document.getElementsByName('addNewTaskButton'));
        addNewTaskButtons.forEach((button) => {
            button.addEventListener('click', () => {
                this.eventBus.call('addNewTask');
            });
        });

        // BOARD SETTINGS
        const boardSettingsButton = document.getElementById('boardSettingsButton');
        boardSettingsButton.addEventListener('click', () => {
            this.eventBus.call('openBoardSettings');
        });

        // CARD SETTINGS
        const columnSettingsButtons = Array.from(document.getElementsByName('columnSettingsButton'));
        columnSettingsButtons.forEach((button) => {
            button.addEventListener('click', () => {
                this.eventBus.call('openColumnSettings');
            });
        });

        // TASK SETTINGS
        const taskSettingsButtons = Array.from(document.getElementsByName('taskSettingsButton'));
        taskSettingsButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                event.stopPropagation();
                this.eventBus.call('openTaskSettings', event.currentTarget);
            });
        });
    }
}
