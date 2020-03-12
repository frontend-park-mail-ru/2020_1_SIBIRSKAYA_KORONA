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
     */
    constructor(router) {
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
            'unauthorized',
            'userDataChanged', // for global eventBus
        ]);
        this.eventBus.subscribe('unauthorized', () => {
            router.go('/login');
            router.globalEventBus.call('logout');
        });
        this.eventBus.subscribe('userDataChanged', (newUserData) => {
            router.globalEventBus.call('userDataChanged', newUserData);
        });
        this.model = new ProfileModel(this.eventBus);
        this.view = new ProfileView(this.eventBus);
    }
}
