import addLabelPopupTemplate from './addLabelPopup.tmpl.xml';
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
        this.handleClick = this.handleClick.bind(this);
        this.updateLabelStatus = this.updateLabelStatus.bind(this);
        this.closeSelf = this.closeSelf.bind(this);

        this.eventBus.subscribe('gotLabels', this.renderAddLabelPopup);
        this.eventBus.subscribe('labelStatusChanged', this.updateLabelStatus);
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
        popupDiv.innerHTML = addLabelPopupTemplate(labelsInfo);

        for (const label of labelsInfo) {
            this.updateLabelStatus(label.id, label.isActive);
        }

        this.addEventListeners();
    }

    /**
     * Add event listeners for interactive elements
     */
    addEventListeners() {
        const popupBlock = document.getElementById('popup-block');
        const buttons = [
            ...popupBlock.getElementsByClassName('js-openCreateLabelPopup'),
            ...popupBlock.getElementsByClassName('js-openChangeLabelPopup'),
            ...popupBlock.getElementsByClassName('js-addOrRemoveLabel'),
        ];

        for (const button of buttons) {
            button.addEventListener('click', this.handleClick);
        }
    }

    /**
     * Handle all buttons click
     * @param {Event} event mouse click event
     */
    handleClick(event) {
        const target = event.currentTarget;

        switch (true) {
            case target.classList.contains('js-openCreateLabelPopup'):
                event.stopPropagation();
                this.eventBus.call('openCreateLabelPopup', this.relativeTarget);
                break;

            case target.classList.contains('js-openChangeLabelPopup'): {
                event.stopPropagation();
                const labelID = Number(target.dataset['labelId']);
                this.eventBus.call('openChangeLabelPopup', this.relativeTarget, labelID);
                break;
            }

            case target.classList.contains('js-addOrRemoveLabel'):
                event.stopPropagation();
                const labelID = Number(target.dataset['labelId']);
                const isActive = target.classList.contains('active');

                if (isActive) {
                    this.eventBus.call('removeLabel', labelID);
                } else {
                    this.eventBus.call('addLabel', labelID);
                }
                break;
        }
    }

    /**
     * Update label status (active or not)
     * @param {Number} labelID
     * @param {Boolean} isActive
     */
    updateLabelStatus(labelID, isActive) {
        const popupBlock = document.getElementById('popup-block');
        const allLabels = popupBlock.getElementsByClassName('js-addOrRemoveLabel');
        for (const label of allLabels) {
            if (Number(label.dataset['labelId']) !== labelID) {
                continue;
            }

            if (isActive && !label.classList.contains('active')) {
                label.classList.add('active');
            } else if (label.classList.contains('active')) {
                label.classList.remove('active');
            }

            break;
        }
    }


    /**
     * Clears popover block from current pop-over
     */
    closeSelf() {
        const popupDiv = document.getElementById('popup-block');
        popupDiv.innerHTML = '';
    }
}
