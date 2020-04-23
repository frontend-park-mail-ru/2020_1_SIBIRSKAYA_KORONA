import {labelsGet} from '../libs/apiService.js';
import {ChainLinkSignals} from '../libs/controllerChainLink.js';

/**
 *  Model of 'Add label' popup
 */
export default class AddLabelPopupModel {
    /**
     * Constructor of model of "Add label" popup
     * @param {Object} eventBus
     * @param {Object} taskData - information about current task
     */
    constructor(eventBus, taskData) {
        this.eventBus = eventBus;
        this.taskData = taskData;

        this.getLabels = this.getLabels.bind(this);

        this.eventBus.subscribe('getLabels', this.getLabels);
    }

    /**
     * Returns information about all labels of board
     * and which of them are used in task
     */
    async getLabels() {
        // TODO(Alexandr): get task info with API
        // TODO(Alexandr): add response status checks
        const boardLabelsResponse = await labelsGet(this.taskData.boardID);

        switch (boardLabelsResponse.status) {
            // TODO(Alexandr): check status
            case 200:
                break;
            default:
                console.log('Бэкэндер молодец!');
                this.eventBus.call(ChainLinkSignals.closeAllChildChainLinksAndSelf);
                return;
        }

        const boardLabels = await boardLabelsResponse.json();
        const taskLabelIds = [];


        // TODO(Alexandr): labels will have unique id for board. You should check id equality
        const labelsInfo = [];
        boardLabels.forEach((boardLabel) => {
            boardLabel['isActive'] = taskLabelIds.includes(boardLabel.id);
            labelsInfo.push(boardLabel);
        });

        this.eventBus.call('gotLabels', labelsInfo);
    }
}
