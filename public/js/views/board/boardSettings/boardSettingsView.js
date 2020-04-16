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

        const popoverWindow = taskSettings.getElementsByClassName('board-settings')[0];
        popoverWindow.addEventListener('click', (event) => {
            event.stopPropagation();
            this.eventBus.call(ChainLinkSignals.closeLastChainLink);
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
};
