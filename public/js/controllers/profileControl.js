import EventBus from '../libs/eventBus.js';
import ProfileModel from '../models/profileModel.js';
import ProfileView from '../views/profile/profileView.js';

/**
 * Profile controller
 */
export default class ProfileController {
    /**
     * Controller constructor
     * @param {Object} router - for model to redirect
     * @param {Object} globalEventBus - for subscribe on global events
     */
    constructor(router, globalEventBus) {
        this.eventBus = new EventBus([
            'submitAbout',
            'submitPasswords',
            'submitEmail',
            'submitImg',
            'getData',
            'gotData',
            'userInput',
            'userInputError',
            'wrongPassword',
            'unauthorized', // for global eventBus
            'userDataChanged', // for global eventBus
        ]);
        this.eventBus.subscribe('unauthorized', () => {
            router.go('/login');
            globalEventBus.call('logout');
        });
        this.eventBus.subscribe('userDataChanged', (newUserData) => {
            globalEventBus.call('userDataChanged', newUserData);
        });
        this.model = new ProfileModel(this.eventBus);
        this.view = new ProfileView(this.eventBus);
    }
}
