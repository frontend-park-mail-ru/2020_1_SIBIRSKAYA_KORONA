'use strict';

import ProfileModel from '../models/profileModel.js';
import ProfileView from '../views/profile/profileView.js';
import EventBus from '../libs/eventBus.js';

export default class LoginController {
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
        ]);
        this.model = new ProfileModel(this.eventBus, router);
        this.view = new ProfileView(this.eventBus);
    }
}
