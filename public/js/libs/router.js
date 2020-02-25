'use strict';

/**
 * Application router
 */
export default class Router {
    /**
     * Router constructor
     * @param {object} root - application's root element
     */
    constructor(root) {
        this.root = root;
        this.routeMap = new Map();
        this.handleMouseClick = this.handleMouseClick.bind(this);
        this.root.addEventListener('click', this.handleMouseClick);
    }

    /**
     * Switch current route
     * @param {string} route - route to go
     */
    go(route) {
        if (this.routeMap.has(route)) {
            this.routeMap.get(route)();
        }
    }

    /**
     * Click handler
     * @param {object} e - mouse event
     */
    handleMouseClick(e) {
        if (e.target.tagName.toLowerCase() === 'a') {
            e.stopPropagation();
            e.preventDefault();
            this.go(e.target.pathname);
        } else if (e.target.tagName.toLowerCase() === 'button') {
            e.preventDefault();
        }
    }

    /**
     * Set route and function to call for it
     * @param {string} route - route to go
     * @param {function} handler - route handler
     */
    setRoute(route, handler) {
        this.routeMap.set(route, handler);
    }
}
