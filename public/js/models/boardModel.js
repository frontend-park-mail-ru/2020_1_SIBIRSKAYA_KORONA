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
        this.boardData = {
            title: 'MyBoardName',
            members: [
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
            ],
            labels: [
                {
                    title: 'label 1',
                    color: 'red',
                },
                {
                    title: 'label 2',
                    color: 'darkblue',
                },
                {
                    title: 'label 3',
                    color: 'black',
                },
                {
                    title: 'Label 4',
                    color: 'orange',
                },
            ],

            columns: [
                {
                    id: 1,
                    title: 'COLUMN 1',
                    tasks: [
                        {
                            id: 1,
                            labels: [
                                {
                                    title: 'label 1',
                                    color: 'red',
                                },
                                {
                                    title: 'label 2',
                                    color: 'darkblue',
                                },
                            ],
                            description: 'My task description 1',
                            members: [
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
                            ],
                        },
                        {
                            id: 2,
                            labels: [
                                {
                                    title: 'label 3',
                                    color: 'black',
                                },
                                {
                                    title: 'Label 4',
                                    color: 'orange',
                                },
                            ],
                            description: 'My task description 2',
                            members: [
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
                            ],
                        },
                        {
                            id: 3,
                            labels: [
                                {
                                    title: 'label 1',
                                    color: 'red',
                                },
                                {
                                    title: 'label 2',
                                    color: 'darkblue',
                                },
                            ],
                            description: 'My task description 1',
                            members: [
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
                            ],
                        },
                        {
                            id: 4,
                            labels: [
                                {
                                    title: 'label 3',
                                    color: 'black',
                                },
                                {
                                    title: 'Label 4',
                                    color: 'orange',
                                },
                            ],
                            description: 'My task description 2',
                            members: [
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
                            ],
                        },
                        {
                            id: 5,
                            labels: [
                                {
                                    title: 'label 1',
                                    color: 'red',
                                },
                                {
                                    title: 'label 2',
                                    color: 'darkblue',
                                },
                            ],
                            description: 'My task description 1',
                            members: [
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
                            ],
                        },
                        {
                            id: 6,
                            labels: [
                                {
                                    title: 'label 3',
                                    color: 'black',
                                },
                                {
                                    title: 'Label 4',
                                    color: 'orange',
                                },
                            ],
                            description: 'My task description 2',
                            members: [
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
                            ],
                        },
                        {
                            id: 7,
                            labels: [
                                {
                                    title: 'label 1',
                                    color: 'red',
                                },
                                {
                                    title: 'label 2',
                                    color: 'darkblue',
                                },
                            ],
                            description: 'My task description 1',
                            members: [
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
                            ],
                        },
                        {
                            id: 8,
                            labels: [
                                {
                                    title: 'label 3',
                                    color: 'black',
                                },
                                {
                                    title: 'Label 4',
                                    color: 'orange',
                                },
                            ],
                            description: 'My task description 2',
                            members: [
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
                            ],
                        },


                    ],
                },
                {
                    id: 2,
                    title: 'COLUMN 2',
                    tasks: [
                        {
                            id: 9,
                            labels: [
                                {
                                    title: 'label 1',
                                    color: 'red',
                                },
                                {
                                    title: 'label 2',
                                    color: 'darkblue',
                                },
                            ],
                            description: 'My task description 1',
                            members: [
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
                            ],
                        },
                        {
                            id: 10,
                            labels: [
                                {
                                    title: 'label 3',
                                    color: 'black',
                                },
                                {
                                    title: 'Label 4',
                                    color: 'orange',
                                },
                            ],
                            description: 'My task description 2',
                            members: [
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
                            ],
                        },
                    ],
                },
                {
                    id: 3,
                    title: 'COLUMN 3',
                    tasks: [
                        {
                            id: 11,
                            labels: [
                                {
                                    title: 'label 1',
                                    color: 'red',
                                },
                                {
                                    title: 'label 2',
                                    color: 'darkblue',
                                },
                            ],
                            description: 'My task description 1',
                            members: [
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
                            ],
                        },
                        {
                            id: 12,
                            labels: [
                                {
                                    title: 'label 3',
                                    color: 'black',
                                },
                                {
                                    title: 'Label 4',
                                    color: 'orange',
                                },
                            ],
                            description: 'My task description 2',
                            members: [
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
                            ],
                        },
                    ],
                },
                {
                    id: 4,
                    title: 'COLUMN 4',
                    tasks: [
                        {
                            id: 13,
                            labels: [
                                {
                                    title: 'label 1',
                                    color: 'red',
                                },
                                {
                                    title: 'label 2',
                                    color: 'darkblue',
                                },
                            ],
                            description: 'My task description 1',
                            members: [
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
                            ],
                        },
                        {
                            id: 14,
                            labels: [
                                {
                                    title: 'label 3',
                                    color: 'black',
                                },
                                {
                                    title: 'Label 4',
                                    color: 'orange',
                                },
                            ],
                            description: 'My task description 2',
                            members: [
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
                            ],
                        },
                    ],
                },
                {
                    id: 5,
                    title: 'COLUMN 5',
                    tasks: [
                        {
                            id: 15,
                            labels: [
                                {
                                    title: 'label 1',
                                    color: 'red',
                                },
                                {
                                    title: 'label 2',
                                    color: 'darkblue',
                                },
                            ],
                            description: 'My task description 1',
                            members: [
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
                            ],
                        },
                        {
                            id: 16,
                            labels: [
                                {
                                    title: 'label 3',
                                    color: 'black',
                                },
                                {
                                    title: 'Label 4',
                                    color: 'orange',
                                },
                            ],
                            description: 'My task description 2',
                            members: [
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
                            ],
                        },
                    ],
                },
                {
                    id: 6,
                    title: 'COLUMN 6',
                    tasks: [
                        {
                            id: 17,
                            labels: [
                                {
                                    title: 'label 1',
                                    color: 'red',
                                },
                                {
                                    title: 'label 2',
                                    color: 'darkblue',
                                },
                            ],
                            description: 'My task description 1',
                            members: [
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
                            ],
                        },
                        {
                            id: 18,
                            labels: [
                                {
                                    title: 'label 3',
                                    color: 'black',
                                },
                                {
                                    title: 'Label 4',
                                    color: 'orange',
                                },
                            ],
                            description: 'My task description 2',
                            members: [
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
                            ],
                        },
                    ],
                },
                {
                    id: 7,
                    title: 'COLUMN 7',
                    tasks: [
                        {
                            id: 19,
                            labels: [
                                {
                                    title: 'label 1',
                                    color: 'red',
                                },
                                {
                                    title: 'label 2',
                                    color: 'darkblue',
                                },
                            ],
                            description: 'My task description 1',
                            members: [
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
                            ],
                        },
                        {
                            id: 20,
                            labels: [
                                {
                                    title: 'label 3',
                                    color: 'black',
                                },
                                {
                                    title: 'Label 4',
                                    color: 'orange',
                                },
                            ],
                            description: 'My task description 2',
                            members: [
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
                            ],
                        },
                    ],
                },
                {
                    id: 8,
                    title: 'COLUMN 8',
                    tasks: [
                        {
                            id: 21,
                            labels: [
                                {
                                    title: 'label 1',
                                    color: 'red',
                                },
                                {
                                    title: 'label 2',
                                    color: 'darkblue',
                                },
                            ],
                            description: 'My task description 1',
                            members: [
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
                            ],
                        },
                        {
                            id: 22,
                            labels: [
                                {
                                    title: 'label 3',
                                    color: 'black',
                                },
                                {
                                    title: 'Label 4',
                                    color: 'orange',
                                },
                            ],
                            description: 'My task description 2',
                            members: [
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
                            ],
                        },
                    ],
                },
            ],
        };
    }

    /**
     * Returns board data
     * TODO call API
     * @param {Number} boardId
     */
    getBoardData(boardId) {
        const gotDataFromBackend = this.boardData;
        gotDataFromBackend.columns.forEach((column)=> {
            column.tasks.forEach((task) => {
                task.url = '/boards/' + boardId + '/tasks/' + task.id + '/';
            });
        });
        gotDataFromBackend.id = boardId;
        this.eventBus.call('gotBoardData', gotDataFromBackend);
    }

    /**
     * Add task in fake local storage
     * TODO call API
     * @param {object} data - fields: boardId, columnID, taskTitle
     */
    addTask(data) {
        let columnToAddTask;
        for (const column of this.boardData.columns) {
            if (column.id == data.columnID) {
                columnToAddTask = column;
                break;
            }
        }
        columnToAddTask.tasks.push({
            id: Math.random(),
            description: data.taskTitle,
        });
        this.getBoardData(data.boardId);
    }

    /**
     * Add task in fake local storage
     * TODO call API
     * @param {object} data - fields: boardId, columnTitle
     */
    addColumn(data) {
        const lastColumnID = this.boardData.columns[this.boardData.columns.length - 1].id;
        this.boardData.columns.push({
            id: lastColumnID + 1,
            title: data.columnTitle,
            tasks: [],
        });
        this.getBoardData(data.boardId);
    }
}
