import template from './createLabelPopup.tmpl.xml';
import BaseView from '../../baseView.js';

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

        this.position = {
            left: '0%',
            top: '0%',
        };
        this.labelData = {title: void 0, color: void 0};

        this.render = this.render.bind(this);
        this.renderAddLabelPopup = this.renderAddLabelPopup.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.closeSelf = this.closeSelf.bind(this);


        this.eventBus.subscribe('gotLabelColors', this.renderAddLabelPopup);
        this.eventBus.subscribe('createLabel', this.createLabel);
    }

    /**
     * Method which triggers getting data from model and sets render position
     * @param {Object} clickCoords - {x, y}
     */
    render(clickCoords) {
        this.position = {
            left: `${clickCoords.x / window.innerWidth * 100}%`,
            top: `${clickCoords.y / window.innerHeight * 100}%`,
        };
        this.eventBus.call('getLabelColors');
    }

    /**
     * Real render view method with label data from model
     * @param {Object} boardLabelColors - information about board label colors
     */
    renderAddLabelPopup(boardLabelColors) {
        const popupDiv = document.getElementById('popup-block');

        popupDiv.style.left = this.position.left;
        popupDiv.style.top = this.position.top;
        popupDiv.innerHTML = template(boardLabelColors);

        this.chooseColor('yellow');

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
            case target.classList.contains('js-createLabel'):
                event.stopPropagation();

                this.labelData.title = document.getElementById('popup-block')
                    .querySelector(`.js-inputLabelTitle`).value;
                this.eventBus.call('createLabel', this.labelData);
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
