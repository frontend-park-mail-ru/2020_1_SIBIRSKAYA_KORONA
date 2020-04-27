import EventBus from '../libs/eventBus.js';
import LoginModel from '../models/loginModel.js';
import LoginView from '../views/login/loginView.js';

/**
 * Login controller
 */
export default class LoginController {
    /**
     * Controller constructor
     * @param {Object} router - for model to redirect on success login
     * @param {Object} globalEventBus - for trigger login global event
     */
    constructor(router, globalEventBus) {
        this.eventBus = new EventBus([
            'submit',
            'inputError',
            'loginSuccess',
        ]);
        this.view = new LoginView(this.eventBus);
        this.model = new LoginModel(this.eventBus);

        this.eventBus.subscribe('loginSuccess', (userData) => {
            router.go('/');
            globalEventBus.call('login');
        });
    }
}
