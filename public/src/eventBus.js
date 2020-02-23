class EventBus {
    constructor(signals) {
        this.signalHandlers = new Map;

        for (let s of signals) {
            this.signalHandlers.set(s, null)
        }
    }

    subscribe(signal, handler) {
        if (this.signalHandlers.has(signal)) {
            const currHandler = this.signalHandlers[signal];

            if (currHandler == null) {
                this.signalHandlers[signal] = handler;
            } else {
                console.log(`Signal ${signal} already bound`);
            }

        } else {
            console.log(`No such signal '${signal}' in event bus`);
        }
    }


    call(signal) {
        if (this.signalHandlers.has(signal)) {
            this.signalHandlers[signal]()
        } else {
            console.log(`No such signal '${signal}' in event bus`);
        }
    }


}