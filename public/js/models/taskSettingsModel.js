import {taskCommentsGet, taskCommentsPost, taskDelete, taskGet, taskPut} from '../libs/apiService.js';

/**
 * Task settings model
 */
export default class TaskSettingsModel {
    /**
     * Task settings model constructor
     * @param {Object} eventBus to share events with task settings view
     * @param {number} boardID - board id
     * @param {number} columnID - column id
     * @param {number} taskID - task id
     */
    constructor(eventBus, boardID, columnID, taskID) {
        this.eventBus = eventBus;
        this.boardId = boardID;
        this.columnId = columnID;
        this.taskId = taskID;

        this.eventBus.subscribe('getTaskSettings', this.getTaskSettings.bind(this));
        this.eventBus.subscribe('saveTaskSettings', this.saveTaskSettings.bind(this));
        this.eventBus.subscribe('deleteTask', this.deleteTask.bind(this));
        this.eventBus.subscribe('addComment', this.addTaskComment.bind(this));
        this.eventBus.subscribe('addCheckList', this.addChecklist.bind(this));

        this.checklists = [];
    }

    /**
     * Add comment to task
     * @param {String} commentText
     */
    async addTaskComment(commentText) {
        const response = await taskCommentsPost(this.boardId, this.columnId, this.taskId, commentText);
        switch (response.status) {
            case 200:
                this.getTaskSettings();
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

    /**
     * Add new checkList
     * @param {String} checklistName
     */
    async addChecklist(checklistName) {
        const id = this.checklists.length;
        this.checklists.push({id, name: checklistName});
        this.getTaskSettings();
    }

    /**
     * Returns task information
     */
    async getTaskSettings() {
        // TODO(Alexandr): убрать заглушки на лейюлы и участников

        const getTaskDataResponse = await taskGet(this.boardId, this.columnId, this.taskId);
        switch (getTaskDataResponse.status) {
            case 200:
                break;
            case 401:
                this.eventBus.call('unauthorized');
                return;
            case 403:
                this.eventBus.call('goToBoards');
                return;
            case 400:
            case 500:
                this.eventBus.call('closeSelf');
                return;
            default:
                console.log('Бекендер молодец!!!');
                this.eventBus.call('goToBoards');
                return;
        }

        const getTaskCommentsResponse = await taskCommentsGet(this.boardId, this.columnId, this.taskId);
        switch (getTaskCommentsResponse.status) {
            case 200:
                break;
            case 401:
                this.eventBus.call('unauthorized');
                return;
            case 403:
                this.eventBus.call('goToBoards');
                return;
            case 400:
            case 500:
                this.eventBus.call('closeSelf');
                return;
            default:
                console.log('Бекендер молодец!!!');
                this.eventBus.call('goToBoards');
                return;
        }

        const actualTaskData = await getTaskDataResponse.json();
        const comments = await getTaskCommentsResponse.json();

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
            checklists: this.checklists,
        };

        this.eventBus.call('gotTaskSettings', {...defaultTaskData, ...actualTaskData});
    }

    /**
     * Saves task information
     * @param {Object} taskData
     * @return {Promise<void>}
     */
    async saveTaskSettings(taskData) {
        const response = await taskPut(this.boardId, this.columnId, this.taskId, taskData);
        switch (response.status) {
            case 200:
                this.getTaskSettings();
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

    /**
     * Deletes task
     * @return {Promise<void>}
     */
    async deleteTask() {
        const response = await taskDelete(this.boardId, this.columnId, this.taskId);
        switch (response.status) {
            case 200:
                this.eventBus.call('closeSelf');
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
