import './createLabelPopup.tmpl.js';
import BaseView from '../baseView.js';

/**
 * View of 'Create label' popup
 */
export default class CreateLabelPopupView extends BaseView {
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

        this.eventBus.subscribe('gotLabelColors', this.renderAddLabelPopup);
    }

    /**
     * Method which triggers getting data from model and sets render position
     * @param {Object} position - object which contains left and top offset in px
     * TODO(Alexandr): use button target instead of position object. This way its easy to resize
     */
    render(position = {left: 0, top: 0}) {
        this.position = position;
        this.eventBus.call('getLabelColors');
    }

    /**
     * Real render view method with label data from model
     * @param {Object} boardLabelColors - information about board label colors
     */
    renderAddLabelPopup(boardLabelColors) {
        const popupDiv = document.getElementById('popup-block');
        popupDiv.style.left = `${this.position.left}px`;
        popupDiv.style.top = `${this.position.top}px`;
        popupDiv.innerHTML = window.fest['js/views/createLabelPopup/createLabelPopup.tmpl'](boardLabelColors);
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
