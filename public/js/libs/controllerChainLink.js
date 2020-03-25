/**
 * Map of chain link signals. IMPORTANT: only 'closeCurrentLink' may be used outside library!!!
 * IMPORTANT: all signals from this library must be inside chain link event bus
 *
 * @property {string} closeLastChainLink - close only last link in chain excluding current link
 * @property {string} closeLastChainLinkOrSelf - close last link or current link if it doesn't have child link
 *
 * @property {string} closeAllChildChainLinks - close all link in chain excluding current link
 * @property {string} closeAllChildChainLinksAndSelf - close all link in chain including current link
 *
 * @property {string} childLinkWasClosed - means that child link was closed and reference to child must be cleared
 * @property {string} preCloseCurrentLink - used to pass 'childLinkWasClosed' signal to parent
 * right before closing current link
 *
 * @property {string} closeCurrentLink - means that current link must be closed
 */
export const ChainLinkSignals = {
    closeLastChainLink: 'closeLastChild',
    closeLastChainLinkOrSelf: 'closeLastChildOrSelf',

    closeAllChildChainLinks: 'closeAllChildren',
    closeAllChildChainLinksAndSelf: 'closeAllChildrenAndSelf',

    childLinkWasClosed: 'closedChild',
    preCloseCurrentLink: 'preCloseSelf',

    // IMPORTANT: this is the only signal from this library that may be used by developer in his link event bus
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
 */
export default class ControllerChainLink {
    /**
     * Constructor of chain link
     * @param {EventBus} eventBus - event bus of current chain link
     * @param {EventBus} parentEventBus - event bus of parent chain link
     */
    constructor(eventBus, parentEventBus = null) {
        this.eventBus = eventBus;
        this.parentEventBus = parentEventBus;
        this.childEventBus = null;

        this.eventBus.subscribe(ChainLinkSignals.closeLastChainLink, () => {
            if (this.childEventBus !== null) {
                this.childEventBus.call(ChainLinkSignals.closeLastChainLinkOrSelf);
            }
        });


        this.eventBus.subscribe(ChainLinkSignals.closeLastChainLinkOrSelf, () => {
            if (this.childEventBus !== null) {
                this.childEventBus.call(ChainLinkSignals.closeLastChainLinkOrSelf);
            } else {
                this.eventBus.call(ChainLinkSignals.preCloseCurrentLink);
            }
        });


        this.eventBus.subscribe(ChainLinkSignals.closeAllChildChainLinks, () => {
            if (this.childEventBus !== null) {
                this.childEventBus.call(ChainLinkSignals.closeAllChildChainLinksAndSelf);
                this.childEventBus = null;
            }
        });


        this.eventBus.subscribe(ChainLinkSignals.closeAllChildChainLinksAndSelf, () => {
            if (this.childEventBus !== null) {
                this.childEventBus.call(ChainLinkSignals.closeAllChildChainLinksAndSelf);
            }

            this.eventBus.call(ChainLinkSignals.preCloseCurrentLink);
        });


        this.eventBus.subscribe(ChainLinkSignals.childLinkWasClosed, () => {
            this.childEventBus = null;
        });


        this.eventBus.subscribe(ChainLinkSignals.preCloseCurrentLink, () => {
            if (this.parentEventBus !== null) {
                this.parentEventBus.call(ChainLinkSignals.childLinkWasClosed);
            }

            this.eventBus.call(ChainLinkSignals.closeCurrentLink);
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
}

