import './board.tmpl.js';
import BaseView from '../baseView.js';

/**
 * Board view
 */
export default class BoardView extends BaseView {
    /**
     * Board view constructor
     * @param {Object} eventBus - eventBus to share events with model
     */
    constructor(eventBus) {
        super(eventBus);

        this.render = this.render.bind(this);
        this.renderBoard = this.renderBoard.bind(this);

        eventBus.subscribe('gotData', this.renderBoard);
    }

    /**
     * Method which triggers getting data from model
     */
    render() {
        this.eventBus.call('getData');
    }

    /**
     * Real render view method with board data from model
     * @param {Object} boardData - board data to render
     */
    renderBoard(boardData) {
        this.root.innerHTML = window.fest['js/views/board/board.tmpl'](boardData);
        this.addEventListeners();
    }

    /**
     * Set handlers for task, labels, etc.
     */
    addEventListeners() {
        console.log('ADD LISTENERS NOT IMPLEMENTED');
    }
}
