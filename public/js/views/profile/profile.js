import './profile.tmpl.js';

class ProfileView {
    constructor(root) {
        this.root = root;
        this.render = this.render.bind(this);
    }

    render(data) {
        this.root.innerHTML = window.fest['js/views/profile/profile.tmpl'](data);
    }
}

export default ProfileView;
