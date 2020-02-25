'use strict';

import JoinModel from '../models/join.js';
import JoinView from '../views/join/join.js';
import EventBus from '../../src/eventBus.js';


export default class JoinController {
    constructor(parent) {
        this.parent = parent;
        this.view = new JoinView(parent);
        this.model = new JoinModel();
        // TODO(Alexandr): ApiService to window

        this.view.render();

        this.eventBus = new EventBus(['submitData', 'submitDataOk', 'submitDataBad']);
        // TODO(Alexandr): possible context loss
        this.eventBus.subscribe('submitData', () => {
            const userData = this.view.getUserData();

            this.model.join(userData)
                .then(response => {
                    if (response['status'] === 308) {
                        this.eventBus.call('submitDataOk');
                    } else {
                        this.eventBus.call('submitDataBad');
                    }
                })
        });


        this.eventBus.subscribe('submitDataOk', () => {
            alert('SUCCESS (router should be called here)')
        });
        this.eventBus.subscribe('submitDataBad', this.view.onError.bind(this.view));


        // INPUT FIELD BEHAVIOR

        // SUBMIT BUTTON BEHAVIOR
        const submitButton = document.getElementById('submit_button');
        submitButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.eventBus.call('submitData');
        });


    }


}


