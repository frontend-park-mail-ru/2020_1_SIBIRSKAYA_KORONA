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
        this.routes = [];
        root.addEventListener('click', this.handleMouseClick.bind(this));
    }

    /**
     * Switch current route
     * @param {string} URL - URL to go
     */
    go(URL) {
        let routeNotFound = true;
        this.routes.forEach((route) => {
            if (route.regExp.test(URL)) {
                const parsedURL = route.regExp.exec(URL);
                route.handler(parsedURL.groups);
                routeNotFound = false;
            }
        });
        if (routeNotFound) {
            document.getElementById('application').innerHTML = 'PAGE NOT FOUND';
        }
        window.history.pushState({}, '', URL);
    }

    /**
     * Click handler
     * @param {Object} event - mouse event
     */
    handleMouseClick(event) {
        console.log('event', event);
        if (event.target.tagName === 'A') {
            event.preventDefault();
            this.go(event.target.pathname);
        } else if (event.target.parentElement.tagName === 'A') {
            event.preventDefault();
            this.go(event.target.parentElement.pathname);
        }
    }

    /**
     * Set route and function to call for it
     * @param {string} route - route to go
     * @param {function} handler - route handler
     */
    setRoute(route, handler) {
        this.routes.push({
            regExp: new RegExp(route),
            handler: handler,
        });
    }
}
