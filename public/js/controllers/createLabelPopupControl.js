import CreateLabelPopupModel from '../models/createLabelPopupModel.js';
import CreateLabelPopupView from '../views/createLabelPopup/createLabelPopupView.js';
import EventBus from '../libs/eventBus.js';


/**
 * Create label popup controller
 */
export default class CreateLabelPopupController {
    /**
     * Controller constructor
     * @param {EventBus} parentEventBus - for communication with parent mvc
     */
    constructor(parentEventBus) {
        this.eventBus = new EventBus([
            'closedChild', // internal signal
            'closeLastChild', // outside signal
            'closeLastChildOrSelf', // outside signal
            'closeAllChildren', // outside signal
            'closeAllChildrenAndSelf', // outside signal
            'closeSelf', // must be set

            'getLabelColors',
            'gotLabelColors',

            'createLabel',
        ]);

        this.view = new CreateLabelPopupView(this.eventBus);
        this.model = new CreateLabelPopupModel(this.eventBus);


        this.eventBus.subscribe('closeSelf', () => {
            this.view.closeSelf();
            if (this.parentEventBus !== null) {
                this.parentEventBus.call('closedChild');
            }

            parentEventBus.call('closedCreateLabelPopup');
        });


        this.parentEventBus = parentEventBus;
        this.childEventBus = null;

        this.eventBus.subscribe('closedChild', () => {
            this.childEventBus = null;
        });

        this.eventBus.subscribe('closeLastChild', () => {
            if (this.childEventBus !== null) {
                this.childEventBus.call('closeLastChildOrSelf');
            }
        });

        this.eventBus.subscribe('closeLastChildOrSelf', () => {
            if (this.childEventBus !== null) {
                this.childEventBus.call('closeLastChildOrSelf');
            } else {
                this.eventBus.call('closeSelf');
            }
        });

        this.eventBus.subscribe('closeAllChildren', () => {
            if (this.childEventBus !== null) {
                this.childEventBus.call('closeAllChildrenAndSelf');
                this.childEventBus = null;
            }
        });

        this.eventBus.subscribe('closeAllChildrenAndSelf', () => {
            if (this.childEventBus !== null) {
                this.childEventBus.call('closeAllChildrenAndSelf');
            }

            this.eventBus.call('closeSelf');
        });
    }
}
