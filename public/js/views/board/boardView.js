import BaseView from '../baseView.js';
import './addColumnForm.tmpl.js';
import './addTaskForm.tmpl.js';
import './board.tmpl.js';
import './taskSettings/taskSettings.tmpl.js';

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
        this.handleButtonClick = this.handleButtonClick.bind(this);

        eventBus.subscribe('gotBoardData', this.renderBoard);
    }

    /**
     * Triggers getting data from model
     * @param {Object} dataFromURL - fields: boardId, taskId(optional)
     * @return {Promise}
     */
    render(dataFromURL) {
        this.boardId = dataFromURL.boardId;
        return this.eventBus.call('getBoardData', dataFromURL.boardId);
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
        const buttons = [
            ...document.getElementsByClassName('js-openBoardSettings'),
            ...document.getElementsByClassName('js-addNewMember'),
            ...document.getElementsByClassName('js-addNewColumn'),
            ...document.getElementsByClassName('js-openColumnSettings'),
            ...document.getElementsByClassName('js-openTaskSettings'),
            ...document.getElementsByClassName('js-addNewTask'),
        ];

        buttons.forEach((button) => {
            button.addEventListener('click', this.handleButtonClick);
        });
    }

    /**
     * Handle all buttons click
     * @param {object} event mouse click event
     */
    handleButtonClick(event) {
        const target = event.currentTarget;
        switch (true) {
            case target.classList.contains('js-openTaskSettings'):
                this.eventBus.call('openTaskSettings', this.boardId, target.dataset.columnId, target.dataset.taskId);
                break;

            case target.classList.contains('js-addNewTask'):
                this.showNewTaskForm(target);
                break;

            case target.classList.contains('js-addNewColumn'):
                this.showNewColumnForm(target);
                break;

            case target.classList.contains('js-openColumnSettings'):
                this.eventBus.call('openColumnSettings');
                break;

            case target.classList.contains('js-openBoardSettings'):
                this.eventBus.call('openBoardSettings');
                break;

            case target.classList.contains('js-addNewMember'):
                this.eventBus.call('addNewMember');
                break;
        }
    }

    /**
     * Show new task form with buttons and set it's handlers
     * @param {HTMLDivElement} node where to render form
     */
    showNewTaskForm(node) {
        const columnID = node.dataset.columnId;
        node.classList.remove('task-list-add-task-button');
        node.removeEventListener('click', this.handleButtonClick);
        node.innerHTML = window.fest['js/views/board/addTaskForm.tmpl']({
            form: true,
            id: columnID,
        });

        const addButtonID = 'addTaskButton' + columnID;
        document.getElementById(addButtonID).addEventListener('click', () => {
            const newTaskInput = document.getElementById('inputNewTaskTitle');
            if (newTaskInput.value) {
                this.eventBus.call('addNewTask', {
                    boardId: this.boardId,
                    columnID: columnID,
                    taskTitle: newTaskInput.value,
                });
            }
        });

        const closeButtonID = 'closeNewTaskFormButton' + columnID;
        document.getElementById(closeButtonID).addEventListener('click', (event) => {
            event.stopPropagation();
            node.classList.add('task-list-add-task-button');
            node.addEventListener('click', this.handleButtonClick);
            node.innerHTML = window.fest['js/views/board/addTaskForm.tmpl']({form: false});
        });
    }

    /**
     * Show new task form with buttons and set it's handlers
     * @param {HTMLDivElement} node where to render form
     */
    showNewColumnForm(node) {
        node.classList.remove('column-list-add-column-button');
        node.removeEventListener('click', this.handleButtonClick);
        node.innerHTML = window.fest['js/views/board/addColumnForm.tmpl']({form: true});

        document.getElementById('addColumnButton').addEventListener('click', () => {
            const newColumnTitleInput = document.getElementById('inputNewColumnTitle');
            if (newColumnTitleInput.value) {
                this.eventBus.call('addNewColumn', {
                    boardId: this.boardId,
                    columnTitle: newColumnTitleInput.value,
                });
            }
        });

        document.getElementById('closeNewColumnFormButton').addEventListener('click', (event) => {
            event.stopPropagation();
            node.classList.add('column-list-add-column-button');
            node.addEventListener('click', this.handleButtonClick);
            node.innerHTML = window.fest['js/views/board/addColumnForm.tmpl']({form: false});
        });
    }
}
