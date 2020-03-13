/**
 * Application router
 * Contains global event bus
 */
export default class Router {
    /**
     * Router constructor
     * @param {object} root - application's root element
     */
    constructor(root) {
        this.routeMap = new Map();
        root.addEventListener('click', this.handleMouseClick.bind(this));
    }

    /**
     * Switch current route
     * @param {string} route - route to go
     * @param {...any} params - arguments to call with
     */
    go(route, ...params) {
        window.history.pushState({}, '', route);

        if (this.routeMap.has(route)) {
            this.routeMap.get(route)(...params);
        } else {
            // TODO 404 page
            document.getElementById('application').innerHTML = 'PAGE NOT FOUND';
        }
    }

    /**
     * Click handler
     * @param {object} e - mouse event
     */
    handleMouseClick(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            this.go(e.target.pathname);
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
