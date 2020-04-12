import BaseView from '../baseView.js';
import boardTemplate from './board.tmpl.xml';
import addTaskFormTemplate from './addTaskForm.tmpl.xml';
import addColumnFromTemplate from './addColumnForm.tmpl.xml';

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
     * @return {Promise}
     */
    render(dataFromURL) {
        this.boardId = Number(dataFromURL.boardId);
        return this.eventBus.call('getBoardData', dataFromURL.boardId);
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
            this.lastTaskInColumnPosition[index] = (lastTask)? lastTask.position : 1;
        });
        // console.log(this.lastTaskInColumnPosition);

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
            ...document.getElementsByClassName('js-addNewMember'),
            ...document.getElementsByClassName('js-addNewColumn'),
            ...document.getElementsByClassName('js-openColumnSettings'),
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
        const columnID = Number(node.dataset.columnId);
        const columnPosition = Number(node.dataset.position);
        node.classList.remove('task-list-add-task-button');
        node.removeEventListener('click', this.handleButtonClick);
        node.innerHTML = addTaskFormTemplate({
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
                    taskPosition: this.lastTaskInColumnPosition[columnPosition] + 1,
                });
            }
        });

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

        document.getElementById('addColumnButton').addEventListener('click', () => {
            const newColumnTitleInput = document.getElementById('inputNewColumnTitle');
            if (newColumnTitleInput.value) {
                this.eventBus.call('addNewColumn', {
                    boardId: this.boardId,
                    columnTitle: newColumnTitleInput.value,
                    columnPosition: this.lastColumnIndex + 1,
                });
            }
        });

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
        this.dragTask.element.removeEventListener('click', this.handleButtonClick);
        this.dragTask.element.style.background = '#d4d5fa';
        this.dragTask.element.style.position = 'absolute';
        this.dragTask.element.style.zIndex = '10';
        this.dragTask.element.style.top = Math.round(event.pageY - this.dragTask.shift.y) + 'px';
        this.dragTask.element.style.left = Math.round(event.pageX - this.dragTask.shift.x) + 'px';
    }

    /**
     * Handle task move end.
     * Opens triggers eventBus to open task settings or to change task position/column
     * @param {MouseEvent} event
     */
    handleTaskDragEnd(event) {
        document.removeEventListener('mousemove', this.handleTaskDrag);
        document.removeEventListener('mouseup', this.handleTaskDragEnd);
        document.removeEventListener('selectstart', this.preventDefault);
        if (event.pageX === this.dragTask.mouseDown.x && event.pageY === this.dragTask.mouseDown.y) {
            this.eventBus.call('openTaskSettings',
                this.boardId,
                Number(this.dragTask.element.dataset.columnId),
                Number(this.dragTask.element.dataset.taskId));
        } else {
            this.dragTask.element.style.display = 'none';
            const elem = document.elementFromPoint(event.clientX, event.clientY);
            if (elem && elem.closest('.board-column')) {
                const newColumn = elem.closest('.board-column');
                const taskList = newColumn.lastChild;
                const tasks = [];
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
                let newTaskPos = 1;
                for (let i = 0; i !== tasks.length; i++) {
                    if (tasks[i].realPos > newTaskRealPos) {
                        newTaskPos = (i === 0) ? tasks[i].pos / 2 : (tasks[i].pos + tasks[i - 1].pos) / 2;
                        break;
                    }
                    if (i === tasks.length - 1) {
                        newTaskPos = tasks[i].pos + 1;
                    }
                }
                const eventBusCallParams= {
                    boardId: this.boardId,
                    newColumnId: Number(newColumn.dataset.columnId),
                    oldColumnId: Number(this.dragTask.element.closest('.board-column').dataset.columnId),
                    taskId: Number(this.dragTask.element.dataset.taskId),
                    newTaskPos: newTaskPos,
                };
                this.eventBus.call('taskMoved', eventBusCallParams);
                return;
            }
        }
        this.dragTask.element.style = null;
        this.dragTask = {};
    }
}
