import {taskPut, taskGet, taskDelete} from '../libs/apiService.js';

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

        this.getTaskSettings = this.getTaskSettings.bind(this);
        this.saveTaskSettings = this.saveTaskSettings.bind(this);
        this.deleteTask = this.deleteTask.bind(this);

        this.eventBus.subscribe('getTaskSettings', this.getTaskSettings);
        this.eventBus.subscribe('saveTaskSettings', this.saveTaskSettings);
        this.eventBus.subscribe('deleteTask', this.deleteTask);
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

        const actualTaskData = (await getTaskDataResponse.json())['task'];

        const defaultTaskData = {
            title: 'UNKNOWN',
            description: 'UNKNOWN',
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
        const response = await taskPut(this.boardId, this.columnId, this.taskId, taskData);
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
