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
        const buttons = [
            ...document.getElementsByClassName('js-openBoardSettings'),
            ...document.getElementsByClassName('js-addNewMember'),
            ...document.getElementsByClassName('js-addNewColumn'),
            ...document.getElementsByClassName('js-openColumnSettings'),
            ...document.getElementsByClassName('js-openTaskSettings'),
            ...document.getElementsByClassName('js-addNewTask'),
        ];

        buttons.forEach((button) => {
            button.addEventListener('click', this.handleButtonClick.bind(this));
        });

        /*        // ADD NEW MEMBER
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
                });*/
    }

    /**
     * Handle all buttons click
     * @param {object} event mouse click event
     */
    handleButtonClick(event) {
        const target = event.currentTarget;
        switch (true) {
            case target.classList.contains('js-openTaskSettings'):
                this.eventBus.call('openTaskSettings', target.dataset.taskId);
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
        node.classList.remove('js-addNewTask');
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
                    columnID: columnID,
                    taskTitle: newTaskInput.value,
                });
            }
        });

        const closeButtonID = 'closeNewTaskFormButton' + columnID;
        document.getElementById(closeButtonID).addEventListener('click', (event) => {
            event.stopPropagation();
            node.classList.add('js-addNewTask');
            node.addEventListener('click', this.handleButtonClick);
            node.innerHTML = window.fest['js/views/board/addTaskForm.tmpl']({form: false});
        });
    }

    /**
     * Show new task form with buttons and set it's handlers
     * @param {HTMLDivElement} node where to render form
     */
    showNewColumnForm(node) {
        node.classList.remove('js-addNewColumn');
        node.removeEventListener('click', this.handleButtonClick);
        node.innerHTML = window.fest['js/views/board/addColumnForm.tmpl']({form: true});

        document.getElementById('addColumnButton').addEventListener('click', () => {
            const newColumnTitleInput = document.getElementById('inputNewColumnTitle');
            if (newColumnTitleInput.value) {
                this.eventBus.call('addNewColumn', newColumnTitleInput.value);
            }
        });

        document.getElementById('closeNewColumnFormButton').addEventListener('click', (event) => {
            event.stopPropagation();
            node.classList.add('js-addNewColumn');
            node.addEventListener('click', this.handleButtonClick);
            node.innerHTML = window.fest['js/views/board/addColumnForm.tmpl']({form: false});
        });
    }
}
