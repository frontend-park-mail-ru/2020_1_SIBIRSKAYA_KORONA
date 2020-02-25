'use strict';

class Router {
    constructor(root) {
        this.root = root;
        this.routeMap = new Map();
        this.handleMouseClick = this.handleMouseClick.bind(this);
        this.root.addEventListener('click', this.handleMouseClick);
    }

    go(route) {
        if (this.routeMap.has(route)) {
            this.routeMap.get(route)();
        }
    }

    handleMouseClick(e) {
        if (e.target.tagName.toLowerCase() === 'a') {
            e.stopPropagation();
            e.preventDefault();
            this.go(e.target.pathname);
        } else if (e.target.tagName.toLowerCase() === 'button') {
            e.preventDefault();

        }
    }

    setRoute(route, handler) {
        this.routeMap.set(route, handler);
    }
}

export default Router;