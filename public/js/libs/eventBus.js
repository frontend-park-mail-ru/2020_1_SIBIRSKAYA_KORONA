export default class EventBus {
    constructor(signals) {
        this.signalHandlers = new Map;

        for (const signal of signals) {
            this.signalHandlers.set(signal, null);
        }
    }

    subscribe(signal, handler) {
        if (this.signalHandlers.has(signal)) {
            if (!this.signalHandlers.get(signal)) {
                console.log(signal);
                this.signalHandlers.set(signal, handler);
            } else {
                console.log(`Signal ${signal} already bound`);
            }
        } else {
            console.log(`No such signal '${signal}' in event bus`);
        }
    }

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
