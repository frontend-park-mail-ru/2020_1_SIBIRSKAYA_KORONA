import {} from '../libs/apiService.js';

/**
 *  Model of 'Add label' popup
 */
export default class AddLabelPopupModel {
    /**
     * Constructor of model of "Add label" popup
     * @param {Object} eventBus
     */
    constructor(eventBus) {
        this.eventBus = eventBus;

        this.getLabels = this.getLabels.bind(this);

        this.eventBus.subscribe('getLabels', this.getLabels);
    }

    /**
     * Returns information about all labels of board
     * and which of them are used in task
     */
    getLabels() {
        // TODO(Alexandr): get task info with API
        // TODO(Alexandr): add response status checks
        const boardLabels = [
            {
                id: 0,
                title: 'label 1',
                color: 'red',
            },
            {
                id: 1,
                title: 'label 2',
                color: 'darkblue',
            },
            {
                id: 2,
                title: 'label 3',
                color: 'black',
            },
            {
                id: 3,
                title: 'Label 4',
                color: 'orange',
            },
        ];

        const taskLabelIds = [1, 2];


        // TODO(Alexandr): labels will have unique id for board. You should check id equality
        const labelsInfo = [];
        boardLabels.forEach((boardLabel) => {
            boardLabel['isActive'] = taskLabelIds.includes(boardLabel.id);
            labelsInfo.push(boardLabel);
        });

        this.eventBus.call('gotLabels', labelsInfo);
    }
}
