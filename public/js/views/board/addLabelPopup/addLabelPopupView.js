import './addLabelPopup.tmpl.js';
import BaseView from '../../baseView.js';

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

        this.relativeTarget = null;

        this.render = this.render.bind(this);
        this.renderAddLabelPopup = this.renderAddLabelPopup.bind(this);
        this.closeSelf = this.closeSelf.bind(this);

        this.eventBus.subscribe('gotLabels', this.renderAddLabelPopup);
    }

    /**
     * Method which triggers getting data from model and sets render position
     * @param {HTMLElement} [relativeTarget] - html element which will be used as base for further render
     */
    render(relativeTarget) {
        if (relativeTarget !== void 0) {
            this.relativeTarget = relativeTarget;
        }

        this.eventBus.call('getLabels');
    }

    /**
     * Real render view method with label data from model
     * @param {Object} labelsInfo - information about task and board labels
     */
    renderAddLabelPopup(labelsInfo) {
        const popupDiv = document.getElementById('popup-block');

        const {left, top} = this.relativeTarget.getBoundingClientRect();
        popupDiv.style.left = `${left}px`;
        popupDiv.style.top = `${top}px`;
        popupDiv.innerHTML = window.fest['js/views/board/addLabelPopup/addLabelPopup.tmpl'](labelsInfo);

        this.addEventListeners();
    }

    /**
     * Add event listeners for interactive elements
     */
    addEventListeners() {
        const openCreateLabelPopupButton = document.getElementById('openCreateLabelPopupButton');
        openCreateLabelPopupButton.addEventListener('click', (event) => {
            this.eventBus.call('openCreateLabelPopup', this.relativeTarget);
        });
    }


    /**
     * Clears popover block from current pop-over
     */
    closeSelf() {
        const popupDiv = document.getElementById('popup-block');
        popupDiv.innerHTML = '';
    }
}
