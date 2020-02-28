import JoinModel from '../models/joinModel.js';
import JoinView from '../views/join/joinView.js';
import EventBus from '../libs/eventBus.js';

export default class JoinController {
    constructor(router) {
        this.eventBus = new EventBus([
            'submit',
            'userInput',
            'userInputError',
            'routeToProfile',
        ]);
        this.eventBus.subscribe('routeToProfile', router.go('/profile'));
        this.view = new JoinView(this.eventBus);
        this.model = new JoinModel(this.eventBus);



    }
}
