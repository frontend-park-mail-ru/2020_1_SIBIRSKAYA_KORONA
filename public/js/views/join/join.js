import './join.tmpl.js';

class JoinView {
    constructor(root) {
        this.root = root;
    }

    render() {
        this.root.innerHTML = window.fest['js/views/join/join.tmpl']();
    }
}

export default JoinView;
