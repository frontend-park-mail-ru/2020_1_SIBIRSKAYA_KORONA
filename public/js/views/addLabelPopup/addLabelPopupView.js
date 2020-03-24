import '../addLabelPopup/addLabelPopup.tmpl.js';
import BaseView from '../baseView.js';

/**
 * View of 'Add label' popup
 */
export default class AddLabelPopupView extends BaseView {
    /**
     * Constructor of view of 'Add label' popup
     * @param {Object} eventBus  - eventBus to share events with model
     */
    constructor(eventBus) {
        super(eventBus);

        this.position = {left: 0, top: 0};

        this.render = this.render.bind(this);
        this.renderAddLabelPopup = this.renderAddLabelPopup.bind(this);
        this.closeSelf = this.closeSelf.bind(this);

        this.eventBus.subscribe('gotLabels', this.renderAddLabelPopup);
    }

    /**
     * Method which triggers getting data from model and sets render position
     * @param {Object} position - object which contains left and top offset in px
     * TODO(Alexandr): use button targer instead of position object. This way its easycto resize
     */
    render(position = {left: 0, top: 0}) {
        this.position = position;
        this.eventBus.call('getLabels');
    }

    /**
     * Real render view method with label data from model
     * @param {Object} labelsInfo - information about task and board labels
     */
    renderAddLabelPopup(labelsInfo) {
        const popupDiv = document.getElementById('popup-block');
        popupDiv.style.left = `${this.position.left}px`;
        popupDiv.style.top = `${this.position.top}px`;
        popupDiv.innerHTML = window.fest['js/views/addLabelPopup/addLabelPopup.tmpl'](labelsInfo);
        this.addEventListeners();
    }

    /**
     * Add event listeners for interactive elements
     */
    addEventListeners() {
        // const popupDiv = document.getElementById('popup-block');
    }


    /**
     * Clears popover block from current pop-over
     */
    closeSelf() {
        const popupDiv = document.getElementById('popup-block');
        popupDiv.innerHTML = '';
    }
}
