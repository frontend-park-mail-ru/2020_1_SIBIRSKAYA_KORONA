import {labelsPost} from '../libs/apiService.js';
import {ChainLinkSignals} from '../libs/controllerChainLink';

/**
 *  Model of 'Create label' popup
 */
export default class CreateLabelPopupModel {
    /**
     * Constructor of model of "Add label" popup
     * @param {Object} eventBus
     * @param {Number} boardID
     */
    constructor(eventBus, boardID) {
        this.eventBus = eventBus;
        this.boardID = boardID;

        this.createLabel = this.createLabel.bind(this);

        this.eventBus.subscribe('createLabel', this.createLabel);
    }


    /**
     * Create label
     * @param {Object} labelData
     * @return {Promise<void>}
     */
    async createLabel(labelData) {
        const addLabelResponse = await labelsPost(this.boardID, labelData);

        // TODO(Alexandr): check status
        switch (addLabelResponse.status) {
            case 200:
                this.eventBus.call(ChainLinkSignals.closeCurrentLink);
                break;
            default:
                console.log('Бэкэндер молодец!');
                break;
        }
    }
}
