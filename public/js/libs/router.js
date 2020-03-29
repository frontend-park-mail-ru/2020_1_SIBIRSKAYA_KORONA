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
        this.routes.push({
            regExp: new RegExp(route),
            handler: handler,
        });
    }
}
