import {ChainLinkSignals} from '../../../libs/controllerChainLink.js';
import BaseView from '../../baseView.js';
import template from './boardSettings.tmpl.xml';
import searchResultsTemplate from './showSearchResults.tmpl.xml';

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
        this.closeSelf = this.closeSelf.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);

        this.eventBus.subscribe('gotBoardSettings', this.renderBoardSettings.bind(this));
        this.eventBus.subscribe('gotUsers', this.renderUsersSearchResult.bind(this));
    }

    /**
     * Method which triggers getting data from model
     */
    render() {
        this.eventBus.call('getBoardSettings');
    }

    /**
     * Real render view method with board data from model
     * @param {Object} boardData - board data to render
     */
    renderBoardSettings(boardData) {
        const popoverDiv = document.getElementById('popover-block');
        popoverDiv.innerHTML = template(boardData);
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
            document.querySelector('.js-findMember'),
            document.querySelector('.js-findAdmin'),
            document.querySelector('.js-closeBoardSettingsButton'),
        ];
        buttons.forEach((button) => {
            button.addEventListener('click', this.handleButtonClick);
        });

        const inputs = [
            document.querySelector('#js-boardTitleInput'),
            document.querySelector('#js-searchMembersInput'),
        ];
        inputs.forEach((input) => {
            input.addEventListener('input', this.handleUserInput);
        });
    }

    /**
     * Render users search results
     * @param {Object} usersData - user data to render
     */
    renderUsersSearchResult(usersData) {
        document.querySelector('.js-search-results').innerHTML = searchResultsTemplate(usersData);
        const buttons = [
            ...document.querySelectorAll('.js-addNewAdmin'),
            ...document.querySelectorAll('.js-addNewMember'),
        ];
        buttons.forEach((button) => {
            button.addEventListener('click', this.handleButtonClick);
        });
    }

    /**
     * Handle user input in input fields
     * @param {object} event input event
     */
    handleUserInput(event) {
        const target = event.currentTarget;
        switch (true) {
            case target.id === 'js-boardTitleInput':
                console.log('js-boardTitleInput');
                break;
            case target.id === 'js-searchMembersInput':
                if (target.value.length !== 0) {
                    this.eventBus.call('getUsers', target.value);
                }
                break;
            default:
                break;
        }
    }

    /**
     * Handle all buttons click
     * @param {object} event mouse click event
     */
    handleButtonClick(event) {
        const target = event.currentTarget;
        switch (true) {
            case target.classList.contains('js-closeBoardSettingsButton'):
                event.stopPropagation();
                this.closeSelf();
                break;
            case target.classList.contains('js-findMember'):
            case target.classList.contains('js-findAdmin'):
                if (!target.classList.contains('board-settings-members__add-button--rotated')) {
                    this.showSearchForm(target);
                } else {
                    this.hideSearchForm(target);
                }
                break;
            case target.classList.contains('js-addNewAdmin'):
            case target.classList.contains('js-addNewMember'):
                const userID = target.dataset.userId;
                this.eventBus.call('inviteUser', userID);
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
        searchContainer.querySelector('#js-searchMembersInput').focus();
    }

    /**
     * Hides search form and set plus buttons appearance to default
     */
    hideSearchForm() {
        document.querySelector('.js-findMember').classList.remove('board-settings-members__add-button--rotated');
        document.querySelector('.js-findAdmin').classList.remove('board-settings-members__add-button--rotated');
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
