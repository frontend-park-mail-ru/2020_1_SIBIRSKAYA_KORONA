const WEBSOCKET_URL = `wss://${IP_ADDRESS}/api/ws`;

/**
 * Class for work with socket, exports as instance
 */
class WebSocketWrapper {
    /**
     * @param {String} webSocketURL - connection url
     */
    constructor(webSocketURL) {
        this.url = webSocketURL;
        this.messageSubscribers = new Set();
        this.closeSubscribers = new Set();
        this.errorSubscribers = new Set();
    }

    /**
     * Connect method, opens socket if it isn`t opened
     */
    connect() {
        console.log('Try to connect');
        const connectionState = this.socket?.readyState;
        if (connectionState === WebSocket.OPEN || connectionState === WebSocket.CONNECTING) {
            console.log('Already connected');
            return;
        }
        this.socket = new WebSocket(this.url);
        this.socket.onopen = (event) => {
            console.log('Socket connected');
        };
        this.socket.onmessage = (event) => {
            this.messageSubscribers.forEach((handler) => {
                handler(event);
            });
        };
        this.socket.onclose = (event) => {
            console.log('Socket closed');
            this.closeSubscribers.forEach((handler) => {
                handler(event);
            });
        };
        this.socket.onerror = (event) => {
            this.errorSubscribers.forEach((handler) => {
                handler(event);
            });
        };
    }

    /**
     * Close socket
     */
    disconnect() {
        console.log('Try to close socket');
        const connectionState = this.socket?.readyState;
        if (connectionState === WebSocket.CLOSED || connectionState === WebSocket.CLOSING) {
            console.log('Already closed');
            return;
        }
        this.socket.close();
    }

    /**
     * Subscribes on event with handler
     * Handlers are stored in set, and double subscribe with one handler is impossible
     * @param {String} eventType - websocket events
     * @param {Function} handler - event handler
     */
    subscribe(eventType, handler) {
        switch (eventType) {
            case 'message':
                this.messageSubscribers.add(handler);
                break;
            case 'close':
                this.closeSubscribers.add(handler);
                break;
            case 'error':
                this.errorSubscribers.add(handler);
                break;
            default:
                break;
        }
    }

    /**
     * Stringifies data and sends
     * @param {Object} dataObject - data to send
     */
    send(dataObject) {
        this.socket.send(JSON.stringify(dataObject));
    }

    /**
     * Returns instance with encapsulated private data
     * @return {Object} {connect: function, subscribe: function, send: function}
     */
    getInstance() {
        return {
            connect: this.connect.bind(this),
            disconnect: this.disconnect.bind(this),
            subscribe: this.subscribe.bind(this),
            send: this.send.bind(this),
        };
    }
}

const socket = new WebSocketWrapper(WEBSOCKET_URL);
export default socket.getInstance();
