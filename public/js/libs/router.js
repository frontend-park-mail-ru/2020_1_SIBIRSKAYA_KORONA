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
        this.routes = [];
        root.addEventListener('click', this.handleMouseClick.bind(this));
        window.addEventListener('popstate', (event) => {
            const currentPath = window.location.pathname;
            console.log('pOPSTATE');
            this.go(currentPath, false);
        });
    }

    /**
     * Switch current route
     * @param {string} URL - URL to go
     * @param {boolean?} pushState - Need to push state or not.
     * No pushState is necessary when user go back in history. Default set to true.
     */
    go(URL, pushState = true) {
        const oldURL = window.history.state?.url;

        if ((/^\/login\/?$/.test(URL) || /^\/join\/?$/.test(URL)) &&
            (!/^\/login\/?$/.test(oldURL) && !/^\/join\/?$/.test(oldURL)) &&
            !this.redirectUlrAfterAuthUrl) {
            this.redirectUlrAfterAuthUrl = oldURL;
        }

        let routeNotFound = true;
        for (const route of this.routes) {
            if (route.regExp.test(URL)) {
                const parsedURL = route.regExp.exec(URL);
                route.handler(parsedURL.groups);
                routeNotFound = false;
                break;
            }
        }
        if (routeNotFound) {
            document.getElementById('application').innerHTML = 'PAGE NOT FOUND';
        }
        if (pushState && URL !== oldURL) {
            window.history.pushState({url: URL}, '', URL);
        } else {
            document.querySelector('#popup-block').innerHTML = '';
            document.querySelector('#popover-block').innerHTML = '';
        }
    }

    /**
     * Go back in history
     */
    goBack() {
        window.history.back();
    }

    /**
     * Redirects after auth
     */
    redirectAfterAuth() {
        if (this.redirectUlrAfterAuthUrl) {
            this.go(this.redirectUlrAfterAuthUrl);
            this.redirectUlrAfterAuthUrl = null;
        } else {
            this.go('/');
        }
    }

    /**
     * Click handler
     * @param {Object} event - mouse event
     */
    handleMouseClick(event) {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            this.go(event.target.pathname);
        } else if (event.target.parentElement && event.target.parentElement.tagName === 'A') {
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
