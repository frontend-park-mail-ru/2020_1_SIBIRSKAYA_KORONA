import BaseView from '../../baseView.js';
import template from './addAssignsPopup.tmpl.xml';

/**
 * Add assigns popup view
 */
export default class AddAssignsPopupView extends BaseView {
    /**
     * Constructor
     * @param {Object} parentEventBus  - parentEventBus to share events with model
     */
    constructor(parentEventBus) {
        super(parentEventBus);
        this.root = document.getElementById('popup-block');
        this.render = this.render.bind(this);
        this.closeSelf = this.closeSelf.bind(this);

        this.eventBus.subscribe('gotTaskAssigns', this.renderAssignsPopup.bind(this));
    }

    /**
     * Triggers getting data from backend and set popup position
     * @param {Object} clickCoords - {x, y}
     */
    render(clickCoords) {
        if (clickCoords) {
            this.root.removeAttribute('style');
            this.root.style.left = clickCoords.x + 'px';
            this.root.style.top = clickCoords.y + 'px';
        }
        this.eventBus.call('getTaskAssigns');
    }

    /**
     * Real render method with data from backend
     * @param {Object} data - board members with mark (assigned or not)
     */
    renderAssignsPopup(data) {
        this.root.innerHTML = template(data);
        this.addEventListeners();
    }

    /**
     * Add event listeners
     */
    addEventListeners() {
        const checkboxes = [...this.root.querySelectorAll('.js-assign')];
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('click', (event) => {
                const userId = event.target.dataset.userId;
                const assigned = event.target.checked;
                this.eventBus.call('updateAssign', userId, assigned);
            });
        });

        this.root.querySelector('.js-closeAssignsForm').addEventListener('click', () => {
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
