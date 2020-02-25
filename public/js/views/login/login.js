import './login.tmpl.js';

class LoginView {
    constructor(root) {
        this.root = root;
        this.render = this.render.bind(this);
    }

    render() {
        this.root.innerHTML = window.fest['js/views/login/login.tmpl']();
    }
}

export default LoginView;
