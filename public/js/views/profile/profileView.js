import './profileView.tmpl.js';

/**
 * View of login page
 */
export default class ProfileView {
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
     * @param {object} data user data to render
     */
    render(data) {
        this.root.innerHTML = window.fest['js/views/profile/profileView.tmpl'](data);
    }
}
