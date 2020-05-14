import {ChainLinkSignals} from '../../../libs/controllerChainLink.js';
import BaseView from '../../baseView.js';
import template from './taskSettings.tmpl.xml';

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
        this.closeSelf = this.closeSelf.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleToggleCheckBox = this.handleToggleCheckBox.bind(this);
        this.handleFileInput = this.handleFileInput.bind(this);

        this.eventBus.subscribe('gotTaskSettings', this.renderTaskSettings.bind(this));
        this.eventBus.subscribe('closeAssignsPopup', this.handleCloseAssignsPopup.bind(this));
        this.eventBus.subscribe('assignSuccess', this.handleAssignSuccess.bind(this));
        this.eventBus.subscribe('uploadAttachSuccess', this.render);
        this.eventBus.subscribe('deleteAttachSuccess', this.render);
        this.eventBus.subscribe('updatedTaskLabel', this.render);


        this.assignPopupOpened = false;
        this.scrollHeight = 0;

        this.root = document.getElementById('popover-block');
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
        this.root.innerHTML = template(taskData);
        document.querySelector('.task')?.scrollTo(0, this.scrollHeight);
        this.addEventListeners();
    }

    /**
     * Add event listeners for interactive elements
     */
    addEventListeners() {
        const taskSettingsElements = [
            this.root.querySelector('.task'),
            this.root.querySelector('.window-overlay'),
            this.root.querySelector('.js-addNewLabel'),
            this.root.querySelector('.js-addAssign'),
            this.root.querySelector('.js-saveTask'),
            this.root.querySelector('.js-deleteTask'),
            this.root.querySelector('.js-saveComment'),
            this.root.querySelector('.js-addNewChecklist'),
            this.root.querySelector('.js-closeTaskButton'),
            ...this.root.querySelectorAll('.js-addNewChecklistItem'),
            ...this.root.querySelectorAll('.js-closeChecklistItemForm'),
            ...this.root.querySelectorAll('.js-createChecklistItem'),
            ...this.root.querySelectorAll('.js-checklistItem'),
            ...this.root.querySelectorAll('.js-deleteChecklist'),
            ...this.root.querySelectorAll('.js-downloadAttach'),
            ...this.root.querySelectorAll('.js-deleteComment'),
            ...this.root.querySelectorAll('.js-deleteAttach'),
        ];
        taskSettingsElements.forEach((element) => {
            element.addEventListener('click', this.handleClick);
        });

        const fileInput = this.root.querySelector('.js-attachFile');
        fileInput.addEventListener('change', this.handleFileInput);

        const comments = [...this.root.querySelectorAll('.task-settings-comment')];
        comments.forEach((comment) => {
            const handler = () => {
                comment.querySelector('.task-settings-comment-controls').classList.toggle('display-none');
            };
            comment.addEventListener('mouseenter', handler);
            comment.addEventListener('mouseleave', handler);
        });
    }

    /**
     * Handles all clicks
     * @param {MouseEvent} event
     */
    handleClick(event) {
        this.scrollHeight = this.root.querySelector('.task').scrollTop;
        const classList = event.currentTarget.classList;
        switch (true) {
            case classList.contains('task'):
                this.eventBus.call(ChainLinkSignals.closeLastChainLink);
                break;

            case classList.contains('js-addNewLabel'):
                event.stopPropagation();
                const {x, y} = event.currentTarget.getBoundingClientRect();
                this.eventBus.call('openAddLabelPopup', {x, y});
                this.handleCloseAssignsPopup();
                break;

            case classList.contains('js-addAssign'):
                if (!this.assignPopupOpened) {
                    this.assignPopupOpened = true;
                    event.stopPropagation();
                    event.target.classList.add('task-settings-members__add-button--rotated');
                    this.eventBus.call('openAssignsPopup', {x: event.pageX, y: event.pageY});
                } else {
                    this.handleCloseAssignsPopup();
                }
                break;

            case classList.contains('js-addNewChecklist'):
                event.stopPropagation();
                this.eventBus.call('openAddChecklistPopup', {x: event.pageX, y: event.pageY});
                this.handleCloseAssignsPopup();
                break;

            case classList.contains('js-addNewChecklistItem'):
            case classList.contains('js-closeChecklistItemForm'): {
                const checklistElement = event.currentTarget.closest('.checklist');
                checklistElement.querySelector('.js-checklist-add-item-form').classList.toggle('display-none');
                checklistElement.querySelector('.js-checklist-controls').classList.toggle('display-none');
                checklistElement.querySelector('.js-inputNewItemTitle').focus();
                break;
            }

            case classList.contains('js-deleteChecklist'): {
                const checklistElement = event.currentTarget.closest('.checklist');
                const checklistID = checklistElement.dataset.checklistId;
                this.eventBus.call('deleteChecklist', checklistID);
                break;
            }

            case classList.contains('js-downloadAttach'): {
                event.stopPropagation();
                const downloadButton = document.createElement('a');
                downloadButton.href = event.currentTarget.dataset['fileUrl'];
                downloadButton.download = event.currentTarget.dataset['attachName'];

                document.body.appendChild(downloadButton);
                downloadButton.click();
                document.body.removeChild(downloadButton);
                break;
            }

            case classList.contains('js-deleteAttach'): {
                event.stopPropagation();
                this.eventBus.call('deleteAttach', event.currentTarget.dataset['attachId']);
                break;
            }

            case classList.contains('js-createChecklistItem'):
                const checklistElement = event.currentTarget.closest('.checklist');
                const checklistID = checklistElement.dataset.checklistId;
                const text = checklistElement.querySelector('.js-inputNewItemTitle').value;
                if (text) {
                    this.eventBus.call('addChecklistItem', {checklistID, text, isDone: false});
                }
                break;

            case classList.contains('js-checklistItem'):
                this.handleToggleCheckBox(event.target);
                break;

            case classList.contains('js-saveTask'):
                const description = this.root.querySelector('.js-inputDescription')?.innerText;
                const title = this.root.querySelector('.js-inputTitle')?.value;
                this.eventBus.call('saveTaskSettings', {title, description});
                break;

            case classList.contains('js-deleteTask'):
                this.eventBus.call('deleteTask');
                break;

            case classList.contains('js-saveComment'):
                const commentText = this.root.querySelector('.js-commentText').innerText;
                if (commentText.length !== 0) {
                    this.eventBus.call('addComment', commentText);
                }
                break;
            case classList.contains('js-deleteComment'):
                this.eventBus.call('deleteComment', Number(event.currentTarget.dataset.commentId));
                break;

            case classList.contains('window-overlay'):
                if (event.target === event.currentTarget) {
                    this.eventBus.call(ChainLinkSignals.closeLastChainLinkOrSelf);
                }
                break;

            case classList.contains('js-closeTaskButton'):
                event.stopPropagation();
                document.getElementById('popover-block').innerHTML = '';
                document.getElementById('popup-block').innerHTML = '';
                this.eventBus.call(ChainLinkSignals.closeCurrentLink);
                break;

            default:
                break;
        }
    }

    /**
     * Handles changing value of checklist item
     * @param {EventTarget} item
     */
    handleToggleCheckBox(item) {
        const itemData = {
            id: Number(item.dataset.itemId),
            done: item.checked,
        };
        const checklist = item.closest('.checklist');
        const checklistId = checklist.dataset.checklistId;
        this.eventBus.call('updateChecklistItem', checklistId, itemData);

        let itemsDone = 0;
        const items = checklist.querySelectorAll('.js-checklistItem');
        items.forEach((item) => {
            if (item.checked) {
                itemsDone++;
            }
        });
        const progress = Math.floor(itemsDone / items.length * 100) || 0;
        const color = (progress === 0) ? 'transparent' :
            (progress < 33) ? '#eb5a46' : (progress < 66) ? '#f2d600' : '#61bd4f';
        const progressBar = checklist.querySelector('.checklist-progressbar-progress');
        progressBar.style.width = progress + '%';
        progressBar.style.background = color;
        checklist.querySelector('.checklist-title-percents').innerText = progress + '%';
    }

    /**
     * Handler for file input
     * @param {Event} event
     */
    handleFileInput(event) {
        event.stopPropagation();
        const file = event.target.files[0];
        this.eventBus.call('uploadAttach', file);
    }

    /**
     * This view reaction for closing assigns popup
     */
    handleCloseAssignsPopup() {
        this.assignPopupOpened = false;
        const classRotated = 'task-settings-members__add-button--rotated';
        this.root.querySelector('.' + classRotated)?.classList.remove(classRotated);
    }

    /**
     * Rerender task members on assigns success update
     */
    handleAssignSuccess() {
        this.render();
    }

    /**
     * Closes all
     */
    closeSelfAndAllChildren() {
        this.eventBus.call(ChainLinkSignals.closeAllChildChainLinksAndSelf);
        this.closeSelf();
    }

    /**
     * Clears popover block from current pop-over
     */
    closeSelf() {
        this.root.innerText = '';
    }
}
