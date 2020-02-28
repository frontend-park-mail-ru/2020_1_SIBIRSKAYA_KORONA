import LoginModel from '../models/loginModel.js';
import LoginView from '../views/login/loginView.js';
import EventBus from '../libs/eventBus.js';

export default class LoginController {
    constructor(router) {
        this.eventBus = new EventBus([
            'submit',
            'inputError',
        ]);
        this.view = new LoginView(this.eventBus);
        this.model = new LoginModel(this.eventBus, router);
    }
}
