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

        this.relativeTarget = null;

        this.render = this.render.bind(this);
        this.renderAddLabelPopup = this.renderAddLabelPopup.bind(this);
        this.closeSelf = this.closeSelf.bind(this);

        this.eventBus.subscribe('gotLabelColors', this.renderAddLabelPopup);
    }

    /**
     * Method which triggers getting data from model and sets render position
     * @param {HTMLElement} [relativeTarget] - html element which will be used as base for further render
     */
    render(relativeTarget) {
        this.relativeTarget = relativeTarget;
        this.eventBus.call('getLabelColors');
    }

    /**
     * Real render view method with label data from model
     * @param {Object} boardLabelColors - information about board label colors
     */
    renderAddLabelPopup(boardLabelColors) {
        const popupDiv = document.getElementById('popup-block');

        const {left, top} = this.relativeTarget.getBoundingClientRect();
        popupDiv.style.left = `${left}px`;
        popupDiv.style.top = `${top}px`;
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
