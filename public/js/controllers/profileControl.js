import ProfileModel from '../models/profileModel.js';
import ProfileView from '../views/profile/profileView.js';
import EventBus from '../libs/eventBus.js';

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
            'invalidCookie', // for global eventBus
            'userDataChanged', // for global eventBus
        ]);
        this.eventBus.subscribe('invalidCookie', () => {
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
