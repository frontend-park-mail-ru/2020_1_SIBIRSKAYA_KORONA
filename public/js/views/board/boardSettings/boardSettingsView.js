import {ChainLinkSignals} from '../../../libs/controllerChainLink.js';
import BaseView from '../../baseView.js';
import template from './boardSettings.tmpl.xml';

/**
 * Task settings view
 */
export default class BoardSettingsView extends BaseView {
    /**
     * Board settings view constructor
     * @param {Object} eventBus - eventBus to share events with model
     */
    constructor(eventBus) {
        super(eventBus);

        this.render = this.render.bind(this);
        this.renderBoardSettings = this.renderBoardSettings.bind(this);
        this.closeSelf = this.closeSelf.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);

        this.searchShownFor = ''; // members | admins

        this.eventBus.subscribe('gotBoardSettings', this.renderBoardSettings);
    }

    /**
     * Method which triggers getting data from model
     */
    render() {
        this.eventBus.call('getBoardSettings');
    }

    /**
     * Real render view method with task data from model
     * @param {Object} boardData - task data to render
     */
    renderBoardSettings(boardData) {
        console.log(boardData.board);
        const popoverDiv = document.getElementById('popover-block');
        popoverDiv.innerHTML = template(boardData.board);
        this.addEventListeners();
    }


    /**
     * Add event listeners for interactive elements
     */
    addEventListeners() {
        const taskSettings = document.getElementById('popover-block');

        const popoverWindow = taskSettings.querySelector('.board-settings');
        popoverWindow.addEventListener('click', (event) => {
            event.stopPropagation();
            this.eventBus.call(ChainLinkSignals.closeLastChainLink);
        });

        const windowOverlay = taskSettings.querySelector('.window-overlay');
        windowOverlay.addEventListener('click', (event) => {
            if (event.target === event.currentTarget) {
                event.stopPropagation();
                this.eventBus.call(ChainLinkSignals.closeLastChainLinkOrSelf);
            }
        });

        const buttons = [
            document.querySelector('.js-addNewMember'),
            document.querySelector('.js-addNewAdmin'),
        ];

        buttons.forEach((button) => {
            console.log(button);
            button.addEventListener('click', this.handleButtonClick);
        });
    }

    /**
     * Handle all buttons click
     * @param {object} event mouse click event
     */
    handleButtonClick(event) {
        const target = event.currentTarget;
        switch (true) {
            case target.classList.contains('js-addNewMember'):
            case target.classList.contains('js-addNewAdmin'):
                if (!target.classList.contains('board-settings-members__add-button--rotated')) {
                    this.showSearchForm(target);
                } else {
                    this.hideSearchForm(target);
                }
                break;
            default:
                break;
        }
    }

    /**
     * Shows search form for adding users to board
     * @param {HTMLElement} target - click event target
     */
    showSearchForm(target) {
        target.classList.add('board-settings-members__add-button--rotated');
        if (!document.querySelector('.js-search').classList.contains('display-none')) {
            return;
        }
        const searchContainer = document.querySelector('.js-search');
        searchContainer.classList.remove('display-none');
    }

    /**
     * Hides search form and set plus buttons appearance to default
     */
    hideSearchForm() {
        document.querySelector('.js-addNewMember').classList.remove('board-settings-members__add-button--rotated');
        document.querySelector('.js-addNewAdmin').classList.remove('board-settings-members__add-button--rotated');
        const searchContainer = document.querySelector('.js-search');
        searchContainer.classList.add('display-none');
    }

    /**
     * Clears popover block from current pop-over
     */
    closeSelf() {
        const popoverDiv = document.getElementById('popover-block');
        popoverDiv.innerHTML = '';
    }
};
