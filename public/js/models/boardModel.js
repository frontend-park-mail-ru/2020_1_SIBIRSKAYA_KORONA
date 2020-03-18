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
                    color: 'orange'
                },
            ],

            columns: [
                {
                    title: 'COLUMN 1',
                    tasks: [
                        {
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
                            labels: [
                                {
                                    title: 'label 3',
                                    color: 'black',
                                },
                                {
                                    title: 'Label 4',
                                    color: 'orange'
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
                            labels: [
                                {
                                    title: 'label 3',
                                    color: 'black',
                                },
                                {
                                    title: 'Label 4',
                                    color: 'orange'
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
                            labels: [
                                {
                                    title: 'label 3',
                                    color: 'black',
                                },
                                {
                                    title: 'Label 4',
                                    color: 'orange'
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
                            labels: [
                                {
                                    title: 'label 3',
                                    color: 'black',
                                },
                                {
                                    title: 'Label 4',
                                    color: 'orange'
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
                            labels: [
                                {
                                    title: 'label 3',
                                    color: 'black',
                                },
                                {
                                    title: 'Label 4',
                                    color: 'orange'
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
                            labels: [
                                {
                                    title: 'label 3',
                                    color: 'black',
                                },
                                {
                                    title: 'Label 4',
                                    color: 'orange'
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
                            labels: [
                                {
                                    title: 'label 3',
                                    color: 'black',
                                },
                                {
                                    title: 'Label 4',
                                    color: 'orange'
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
                            labels: [
                                {
                                    title: 'label 3',
                                    color: 'black',
                                },
                                {
                                    title: 'Label 4',
                                    color: 'orange'
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
                            labels: [
                                {
                                    title: 'label 3',
                                    color: 'black',
                                },
                                {
                                    title: 'Label 4',
                                    color: 'orange'
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
                            labels: [
                                {
                                    title: 'label 3',
                                    color: 'black',
                                },
                                {
                                    title: 'Label 4',
                                    color: 'orange'
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
                            labels: [
                                {
                                    title: 'label 3',
                                    color: 'black',
                                },
                                {
                                    title: 'Label 4',
                                    color: 'orange'
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
