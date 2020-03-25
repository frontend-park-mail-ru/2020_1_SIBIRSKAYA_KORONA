/** EventBus is used for connecting signals to handlers */
export default class EventBus {
    /**
     * @description Creates event bus with passed signals
     * @param {string[]} signals - signals used by event bus
     */
    constructor(signals) {
        this.signalHandlers = new Map;

        for (const signal of signals) {
            this.signalHandlers.set(signal, null);
        }
    }

    /**
     * @description Add handler for signal
     * @param {string} signal - signal at which handler will be executed
     * @param {function} handler - function which will be called on signal
     */
    subscribe(signal, handler) {
        if (this.signalHandlers.has(signal)) {
            if (!this.signalHandlers.get(signal)) {
                this.signalHandlers.set(signal, handler);
            } else {
                console.log(`Signal ${signal} already bound`);
            }
        } else {
            console.log(`No such signal '${signal}' in event bus`);
        }
    }

    /**
     * @description Executes signal handler with passed arguments
     * @param {string} signal - signal at which handler will be executed
     * @param {...*} args - arguments which will be passed to handler
     */
    call(signal, ...args) {
        if (this.signalHandlers.has(signal)) {
            if (this.signalHandlers.get(signal)) {
                this.signalHandlers.get(signal)(...args);
            } else {
                console.log('No handler for signal '+ signal);
            }
        } else {
            console.log(`No such signal '${signal}' in event bus`);
        }
    }
}
