import LoginModel from '../models/loginModel.js';
import LoginView from '../views/login/loginView.js';
import EventBus from '../libs/eventBus.js';

/**
 * Login controller
 */
export default class LoginController {
    /**
     * Controller constructor
     * @param {Object} router - for model to redirect on success login
     */
    constructor(router) {
        this.eventBus = new EventBus([
            'submit',
            'inputError',
            'loginSuccess',
        ]);
        this.view = new LoginView(this.eventBus);
        this.model = new LoginModel(this.eventBus);

        this.eventBus.subscribe('loginSuccess', (userData) => {
            router.go('/profile');
        });
    }
}
