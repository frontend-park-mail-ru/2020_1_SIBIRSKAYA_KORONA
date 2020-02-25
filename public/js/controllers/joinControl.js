'use strict';

import JoinModel from '../models/joinModel.js';
import JoinView from '../views/join/joinView.js';
import EventBus from '../libs/eventBus.js';

export default class JoinController {
    constructor(router) {
        this.eventBus = new EventBus([
            'submit',
            'inputName',            'inputNameError',
            'inputSurname',         'inputSurnameError',
            'inputNickname',        'inputNicknameError',
            'inputPassword',        'inputPasswordError',
            'inputPasswordRepeat',  'inputPasswordRepeatError',
        ]);
        this.view = new JoinView(this.eventBus);
        this.model = new JoinModel(this.eventBus, router);

        /* this.view.render();
                  this.eventBus.subscribe('submitData', () => {
                    const userData = this.view.getUserData();

                    this.model.join(userData)
                        .then((response) => {
                            if (response['status'] === 308) {
                                this.eventBus.call('submitDataOk');
                            } else {
                                this.eventBus.call('submitDataBad');
                            }
                        });
                });

                this.eventBus.subscribe('submitDataOk', () => {
                    alert('SUCCESS (router should be called here)');
                });
                this.eventBus.subscribe('submitDataBad', this.view.onError.bind(this.view));

                // INPUT FIELD BEHAVIOR

                // SUBMIT BUTTON BEHAVIOR
                const submitButton = document.getElementById('submit_button');
                submitButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.eventBus.call('submitData');
                });
                */
    }
}
