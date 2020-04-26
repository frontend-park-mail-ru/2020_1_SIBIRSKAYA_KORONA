import {boardGet, columnsGet, columnsPost, taskPut, tasksGet, tasksPost} from '../libs/apiService.js';

/**
 * Board model
 */
export default class BoardModel {
    /**
     * Board model constructor
     * @param {Object} eventBus - to share events with board view
     */
    constructor(eventBus) {
        this.eventBus = eventBus;

        eventBus.subscribe('getBoardData', this.getBoardData.bind(this));
        eventBus.subscribe('addNewColumn', this.addColumn.bind(this));
        eventBus.subscribe('addNewTask', this.addTask.bind(this));
        eventBus.subscribe('taskMoved', this.saveTask.bind(this));

        this.boardData = {
            title: 'BOARD NOT FOUND',
            members: [],
            columns: [],
        };
    }

    /**
     * Returns board data
     * @param {Number} boardId
     * @return {Promise}
     */
    async getBoardData(boardId) {
        if (boardId === void 0) {
            boardId = this.boardData.id;
        }

        const handleResponseStatus = async (response, onSuccess) => {
            switch (response.status) {
                case 200:
                    const body = await response.json();
                    onSuccess(body);
                    return true;
                case 401:
                    this.eventBus.call('unauthorized');
                    return false;
                case 400:
                case 403:
                case 500:
                    this.eventBus.call('goToBoards');
                    return false;
                default:
                    console.log('Бекендер молодец!!!');
                    this.eventBus.call('goToBoards');
                    return false;
            }
        };

        // GET BOARD INFO
        let newBoardData;
        const boardResponse = await boardGet(boardId);
        if (!(await handleResponseStatus(boardResponse, (body) => newBoardData = body))) {
            return;
        }

        // GET COLUMNS INFO
        const columnsResponse = await columnsGet(boardId);
        if (!(await handleResponseStatus(columnsResponse, (body) => newBoardData.columns = body))) {
            return;
        }

        // GET TASKS FROM EACH COLUMN
        const columnsTasksPromises = [];
        for (const column of newBoardData.columns) {
            columnsTasksPromises.push(tasksGet(boardId, column.id));
        }
        const columnsTasksResponses = await Promise.all(columnsTasksPromises);

        for (const [i, columnsTasksResponse] of columnsTasksResponses.entries()) {
            if (!(await handleResponseStatus(columnsTasksResponse, (body) => {
                const columnTasks = body;
                for (const task of columnTasks) {
                    task.labels = [{
                        title: 'Example label',
                        color: 'black',
                    }, {
                        title: 'Example label',
                        color: 'orange',
                    }];
                //     task.members = [{
                //         url: '/mem1',
                //         nickname: 'member 1',
                //         avatar: '/img/default_avatar.png',
                //     }, {
                //         url: '/mem2',
                //         nickname: 'member 2',
                //         avatar: '/img/default_avatar.png',
                //     }];
                //     task.url = `/boards/${boardId}/columns/${task.cid}/tasks/${task.id}`;
                }
                newBoardData['columns'][i]['tasks'] = columnTasks;
            }))) {
                return;
            }
        }

        // SORT COLUMNS
        for (const column of newBoardData.columns) {
            column.tasks.sort((a, b) => {
                if (a.position < b.position) {
                    return -1;
                }
                if (a.position === b.position) {
                    return 0;
                }
                return 1;
            });
        }

        // SORT TASK IN COLUMNS
        newBoardData.columns.sort((a, b) => {
            if (a.position < b.position) {
                return -1;
            }
            if (a.position === b.position) {
                return 0;
            }
            return 1;
        });

        this.boardData = newBoardData;
        this.eventBus.call('gotBoardData', newBoardData);
    }

    /**
     * Call api to add task
     * @param {object} data - fields: boardId, columnID, taskTitle
     */
    addTask(data) {
        tasksPost(data.boardId, data.columnID, {title: data.taskTitle, position: data.taskPosition})
            .then((response) => {
                switch (response.status) {
                    case 200: // - OK (Валидный запрос данных пользователя)
                        this.eventBus.call('getBoardData', data.boardId);
                        break;
                    case 401:
                        this.eventBus.call('unauthorized');
                        break;
                    case 400:
                    case 403:
                        this.eventBus.call('goToBoards');
                        break;
                    case 500:
                        console.log('500');
                        break;
                    default:
                        console.log('Бекендер молодец!!!');
                }
            });
    }

    /**
     * Add task in fake local storage
     * @param {object} data - fields: boardId, columnTitle
     */
    addColumn(data) {
        columnsPost(data.boardId, data.columnTitle, data.columnPosition).then((response) => {
            switch (response.status) {
                case 200: // - OK (Валидный запрос данных пользователя)
                    this.eventBus.call('getBoardData', data.boardId);
                    break;
                case 401:
                    this.eventBus.call('unauthorized');
                    break;
                case 400:
                case 403:
                    this.eventBus.call('goToBoards');
                    break;
                case 500:
                    console.log('500');
                    break;
                default:
                    console.log('Бекендер молодец!!!');
            }
        });
    }

    /**
     * Save task position
     * @param {Object} data
     * @return {Promise<void>}
     */
    async saveTask(data) {
        const response = await taskPut(data, {
            cid: data.newColumnID,
            position: data.newTaskPos,
        });

        switch (response.status) {
            case 200:
                this.eventBus.call('getBoardData');
                break;
            case 401:
                this.eventBus.call('unauthorized');
                break;
            case 403:
                this.eventBus.call('goToBoards');
                break;
            case 400:
            case 500:
                break;
            default:
                console.log('Бекендер молодец!!!');
                break;
        }
    }
}
