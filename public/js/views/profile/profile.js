import './profile.tmpl.js';

export default class ProfileView {
    constructor(root) {
        this.root = root;
    }

    render(data) {
        console.log(data);
        this.root.innerHTML = window.fest['js/views/profile/profile.tmpl'](data);
    }
}