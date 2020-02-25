import './login.tmpl.js';

/**
 * View of login page
 */
export default class LoginView {
    /**
     * View constructor
     * @param {object} root - application's root element
     */
    constructor(root) {
        this.root = root;
    }

    /**
     * Render view method
     */
    render() {
        this.root.innerHTML = window.fest['js/views/login/login.tmpl']();
    }
}


