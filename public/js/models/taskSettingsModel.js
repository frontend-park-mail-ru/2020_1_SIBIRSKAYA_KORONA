import {/* taskCommentsGet, */ taskCommentsPost, taskDelete, taskGet, taskPut} from '../libs/apiService.js';

/**
 * Task settings model
 */
export default class TaskSettingsModel {
    /**
     * Task settings model constructor
     * @param {Object} eventBus to share events with task settings view
     * @param {Object} taskData - information about current task
     */
    constructor(eventBus, taskData) {
        this.eventBus = eventBus;
        this.taskData = taskData;

        this.eventBus.subscribe('getTaskSettings', this.getTaskSettings.bind(this));
        this.eventBus.subscribe('saveTaskSettings', this.saveTaskSettings.bind(this));
        this.eventBus.subscribe('deleteTask', this.deleteTask.bind(this));
        this.eventBus.subscribe('addComment', this.addTaskComment.bind(this));


        /*        this.comments = [{
                    avatar: 'https://localhost:5555/img/avatar/qweasd.jpeg',
                    nickname: 'qweasd',
                    text: 'a '.repeat(200),
                }, {
                    avatar: 'https://localhost:5555/img/avatar/qweert.jpeg',
                    nickname: 'qweert',
                    text: 'ff tsa sa s a s a st '.repeat(7),
                }, {
                    avatar: 'https://localhost:5555/img/avatar/qweqweqweqweqwe.jpeg',
                    nickname: 'qweqweqweqweqwe',
                    text: 'fdsfh k dfsdfg jkdhsf dhfjh djkf dfdsf dsf dsf '.repeat(4),
                }, {
                    avatar: 'https://localhost:5555/img/avatar/qweqweasdasd.jpeg',
                    nickname: 'qweqweasdasd',
                    text: 'fks dfkshfdfhkjehkj fhesjkfh kjvcdnc jedghfvuiewh dncd '.repeat(8),
                }, {
                    avatar: 'https://localhost:5555/img/avatar/qweqwe.jpeg',
                    nickname: 'qweqwe',
                    text: 'Comment text '.repeat(18),
                }];*/
    }

    /**
     * Add comment to task
     * @param {String} commentText
     */
    async addTaskComment(commentText) {
        const response = await taskCommentsPost(
            this.taskData.boardID,
            this.taskData.columnID,
            this.taskData.id,
            commentText);
        switch (response.status) {
            case 200:
                this.getTaskSettings();
                break;
            case 401:
                this.eventBus.call('unauthorized');
                break;
            case 403:
                this.eventBus.call('goBack');
                break;
            case 400:
            case 500:
                break;
            default:
                console.log('Бекендер молодец!!!');
                break;
        }
    }


    /**
     * Returns task information
     */
    async getTaskSettings() {
        // TODO(Alexandr): убрать заглушки на лейюлы и участников

        const getTaskDataResponse = await taskGet(this.taskData.boardID, this.taskData.columnID, this.taskData.id);
        switch (getTaskDataResponse.status) {
            case 200:
                break;
            case 401:
                this.eventBus.call('unauthorized');
                return;
            case 400:
            case 403:
                this.eventBus.call('goBack');
                return;
            case 500:
                this.eventBus.call('closeSelf');
                return;
            default:
                console.log('Бекендер молодец!!!');
                this.eventBus.call('goBack');
                return;
        }

        // const getTaskCommentsResponse = await
        // taskCommentsGet(this.taskData.boardID, this.taskData.columnID, this.taskData.id);
        // switch (getTaskCommentsResponse.status) {
        //     case 200:
        //         break;
        //     case 401:
        //         this.eventBus.call('unauthorized');
        //         return;
        //     case 403:
        //         this.eventBus.call('goBack');
        //         return;
        //     case 400:
        //     case 500:
        //         this.eventBus.call('closeSelf');
        //         return;
        //     default:
        //         console.log('Бекендер молодец!!!');
        //         this.eventBus.call('goBack');
        //         return;
        // }

        const actualTaskData = await getTaskDataResponse.json();
        // const comments = await getTaskCommentsResponse.json();
        const comments = [];

        actualTaskData.comments = new Array(comments.length);
        comments.forEach((comment, i) => {
            const date = new Date(comment.createdAt * 1000);

            const parsedDate = {
                day: (date.getDate() > 9) ? date.getDate() : '0' + date.getDate(),
                month: (date.getMonth() > 9) ? date.getMonth() : '0' + date.getMonth(),
                year: date.getFullYear(),
                hours: (date.getHours() > 9) ? date.getHours() : '0' + date.getHours(),
                minutes: (date.getMinutes() > 9) ? date.getMinutes() : '0' + date.getMinutes(),
                seconds: (date.getSeconds() > 9) ? date.getSeconds() : '0' + date.getSeconds(),
            };

            let dateString = `${parsedDate.day}.${parsedDate.month}.${parsedDate.year}`;
            dateString += ` ${parsedDate.hours}:${parsedDate.minutes}:${parsedDate.seconds}`;
            actualTaskData.comments[i] = {
                date: dateString,
                text: comment.text,
                avatar: comment.avatar || '/img/default_avatar.png',
                nickname: comment.nickname || 'vasYa_pupKin',
            };
        });
        const defaultTaskData = {
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
            ],
        };
        this.eventBus.call('gotTaskSettings', {...defaultTaskData, ...actualTaskData});
    }

    /**
     * Saves task information
     * @param {Object} taskData
     * @return {Promise<void>}
     */
    async saveTaskSettings(taskData) {
        const response = await taskPut(this.taskData.boardID, this.taskData.columnID, this.taskData.id, taskData);
        switch (response.status) {
            case 200:
                this.getTaskSettings();
                break;
            case 401:
                this.eventBus.call('unauthorized');
                break;
            case 403:
                this.eventBus.call('goBack');
                break;
            case 400:
            case 500:
                break;
            default:
                console.log('Бекендер молодец!!!');
                break;
        }
    }

    /**
     * Deletes task
     * @return {Promise<void>}
     */
    async deleteTask() {
        const response = await taskDelete(this.taskData.boardID, this.taskData.columnID, this.taskData.id);
        switch (response.status) {
            case 200:
                this.eventBus.call('closeSelf');
                break;
            case 401:
                this.eventBus.call('unauthorized');
                break;
            case 403:
                this.eventBus.call('goBack');
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
