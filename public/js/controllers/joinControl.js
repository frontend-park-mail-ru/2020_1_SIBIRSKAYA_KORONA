import JoinModel from '../models/joinModel.js';
import JoinView from '../views/join/joinView.js';
import EventBus from '../libs/eventBus.js';

/**
 * Join(Register) controller
 */
export default class JoinController {
    /**
     * Controller constructor
     * @param {Object} router - for model to redirect on success registration
     */
    constructor(router) {
        this.eventBus = new EventBus([
            'submit',
            'userInput',
            'userInputError',
            'joinSuccess',
        ]);
        this.view = new JoinView(this.eventBus);
        this.model = new JoinModel(this.eventBus);

        this.eventBus.subscribe('joinSuccess', (userData) => {
            router.go('/profile');
        });
    }
}
