import template from './changeLabel.tmpl.xml';
import BaseView from '../../baseView.js';

/**
 * View of 'Change label' popup
 */
export default class ChangeLabelPopupView extends BaseView {
    /**
     * Constructor of view of 'Change label' popup
     * @param {Object} eventBus  - eventBus to share events with model
     */
    constructor(eventBus) {
        super(eventBus);

        this.position = {
            left: '0%',
            top: '0%',
        };
        this.labelData = {color: null, title: null};

        this.render = this.render.bind(this);
        this.renderChangeLabelPopup = this.renderChangeLabelPopup.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.closeSelf = this.closeSelf.bind(this);


        this.eventBus.subscribe('gotLabel', this.renderChangeLabelPopup);
    }

    /**
     * Method which triggers getting data from model and sets render position
     * @param {Object} position - {left, top}
     */
    render(position) {
        this.position = position;
        this.eventBus.call('getLabel');
    }

    /**
     * Real render view method with label data from model
     * @param {Object} labelData - label color and title
     */
    renderChangeLabelPopup(labelData) {
        this.labelData = labelData;
        const popupDiv = document.getElementById('popup-block');
        popupDiv.removeAttribute('style');
        popupDiv.style.left = this.position.left;
        popupDiv.style.top = this.position.top;
        popupDiv.innerHTML = template(labelData);

        this.chooseColor(this.labelData.color);

        this.addEventListeners();
    }

    /**
     * Add event listeners for interactive elements
     */
    addEventListeners() {
        const popupDiv = document.getElementById('popup-block');
        const buttons = [
            ...popupDiv.getElementsByClassName('js-chooseColor'),
            ...popupDiv.getElementsByClassName('js-createLabel'),
            ...popupDiv.getElementsByClassName('js-saveLabel'),
            ...popupDiv.getElementsByClassName('js-deleteLabel'),
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
            case target.classList.contains('js-chooseColor'):
                event.stopPropagation();
                this.chooseColor(target.dataset['labelColor']);
                break;
            case target.classList.contains('js-saveLabel'):
                event.stopPropagation();
                this.labelData.title = document.getElementById('popup-block')
                    .querySelector(`.js-inputLabelTitle`).value;

                this.eventBus.call('saveLabel', this.labelData);
                break;
            case target.classList.contains('js-deleteLabel'):
                event.stopPropagation();
                this.eventBus.call('deleteLabel', this.labelData);
                break;
        }
    }

    /**
     * Choose color
     * @param {String} color
     */
    chooseColor(color) {
        const popupBlock = document.getElementById('popup-block');
        if (this.labelData.color) {
            const previousColorButton = popupBlock
                .querySelector(`.js-chooseColor.task-label--color--${this.labelData.color}`);
            previousColorButton.classList.remove('label-color-palette__label-color--active');
        }

        this.labelData.color = color;
        const currentColorChoiceButton = popupBlock
            .querySelector(`.js-chooseColor.task-label--color--${this.labelData.color}`);
        currentColorChoiceButton.classList.add('label-color-palette__label-color--active');
    }

    /**
     * Clears popover block from current pop-over
     */
    closeSelf() {
        const popupDiv = document.getElementById('popup-block');
        popupDiv.innerHTML = '';
    }
}
