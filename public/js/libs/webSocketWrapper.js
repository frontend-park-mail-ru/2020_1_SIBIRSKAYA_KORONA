const WEBSOCKET_URL = `wss://${IP_ADDRESS}:8080/ws`;

/**
 * Class for work with socket, exports as instance
 */
class WebSocketWrapper {
    /**
     * @param {String} webSocketURL - connection url
     */
    constructor(webSocketURL) {
        this.url = webSocketURL;
        this.connected = false;
        this.messageSubscribers = [];
        this.closeSubscribers = [];
        this.errorSubscribers = [];
    }

    /**
     * Connect method, opens socket if it isn`t opened
     */
    connect() {
        if (this.connected) {
            return;
        }
        console.log('Try to connect');
        this.socket = new WebSocket(this.url);
        this.socket.onopen = (event) => {
            console.log('Socket connected');
            this.connected = true;
        };
        this.socket.onmessage = (event) => {
            this.messageSubscribers.forEach((handler) => {
                console.log('messageSubscriber');
                handler(event);
            });
        };
        this.socket.onclose = (event) => {
            console.log('Socket disconnected by backend');
            this.connected = false;
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
        console.log('Socket disconnected');
        this.socket.close();
    }

    /**
     * Subscribes on event with handler
     * @param {String} eventType - websocket events
     * @param {Function} handler - event handler
     */
    subscribe(eventType, handler) {
        switch (eventType) {
            case 'message':
                this.messageSubscribers.push(handler);
                break;
            case 'close':
                this.closeSubscribers.push(handler);
                break;
            case 'error':
                this.errorSubscribers.push(handler);
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
     * @return {Object} {connected: bool, connect: function, subscribe: function, send: function}
     */
    getInstance() {
        return {
            connected: this.connected,
            connect: this.connect.bind(this),
            subscribe: this.subscribe.bind(this),
            send: this.send.bind(this),
        };
    }
}

const socket = new WebSocketWrapper(WEBSOCKET_URL);
export default socket.getInstance();
