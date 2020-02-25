import './login.tmpl.js';

export default class LoginView {
    constructor(root) {
        this.root = root;
    }

    render() {
        this.root.innerHTML = window.fest['js/views/login/login.tmpl']();
    }
}
