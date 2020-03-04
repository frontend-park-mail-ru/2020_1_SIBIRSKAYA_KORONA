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
            'logout',
            'getData',
            'gotData',
            'userInput',
            'userInputError',
            'wrongPassword',
        ]);
        this.model = new ProfileModel(this.eventBus, router);
        this.view = new ProfileView(this.eventBus);
    }
}
