import {} from '../libs/apiService.js';

/**
 *  Model of 'Create label' popup
 */
export default class CreateLabelPopupModel {
    /**
     * Constructor of model of "Add label" popup
     * @param {Object} eventBus
     */
    constructor(eventBus) {
        this.eventBus = eventBus;

        this.getColors = this.getColors.bind(this);

        this.eventBus.subscribe('getLabelColors', this.getColors);
    }

    /**
     * Returns list of all label colors of board
     */
    getColors() {
        // TODO(Alexandr): get task info with API
        // TODO(Alexandr): add response status checks
        const boardLabelColors = ['yellow', 'orange', 'red', 'purple', 'darkblue', 'black'];


        this.eventBus.call('gotLabelColors', boardLabelColors);
    }
}
