import './join.tmpl.js';

class JoinView {
    constructor(root) {
        this.root = root;
        this.render = this.render.bind(this);
    }

    render() {
        this.root.innerHTML = window.fest['js/views/join/join.tmpl']();
    }
}

export default JoinView;
