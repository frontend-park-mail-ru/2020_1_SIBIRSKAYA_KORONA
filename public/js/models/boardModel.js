import {boardGet, columnsGet, columnsPost, tasksGet, tasksPost} from '../libs/apiService.js';

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

        this.boardData = {
            title: 'BOARD NOT FOUND',
            members: [],
            columns: [],
        };
    }

    /**
     * Returns board data
     * TODO call API
     * @param {Number} boardId
     * @return {Promise}
     */
    async getBoardData(boardId) {
        // GET BOARD INFO
        const boardResponse = await boardGet(boardId);
        const newBoardData = (await boardResponse.json())['board'];

        // GET COLUMNS INFO
        const columnsResponse = await columnsGet(boardId);
        newBoardData.columns = (await columnsResponse.json()).columns;

        // GET TASKS FROM EACH COLUMN
        const columnsTasksPromises = [];
        for (const column of newBoardData.columns) {
            columnsTasksPromises.push(tasksGet(boardId, column.id));
        }

        const columnsTasksResponses = await Promise.all(columnsTasksPromises);
        for (const [i, columnsTasksResponse] of columnsTasksResponses.entries()) {
            const columnTasks = (await columnsTasksResponse.json()).tasks;

            // TODO(Anyone): убрать заглушку на labels и members
            for (const task of columnTasks) {
                task.labels = [
                    {
                        title: 'Example label',
                        color: 'black',
                    },
                    {
                        title: 'Example label',
                        color: 'orange',
                    },
                ];
                task.members = [
                    {
                        url: '/mem1',
                        nickname: 'member 1',
                        avatar: '/img/default_avatar.png',
                    },
                    {
                        url: '/mem2',
                        nickname: 'member 2',
                        avatar: '/img/default_avatar.png',
                    },
                ];
                task.url = `/boards/${boardId}/columns/${task.cid}/tasks/${task.id}`;
            }

            newBoardData['columns'][i]['tasks'] = columnTasks;
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

        console.log(newBoardData);

        this.boardData = newBoardData;
        this.eventBus.call('gotBoardData', newBoardData);
    }

    /**
     * Add task in fake local storage
     * TODO call API
     * @param {object} data - fields: boardId, columnID, taskTitle
     */
    addTask(data) {
        let taskPosition = 0;

        for (const column of this.boardData.columns) {
            if (column.id === data.columnID) {
                const tasks = column.tasks;
                if (tasks.length !== 0) {
                    taskPosition = 1 + tasks[tasks.length - 1].position;
                }
                break;
            }
        }

        const taskDataToCreate = {
            title: data.taskTitle,
            position: taskPosition,
        };

        tasksPost(data.boardId, data.columnID, taskDataToCreate).then((response) => {
            switch (response.status) {
                case 200: // - OK (Валидный запрос данных пользователя)
                    this.eventBus.call('getBoardData', data.boardId);
                    response.json().then((responseJson) => {
                        console.log(responseJson);
                    });
                    break;
                case 403:
                case 401:
                    this.eventBus.call('unauthorized');
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
     * TODO call API
     * @param {object} data - fields: boardId, columnTitle
     */
    addColumn(data) {
        console.log(data);

        const columns = this.boardData.columns;
        let columnPosition = 0;

        if (columns.length !== 0) {
            columnPosition = 1 + columns[columns.length - 1].position;
        }


        columnsPost(data.boardId, data.columnTitle, columnPosition).then((response) => {
            switch (response.status) {
                case 200: // - OK (Валидный запрос данных пользователя)
                    this.eventBus.call('getBoardData', data.boardId);
                    response.json().then((responseJson) => {
                        console.log(responseJson);
                    });
                    break;
                case 403:
                case 401:
                    this.eventBus.call('unauthorized');
                    break;
                case 500:
                    console.log('500');
                    break;
                default:
                    console.log('Бекендер молодец!!!');
            }
        });
        // const lastColumnID = this.boardData.columns[this.boardData.columns.length - 1].id;
        // this.boardData.columns.push({
        //     id: lastColumnID + 1,
        //     title: data.columnTitle,
        //     tasks: [],
        // });
        // this.getBoardData(data.boardId);
    }
}
