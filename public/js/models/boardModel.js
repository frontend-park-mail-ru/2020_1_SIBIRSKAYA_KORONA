import {} from '../libs/apiService.js';

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
        this.getBoardData = this.getBoardData.bind(this);

        eventBus.subscribe('getBoardData', this.getBoardData);
    }

    /**
     * Returns board data
     */
    getBoardData() {
        const boardData = {
            title: 'MyBoardName',
            members: [
                {
                    url: '/mem1',
                    nickname: 'member 1',
                    avatar: 'img/default_avatar.png',
                },
                {
                    url: '/mem2',
                    nickname: 'member 2',
                    avatar: 'img/default_avatar.png',
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
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
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
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
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
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
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
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
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
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
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
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
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
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
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
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },


                    ],
                },
                {
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
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
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
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },
                    ],
                },
                {
                    title: 'COLUMN 1',
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
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
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
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },
                    ],
                },
                {
                    title: 'COLUMN 2',
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
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
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
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },
                    ],
                },
                {
                    title: 'COLUMN 1',
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
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
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
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },
                    ],
                },
                {
                    title: 'COLUMN 2',
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
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
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
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },
                    ],
                },
                {
                    title: 'COLUMN 1',
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
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
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
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },
                    ],
                },
                {
                    title: 'COLUMN 2',
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
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
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
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem1',
                                    nickname: 'member 1',
                                    avatar: 'img/default_avatar.png',
                                },
                                {
                                    url: '/mem2',
                                    nickname: 'member 2',
                                    avatar: 'img/default_avatar.png',
                                },
                            ],
                        },
                    ],
                },
            ],
        };

        this.eventBus.call('gotBoardData', boardData);
    }
}
