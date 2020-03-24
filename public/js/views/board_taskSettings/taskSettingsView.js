import './taskSettings.tmpl.js';
import BaseView from '../baseView.js';

/**
 * Task settings view
 */
export default class TaskSettingsView extends BaseView {
    /**
     * Task settings view constructor
     * @param {Object} eventBus - eventBus to share events with model
     */
    constructor(eventBus) {
        super(eventBus);

        this.render = this.render.bind(this);
        this.renderTaskSettings = this.renderTaskSettings.bind(this);
        this.closeSelf = this.closeSelf.bind(this);

        this.eventBus.subscribe('gotTaskSettings', this.renderTaskSettings);
    }

    /**
     * Method which triggers getting data from model
     */
    render() {
        this.eventBus.call('getTaskSettings');
    }

    /**
     * Real render view method with task data from model
     * @param {Object} taskData - task data to render
     */
    renderTaskSettings(taskData) {
        const popoverDiv = document.getElementById('popover-block');
        popoverDiv.innerHTML = window.fest['js/views/board_taskSettings/taskSettings.tmpl'](taskData);
        this.addEventListeners();
    }


    /**
     * Add event listeners for interactive elements
     */
    addEventListeners() {
        const taskSettings = document.getElementById('popover-block');

        const popoverWindow = taskSettings.getElementsByClassName('settings-form')[0];
        popoverWindow.addEventListener('click', (event) => {
            event.stopPropagation();
            this.eventBus.call('closeLastChild');
        });

        // TODO(Alexandr): add more event listeners
        const addNewLabelButton = taskSettings.querySelector('[name="addNewLabelButton"]');
        addNewLabelButton.addEventListener('click', (event) => {
            event.stopPropagation();
            const position = addNewLabelButton.getBoundingClientRect();
            this.eventBus.call('openAddLabelPopup', position);
        });

        const windowOverlay = taskSettings.getElementsByClassName('window-overlay')[0];
        windowOverlay.addEventListener('click', (event) => {
            if (event.target === event.currentTarget) {
                event.stopPropagation();
                this.eventBus.call('closeLastChildOrSelf');
            }
        });
    }

    /**
     * Clears popover block from current pop-over
     */
    closeSelf() {
        const popoverDiv = document.getElementById('popover-block');
        popoverDiv.innerHTML = '';
    }
}
