import {taskPut, taskGet} from '../libs/apiService.js';

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

        this.eventBus.subscribe('getTaskSettings', this.getTaskSettings);
        this.eventBus.subscribe('saveTaskSettings', this.saveTaskSettings);
    }

    /**
     * Returns task information
     */
    async getTaskSettings() {
        // TODO(Alexandr): add response status checks
        // TODO(Alexandr): убрать заглушки на лейюлы и участников
        const taskData = {
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

        const getTaskDataResponse = await taskGet(this.boardId, this.columnId, this.taskId);
        const actualTaskData = (await getTaskDataResponse.json())['task'];

        this.eventBus.call('gotTaskSettings', {...taskData, ...actualTaskData});
    }

    /**
     * Saves task information
     * @param {Object} taskData
     * @return {Promise<void>}
     */
    async saveTaskSettings(taskData) {
        await taskPut(this.boardId, this.columnId, this.taskId, taskData);
        // TODO(Alexandr): check response status
    }
}
