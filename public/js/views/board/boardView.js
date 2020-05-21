import BaseView from '../baseView.js';
import addColumnFromTemplate from './addColumnForm.tmpl.xml';
import addTaskFormTemplate from './addTaskForm.tmpl.xml';
import boardTemplate from './board.tmpl.xml';

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

        this.handleTaskDragStart = this.handleTaskDragStart.bind(this);
        this.handleTaskDrag = this.handleTaskDrag.bind(this);
        this.handleTaskDragEnd = this.handleTaskDragEnd.bind(this);
        this.preventDefault = this.preventDefault.bind(this);

        eventBus.subscribe('gotBoardData', this.renderBoard);
    }

    /**
     * Triggers getting data from model
     * @param {Object} dataFromURL - fields: boardId, taskId(optional)
     */
    render(dataFromURL) {
        this.boardID = Number(dataFromURL.boardId);
        this.eventBus.call('getBoardData', dataFromURL.boardId);
    }

    /**
     * Real render view method with board data from model
     * @param {Object} boardData - board data to render
     */
    renderBoard(boardData) {
        this.lastColumnIndex = boardData.columns.length - 1;
        this.lastTaskInColumnPosition = new Array(boardData.columns.length);
        boardData.columns.forEach((column, index) => {
            const lastTask = column.tasks[column.tasks.length - 1];
            this.lastTaskInColumnPosition[index] = (lastTask) ? lastTask.position : 1;
        });

        boardData.members = boardData.admins.concat(boardData.members || []);
        this.root.innerHTML = boardTemplate(boardData);
        this.addEventListeners();
    }

    /**
     * Set handlers for task, labels, etc.
     */
    addEventListeners() {
        const tasks = [...document.getElementsByClassName('js-taskSettings')];
        const buttons = [
            ...document.getElementsByClassName('js-openBoardSettings'),
            ...document.getElementsByClassName('js-addNewUser'),
            ...document.getElementsByClassName('js-addNewColumn'),
            ...document.getElementsByClassName('js-deleteColumn'),
            ...document.getElementsByClassName('js-addNewTask'),
        ];

        buttons.forEach((button) => {
            button.addEventListener('click', this.handleButtonClick);
        });

        tasks.forEach((task) => {
            task.addEventListener('mousedown', this.handleTaskDragStart);
        });
    }

    /**
     * Handle all buttons click
     * @param {object} event mouse click event
     */
    handleButtonClick(event) {
        const target = event.currentTarget;
        switch (true) {
            case target.classList.contains('js-addNewTask'):
                this.showNewTaskForm(target);
                break;

            case target.classList.contains('js-addNewColumn'):
                this.showNewColumnForm(target);
                break;

            case target.classList.contains('js-deleteColumn'):
                const columnID = Number(target.getAttribute('data-column-id'));
                this.eventBus.call('deleteColumn', columnID);
                break;

            case target.classList.contains('js-addNewUser'):
            case target.classList.contains('js-openBoardSettings'):
                this.eventBus.call('openBoardSettings', this.boardID);
                break;
        }
    }

    /**
     * Show new task form with buttons and set it's handlers
     * @param {HTMLDivElement} node where to render form
     */
    showNewTaskForm(node) {
        const columnID = Number(node.dataset.columnId);
        const columnPosition = Number(node.dataset.position);

        node.classList.remove('task-list-add-task-button');
        node.removeEventListener('click', this.handleButtonClick);
        node.innerHTML = addTaskFormTemplate({
            form: true,
            id: columnID,
        });
        node.scrollIntoView({block: 'end', behavior: 'smooth'});
        node.querySelector('#inputNewTaskTitle').focus();
        const addButtonID = 'addTaskButton' + columnID;
        const handleSubmit = () => {
            const newTaskInput = document.getElementById('inputNewTaskTitle');
            if (newTaskInput.value) {
                this.eventBus.call('addNewTask', {
                    boardId: this.boardID,
                    columnID: columnID,
                    taskTitle: newTaskInput.value,
                    taskPosition: this.lastTaskInColumnPosition[columnPosition] + 1,
                });
                document.onkeypress = null;
            }
        };
        document.getElementById(addButtonID).addEventListener('click', handleSubmit);
        document.onkeypress = (event) => {
            if (event.code === 'Enter') {
                handleSubmit();
            }
        };

        const closeButtonID = 'closeNewTaskFormButton' + columnID;
        document.getElementById(closeButtonID).addEventListener('click', (event) => {
            event.stopPropagation();
            node.classList.add('task-list-add-task-button');
            node.addEventListener('click', this.handleButtonClick);
            node.innerHTML = addTaskFormTemplate({form: false});
        });
    }

    /**
     * Show new task form with buttons and set it's handlers
     * @param {HTMLDivElement} node where to render form
     */
    showNewColumnForm(node) {
        node.classList.remove('column-list-add-column-button');
        node.removeEventListener('click', this.handleButtonClick);
        node.innerHTML = addColumnFromTemplate({form: true});
        node.scrollIntoView({inline: 'end', behavior: 'smooth'});
        document.querySelector('.column-list').scroll(100500, 0);
        node.querySelector('#inputNewColumnTitle').focus();
        const handleSubmit = () => {
            const newColumnTitleInput = document.getElementById('inputNewColumnTitle');
            if (newColumnTitleInput.value) {
                this.eventBus.call('addNewColumn', {
                    boardId: this.boardID,
                    columnTitle: newColumnTitleInput.value,
                    columnPosition: this.lastColumnIndex + 1,
                });
                document.onkeypress = null;
            }
        };
        document.getElementById('addColumnButton').addEventListener('click', handleSubmit);
        document.onkeypress = (event) => {
            if (event.code === 'Enter') {
                handleSubmit();
            }
        };
        document.getElementById('closeNewColumnFormButton').addEventListener('click', (event) => {
            event.stopPropagation();
            node.classList.add('column-list-add-column-button');
            node.addEventListener('click', this.handleButtonClick);
            node.innerHTML = addColumnFromTemplate({form: false});
        });
    }

    /**
     * Is used to cancel text selection
     * @param {MouseEvent} event
     */
    preventDefault(event) {
        event.preventDefault();
    }

    /**
     * Handle mouse down on task
     * @param {MouseEvent} event
     */
    handleTaskDragStart(event) {
        const box = event.currentTarget.getBoundingClientRect();
        this.dragTask = {
            element: event.currentTarget,
            shift: {
                x: event.pageX - box.left + pageXOffset,
                y: event.pageY - box.top + pageYOffset,
            },
            mouseDown: {
                x: event.pageX,
                y: event.pageY,
            },
            width: box.width + 'px',
            height: box.height + 'px',
        };
        document.addEventListener('mousemove', this.handleTaskDrag);
        document.addEventListener('mouseup', this.handleTaskDragEnd);
        document.addEventListener('selectstart', this.preventDefault);
    }

    /**
     * Handle task move
     * @param {MouseEvent} event
     */
    handleTaskDrag(event) {
        event.preventDefault();
        this.dragTask.element.removeEventListener('click', this.handleButtonClick);
        this.dragTask.element.style.background = '#d4d5fa';
        this.dragTask.element.style.position = 'absolute';
        this.dragTask.element.style.zIndex = '10';
        this.dragTask.element.style.top = Math.round(event.pageY - this.dragTask.shift.y) + 'px';
        this.dragTask.element.style.left = Math.round(event.pageX - this.dragTask.shift.x) + 'px';
        this.dragTask.element.style.width = this.dragTask.width;
        this.dragTask.element.style.height = this.dragTask.height;
    }

    /**
     * Handle task move end.
     * Triggers eventBus to open task settings or to change task position/column
     * @param {MouseEvent} event
     */
    handleTaskDragEnd(event) {
        document.removeEventListener('mousemove', this.handleTaskDrag);
        document.removeEventListener('mouseup', this.handleTaskDragEnd);
        document.removeEventListener('selectstart', this.preventDefault);
        if (event.pageX === this.dragTask.mouseDown.x && event.pageY === this.dragTask.mouseDown.y) {
            this.eventBus.call('openTaskSettings',
                this.boardID,
                Number(this.dragTask.element.dataset.columnId),
                Number(this.dragTask.element.dataset.taskId));
        } else {
            this.dragTask.element.style.display = 'none';
            const elem = document.elementFromPoint(event.clientX, event.clientY);
            if (elem && elem.closest('.board-column')) {
                const newColumn = elem.closest('.board-column');
                const taskList = newColumn.querySelector('.task-list');
                const tasks = [];
                let newTaskPos = 1;
                if (taskList.childNodes) {
                    [...taskList.childNodes].forEach((node) => {
                        if (node.classList.contains('task-mini')) {
                            const boundingRect = node.getBoundingClientRect();
                            const verticalPosCenter = boundingRect.y + (boundingRect.height / 2);
                            tasks.push({
                                realPos: verticalPosCenter,
                                pos: Number(node.dataset.taskPosition),
                            });
                        }
                    });
                    const newTaskRealPos = event.pageY;
                    for (let i = 0; i !== tasks.length; i++) {
                        if (tasks[i].realPos > newTaskRealPos) {
                            newTaskPos = (i === 0) ? tasks[i].pos / 2 : (tasks[i].pos + tasks[i - 1].pos) / 2;
                            break;
                        }
                        if (i === tasks.length - 1) {
                            newTaskPos = tasks[i].pos + 1;
                        }
                    }
                }
                const eventBusCallParams = {
                    boardID: this.boardID,
                    newColumnID: Number(newColumn.dataset.columnId),
                    columnID: Number(this.dragTask.element.closest('.board-column').dataset.columnId),
                    taskID: Number(this.dragTask.element.dataset.taskId),
                    newTaskPos,
                };
                this.eventBus.call('taskMoved', eventBusCallParams);
                return;
            }
        }
        this.dragTask.element.style = null;
        this.dragTask = {};
    }
}
