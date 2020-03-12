import EventBus from './eventBus.js';

/**
 * Application router
 * Contains global event bus
 */
export default class Router {
    /**
     * Router constructor
     * @param {object} root - application's root element
     * @param {object} header - application's header element
     */
    constructor(root, header) {
        this.root = root;
        this.header = header;
        this.routeMap = new Map();

        this.globalEventBus = new EventBus([
            'logout',
            'login',
            'userDataChanged',
        ]);
        this.handleMouseClick = this.handleMouseClick.bind(this);

        this.root.addEventListener('click', this.handleMouseClick);
        this.header.addEventListener('click', this.handleMouseClick);
    }

    /**
     * Switch current route
     * @param {string} route - route to go
     * @param {...any} params - arguments to call with
     */
    go(route, ...params) {
        // window.location.pathname = route;
        window.history.pushState({}, '', route);

        console.log(route);
        if (this.routeMap.has(route)) {
            this.routeMap.get(route)(...params);
        } else {
            this.root.innerText = 'PAGE NOT FOUND';
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
