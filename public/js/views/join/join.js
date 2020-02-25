import './join.tmpl.js';

export default class JoinView {
    constructor(root) {
        this.root = root;
    }

    render() {
        this.root.innerHTML = window.fest['js/views/join/join.tmpl']();
    }

    onError() {
        alert('Nickname already exists or wrong data');
    }

    getUserData() {
        return {
            name: document.getElementById("user_name").value,
            surname: document.getElementById("user_surname").value,
            nickname: document.getElementById("user_nickname").value,
            password: document.getElementById("user_password").value,
        }
    }
}

