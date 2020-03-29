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
     * @param {object?} params - arguments to call with
     */
    go(route, params) {
        if (this.routeMap.has(route)) {
            let dataToCallWith;
            let url = route;
            if (params) {
                switch (route) {
                    case '/board':
                        if (params.id && Number.isInteger(params.id)) {
                            dataToCallWith = params.id;
                            url = '/board/' + params.id;
                        }
                        break;
                    case '/task':
                        break;
                    default:
                        document.getElementById('application').innerHTML = 'PAGE NOT FOUND';
                        return;
                }
            }
            window.history.pushState({}, '', url);
            this.routeMap.get(route)(dataToCallWith);
        } else {
            console.log('ZALUPA');
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
