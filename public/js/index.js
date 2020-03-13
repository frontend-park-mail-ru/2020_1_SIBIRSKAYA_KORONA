import '/js/views/board/board.tmpl.js';


document.addEventListener('DOMContentLoaded', () => {
    const f = window.fest['js/views/board/board.tmpl'];

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
        columns: [
            {
                title: 'COLUMN 1',
                tasks: [
                    {
                        labels: [
                            {
                                title: 'Label 1',
                            },
                            {
                                title: 'Label 2',
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
                                title: 'Label 3',
                            },
                            {
                                title: 'Label 4',
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
                                title: 'Label 1',
                            },
                            {
                                title: 'Label 2',
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
                                title: 'Label 3',
                            },
                            {
                                title: 'Label 4',
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
                                title: 'Label 1',
                            },
                            {
                                title: 'Label 2',
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
                                title: 'Label 3',
                            },
                            {
                                title: 'Label 4',
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
                                title: 'Label 1',
                            },
                            {
                                title: 'Label 2',
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
                                title: 'Label 3',
                            },
                            {
                                title: 'Label 4',
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
                                title: 'Label 1',
                            },
                            {
                                title: 'Label 2',
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
                                title: 'Label 3',
                            },
                            {
                                title: 'Label 4',
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
                                title: 'Label 1',
                            },
                            {
                                title: 'Label 2',
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
                                title: 'Label 3',
                            },
                            {
                                title: 'Label 4',
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
                                title: 'Label 1',
                            },
                            {
                                title: 'Label 2',
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
                                title: 'Label 3',
                            },
                            {
                                title: 'Label 4',
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
                                title: 'Label 1',
                            },
                            {
                                title: 'Label 2',
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
                                title: 'Label 3',
                            },
                            {
                                title: 'Label 4',
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
                                title: 'Label 1',
                            },
                            {
                                title: 'Label 2',
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
                                title: 'Label 3',
                            },
                            {
                                title: 'Label 4',
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
                                title: 'Label 1',
                            },
                            {
                                title: 'Label 2',
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
                                title: 'Label 3',
                            },
                            {
                                title: 'Label 4',
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
                                title: 'Label 1',
                            },
                            {
                                title: 'Label 2',
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
                                title: 'Label 3',
                            },
                            {
                                title: 'Label 4',
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

    document.body.innerHTML = f(boardData);
});
