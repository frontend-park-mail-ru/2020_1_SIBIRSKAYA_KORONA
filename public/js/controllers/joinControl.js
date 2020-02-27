'use strict';

import JoinModel from '../models/joinModel.js';
import JoinView from '../views/join/joinView.js';
import EventBus from '../libs/eventBus.js';

export default class JoinController {
    constructor(router) {
        this.eventBus = new EventBus([
            'submit',
            'inputName',
            'inputNameError',
            'inputSurname',
            'inputSurnameError',
            'inputNickname',
            'inputNicknameError',
            'inputPassword',
            'inputPasswordError',
            'inputPasswordRepeat',
            'inputPasswordRepeatError',

            'userInput',
            'userInputError',

        ]);
        this.view = new JoinView(this.eventBus);
        this.model = new JoinModel(this.eventBus, router);
    }
}
