import './join.tmpl.js';

/**
 * View of join page
 */
export default class JoinView {
    /**
     * View constructor
     * @param {object} root - application's root element
     */
    constructor(root) {
        this.root = root;
        this.render = this.render.bind(this);
    }

    /**
     * Render view method
     */
    render() {
        this.root.innerHTML = window.fest['js/views/join/join.tmpl']();
    }
}
