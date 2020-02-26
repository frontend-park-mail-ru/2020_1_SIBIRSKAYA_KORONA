'use strict';

import ProfileModel from '../models/profileModel.js';
import ProfileView from '../views/profile/profileView.js';
import EventBus from '../libs/eventBus.js';

export default class LoginController {
    constructor(router) {
        this.eventBus = new EventBus([
            'submit1',
            'submit2',
            'submit3',
            'submit4',
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
            'inputPassword',
            'inputPasswordError',
            'inputPasswordRepeat',
            'inputPasswordRepeatError',
            'inputEmail',
            'inputEmailError',
        ]);
        this.view = new ProfileView(this.eventBus);
        this.model = new ProfileModel(this.eventBus, router);
    }
}
