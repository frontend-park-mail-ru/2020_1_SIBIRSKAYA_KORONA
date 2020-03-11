import Router from './libs/router.js';
import JoinController from './controllers/joinControl.js';
import LoginController from './controllers/loginControl.js';
import ProfileController from './controllers/profileControl.js';
import HeaderController from './controllers/headerControl.js';

document.addEventListener('DOMContentLoaded', () => {
    const application = document.getElementById('application');
    const header = document.getElementById('header');
    const router = new Router(application, header);


    const joinController = new JoinController(router);
    const loginController = new LoginController(router);
    const profileController = new ProfileController(router);
    const headerController = new HeaderController(router);

    router.setRoute('/', profileController.view.render);
    router.setRoute('/login', loginController.view.render);
    router.setRoute('/profile', profileController.view.render);
    router.setRoute('/join', joinController.view.render);

    headerController.view.render();
    router.go(window.location.pathname);
});
