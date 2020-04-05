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

        // заглушка пока бек не умеет в доску
        this.boardData = {};
    }

    /**
     * Returns board data
     * TODO call API
     * @param {Number} boardId
     * @return {Promise}
     */
    async getBoardData(boardId) {
        let boardData = {
            title: 'BOARD NOT FOUND',
            members: [],
            columns: [],
        };

        // GET BOARD INFO
        const boardResponse = await boardGet(boardId);
        boardData = (await boardResponse.json())['board'];

        // GET COLUMNS INFO
        const columnsResponse = await columnsGet(boardId);
        boardData.columns = (await columnsResponse.json()).columns;

        // GET TASKS FROM EACH COLUMN
        const columnsTasksPromises = [];
        for (const column of boardData.columns) {
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

            boardData['columns'][i]['tasks'] = columnTasks;
        }


        console.log(boardData);

        this.eventBus.call('gotBoardData', boardData);
    }

    /**
     * Add task in fake local storage
     * TODO call API
     * @param {object} data - fields: boardId, columnID, taskTitle
     */
    addTask(data) {
        console.log(data);
        tasksPost(data.boardId, data.columnID, {title: data.taskTitle}).then((response) => {
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
        columnsPost(data.boardId, data.columnTitle, Math.random()).then((response) => {
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
