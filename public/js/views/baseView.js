/**
 * Base view class, each view must extends it
 */
export default class BaseView {
    /**
     * Base view constructor
     * @param {object} eventBus - local event bus
     */
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.root = document.getElementById('application');
        this.inputtedData = {};
    }

    /**
     * Displays user input error, is triggered when model validation failed
     * @param {object} params {show : bool, field : string, text : string}
     */
    showError(params) {
        const errorLabel = document.getElementById(params.field + 'Error');
        if (errorLabel) {
            errorLabel.classList.toggle('hidden', !params.show);
            if (params.text) {
                errorLabel.innerText = params.text;
            }
        }
    };
}
