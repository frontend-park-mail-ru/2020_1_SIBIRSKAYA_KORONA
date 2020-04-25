import {labelPut, labelGet, labelDelete} from '../libs/apiService.js';
import {ChainLinkSignals} from '../libs/controllerChainLink';

/**
 *  Model of 'Change label' popup
 */
export default class ChangeLabelPopupModel {
    /**
     * Constructor of model of "Add label" popup
     * @param {Object} eventBus
     * @param {Object} labelData - board id and label id
     */
    constructor(eventBus, labelData = {boardID: null, labelID: null}) {
        this.eventBus = eventBus;
        this.labelData = labelData;

        this.getLabel = this.getLabel.bind(this);
        this.saveLabel = this.saveLabel.bind(this);
        this.deleteLabel = this.deleteLabel.bind(this);


        this.eventBus.subscribe('getLabel', this.getLabel);
        this.eventBus.subscribe('saveLabel', this.saveLabel);
        this.eventBus.subscribe('deleteLabel', this.deleteLabel);
    }

    /**
     * Returns list of all label colors of board
     */
    async getLabel() {
        // TODO(Alexandr): check status
        const getLabelResponse = await labelGet(this.labelData.boardID, this.labelData.labelID);
        switch (getLabelResponse.status) {
            case 200:
                this.eventBus.call('gotLabel', await getLabelResponse.json());
                break;
            default:
                console.log('Бэкэндер молодец!');
                break;
        }
    }

    /**
     * Save label
     * @param {Object} newLabelData
     * @return {Promise<void>}
     */
    async saveLabel(newLabelData) {
        const addLabelResponse = await labelPut(this.labelData.boardID, this.labelData.labelID, newLabelData);

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

    /**
     * Delete label
     * @return {Promise<void>}
     */
    async deleteLabel() {
        const deleteLabelResponse = await labelDelete(this.labelData.boardID, this.labelData.labelID);

        // TODO(Alexandr): check status
        switch (deleteLabelResponse.status) {
            case 200:
                this.eventBus.call(ChainLinkSignals.closeCurrentLink);
                break;
            default:
                console.log('Бэкэндер молодец!');
                break;
        }
    }
}
