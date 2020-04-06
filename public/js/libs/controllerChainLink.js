/**
 * Map of chain link signals.
 * IMPORTANT: all signals from this library must be present in chain link event bus
 *
 * Signals for MULTIPLE chain links:
 * @property {string} closeLastChainLink - close only last link in chain excluding current link
 * @property {string} closeLastChainLinkOrSelf - close last link or current link if it doesn't have child link
 *
 * @property {string} closeAllChildChainLinks - close all link in chain excluding current link
 * @property {string} closeAllChildChainLinksAndSelf - close all link in chain including current link
 *
 * Signal for PARENT link
 * @property {string} childLinkWasClosed - (signal for parent link)
 * It means that child link was closed and reference to child must be cleared.
 * Usually you don't need to call this signal explicitly!
 *
 * Signal for CURRENT link
 * @property {string} closeCurrentLink - (signal for current link)
 * It means that current link must be closed.
 * Custom close function will be executed if it was set
 */
export const ChainLinkSignals = {
    // signals for chain manipulating
    closeLastChainLink: 'closeLastChild',
    closeLastChainLinkOrSelf: 'closeLastChildOrSelf',
    closeAllChildChainLinks: 'closeAllChildren',
    closeAllChildChainLinksAndSelf: 'closeAllChildrenAndSelf',

    // signal for parent chain link
    childLinkWasClosed: 'closedChild',

    // signal for current chain link
    closeCurrentLink: 'closeSelf',
};

/**
 * Checks if event bus has all of the necessary signals
 * @param {EventBus} eventBus - event bus to check
 */
const checkEventBusValidity = (eventBus) => {
    const chainLinkSignals = Object.values(ChainLinkSignals);
    const eventBusSignals = Array.from(eventBus.signalHandlers.keys());

    for (const chainLinkSignal of chainLinkSignals) {
        if (!eventBusSignals.includes(chainLinkSignal)) {
            console.log(`WARNING: child event bus doesn't have '${chainLinkSignal}' signal.`);
        }
    }
};


/**
 * This class is made to build chain of controllers.
 * It has signals for communication between chain links.
 * IMPORTANT: You can set custom close function which will be executed on close signal
 */
export default class ControllerChainLink {
    /**
     * Constructor of chain link
     * @param {EventBus} eventBus - event bus of current chain link
     * @param {EventBus} parentEventBus - event bus of parent chain link
     */
    constructor(eventBus, parentEventBus = null) {
        checkEventBusValidity(eventBus);

        this.eventBus = eventBus;
        this.parentEventBus = parentEventBus;
        this.childEventBus = null;
        this.customCloseFunction = null;

        // CLOSE LAST CHAIN LINK
        this.eventBus.subscribe(ChainLinkSignals.closeLastChainLink, () => {
            if (this.childEventBus !== null) {
                this.childEventBus.call(ChainLinkSignals.closeLastChainLinkOrSelf);
            }
        });

        // CLOSE LAST CHAIN LINK OR SELF
        this.eventBus.subscribe(ChainLinkSignals.closeLastChainLinkOrSelf, () => {
            if (this.childEventBus !== null) {
                this.childEventBus.call(ChainLinkSignals.closeLastChainLinkOrSelf);
            } else {
                this.eventBus.call(ChainLinkSignals.closeCurrentLink);
            }
        });

        // CLOSE ALL CHAIN LINK EXCEPT SELF
        this.eventBus.subscribe(ChainLinkSignals.closeAllChildChainLinks, () => {
            if (this.childEventBus !== null) {
                this.childEventBus.call(ChainLinkSignals.closeAllChildChainLinksAndSelf);
                this.childEventBus = null;
            }
        });

        // CLOSE ALL CHAIN LINK EXCEPT SELF
        this.eventBus.subscribe(ChainLinkSignals.closeAllChildChainLinksAndSelf, () => {
            if (this.childEventBus !== null) {
                this.childEventBus.call(ChainLinkSignals.closeAllChildChainLinksAndSelf);
            }

            this.eventBus.call(ChainLinkSignals.closeCurrentLink);
        });


        // SIGNAL FOR PARENT
        this.eventBus.subscribe(ChainLinkSignals.childLinkWasClosed, () => {
            this.childEventBus = null;
        });


        // SIGNAL FOR CURRENT LINK
        this.eventBus.subscribe(ChainLinkSignals.closeCurrentLink, (...args) => {
            if (this.customCloseFunction !== null) {
                this.customCloseFunction(...args);
            }

            if (this.parentEventBus !== null) {
                this.parentEventBus.call(ChainLinkSignals.childLinkWasClosed);
            }
        });
    }


    /**
     * Set child link of current link
     * @param {EventBus} childEventBus - event bus of child link
     */
    setChildEventBus(childEventBus) {
        checkEventBusValidity(childEventBus);
        this.childEventBus = childEventBus;
    }


    /**
     * Sets custom close function.
     * This function will be executed on 'ChainLinkSignals.closeCurrentLink' signal if set
     * @param {function} customCloseFunction - custom close function
     */
    setCustomCloseFunction(customCloseFunction) {
        this.customCloseFunction = customCloseFunction;
    }
}

