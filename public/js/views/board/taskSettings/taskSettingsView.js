import template from './taskSettings.tmpl.xml';
import BaseView from '../../baseView.js';
import {ChainLinkSignals} from '../../../libs/controllerChainLink.js';


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
        this.scrollHeight = 0;
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
        document.getElementById('popover-block').innerHTML = template(taskData);
        document.querySelector('.task')?.scrollTo(0, this.scrollHeight);
        this.addEventListeners();
    }


    /**
     * Add event listeners for interactive elements
     */
    addEventListeners() {
        const taskSettings = document.getElementById('popover-block');

        const popoverWindow = taskSettings.getElementsByClassName('task')[0];
        popoverWindow.addEventListener('click', (event) => {
            event.stopPropagation();
            this.eventBus.call(ChainLinkSignals.closeLastChainLink);
        });

        // TODO(Alexandr): add more event listeners
        const addNewLabelButton = taskSettings.querySelector('[name="addNewLabelButton"]');
        addNewLabelButton.addEventListener('click', (event) => {
            event.stopPropagation();
            this.eventBus.call('openAddLabelPopup', event.target);
        });

        const saveTaskButton = taskSettings.querySelector('.js-saveTask');
        saveTaskButton.addEventListener('click', (event)=>{
            event.stopPropagation();
            const description = taskSettings.querySelector('#inputDescription').innerText;
            const title = taskSettings.querySelector('#inputTitle').value;
            this.eventBus.call('saveTaskSettings', {title, description});
        });

        const deleteTaskButton = taskSettings.querySelector('.js-deleteTask');
        deleteTaskButton.addEventListener('click', (event)=>{
            this.eventBus.call('deleteTask');
        });

        const addMemberButton = taskSettings.querySelector('.js-addNewTaskMember');
        addMemberButton.addEventListener('click', (event) => {
            // addMemberButton.
        });

        const saveCommentButton = taskSettings.querySelector('.js-saveComment');
        saveCommentButton.addEventListener('click', (event) => {
            const commentText = taskSettings.querySelector('.js-commentText').innerText;
            if (commentText.length !== 0) {
                this.scrollHeight = popoverWindow.scrollTop + 300;
                this.eventBus.call('addComment', commentText);
            }
        });

        const windowOverlay = taskSettings.getElementsByClassName('window-overlay')[0];
        windowOverlay.addEventListener('click', (event) => {
            if (event.target === event.currentTarget) {
                event.stopPropagation();
                this.eventBus.call(ChainLinkSignals.closeLastChainLinkOrSelf);
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
