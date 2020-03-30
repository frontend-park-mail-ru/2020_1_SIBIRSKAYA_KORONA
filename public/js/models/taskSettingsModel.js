import {} from '../libs/apiService.js';

/**
 * Task settings model
 */
export default class TaskSettingsModel {
    /**
     * Task settings model constructor
     * @param {Object} eventBus to share events with task settings view
     * @param {number} taskId - task id
     */
    constructor(eventBus, taskId) {
        this.eventBus = eventBus;
        this.taskId = taskId;

        this.getTaskSettings = this.getTaskSettings.bind(this);
        this.saveTaskSettings = this.saveTaskSettings.bind(this);

        this.eventBus.subscribe('getTaskSettings', this.getTaskSettings);
        this.eventBus.subscribe('saveTaskSettings', this.saveTaskSettings);
    }

    /**
     * Returns task information
     */
    getTaskSettings() {
        // TODO(Alexandr): get task info with API
        // TODO(Alexandr): add response status checks
        const taskData = {
            column: {
                title: 'COLUMN',
            },
            task: {
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
        };
        this.eventBus.call('gotTaskSettings', taskData);
    }

    /**
     * Saves task information
     */
    saveTaskSettings() {
        // TODO(Alexandr): save task info with API
        // TODO(Alexandr): add response status checks
    }
}
