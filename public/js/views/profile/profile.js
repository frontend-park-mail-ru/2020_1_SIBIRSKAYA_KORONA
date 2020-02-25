import './profile.tmpl.js';

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
    }

    /**
     * Render view method
     * @param {object} data user data to render
     */
    render(data) {
        console.log(data);
        this.root.innerHTML = window.fest['js/views/profile/profile.tmpl'](data);
    }
}