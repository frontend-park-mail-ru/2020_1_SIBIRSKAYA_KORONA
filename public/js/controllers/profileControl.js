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
            'inputName',
            'inputNameError',
            'inputSurname',
            'inputSurnameError',
            'inputOldPassword',
            'inputOldPasswordError',
            'inputPassword',
            'inputPasswordError',
            'inputPasswordRepeat',
            'inputPasswordRepeatError',
            'inputEmail',
            'inputEmailError',
        ]);
        this.model = new ProfileModel(this.eventBus, router);
        this.view = new ProfileView(this.eventBus);
    }
}
