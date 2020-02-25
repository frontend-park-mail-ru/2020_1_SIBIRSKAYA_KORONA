import './join.tmpl.js';

export default class JoinView {
    constructor(root) {
        this.root = root;
    }

    render() {
        this.root.innerHTML = window.fest['js/views/join/join.tmpl']();
    }
}
