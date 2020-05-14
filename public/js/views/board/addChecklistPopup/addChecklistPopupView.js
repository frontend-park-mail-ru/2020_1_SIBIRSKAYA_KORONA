import BaseView from '../../baseView.js';
import template from './addChecklistPopup.tmpl.xml';

/**
 * View of 'Add label' popup
 */
export default class AddChecklistPopupView extends BaseView {
    /**
     * Constructor
     * @param {Object} parentEventBus  - parentEventBus to share events with model
     */
    constructor(parentEventBus) {
        super(parentEventBus);
        this.root = document.getElementById('popup-block');
        this.render = this.render.bind(this);
        this.closeSelf = this.closeSelf.bind(this);
    }


    /**
     * Render view method
     * @param {Object} clickCoords - {x, y}
     */
    render(clickCoords) {
        this.root.removeAttribute('style');
        this.root.style.left = clickCoords.x + 'px';
        this.root.style.top = clickCoords.y + 'px';
        this.root.innerHTML = template();
        this.addEventListeners();
    }

    /**
     * Add event listeners
     */
    addEventListeners() {
        this.root.querySelector('.js-inputChecklistName').focus();
        this.root.querySelector('.js-createChecklist').addEventListener('click', () => {
            const newChecklistName = this.root.querySelector('.js-inputChecklistName').value || 'Чек-лист';
            this.eventBus.call('addChecklist', newChecklistName);
            this.eventBus.call('closeLastChild');
        });
        this.root.querySelector('.js-closeChecklistForm').addEventListener('click', () => {
            this.eventBus.call('closeLastChild');
        });
    }

    /**
     * Clears popover block from current pop-over
     */
    closeSelf() {
        this.root.innerHTML = '';
    }
}
