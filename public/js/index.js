import Router from './libs/router.js';

import ProfileView from './views/profile/profileView.js';

import JoinController from './controllers/joinControl.js';
import LoginController from './controllers/loginControl.js';
import ProfileController from './controllers/profileControl.js';

const application = document.getElementById('application');

const router = new Router(application);

const joinController = new JoinController(router);
const loginController = new LoginController(router);
const profileController = new ProfileController(router);

router.setRoute('/', loginController.view.render);
router.setRoute('/login', loginController.view.render);
router.setRoute('/profile', profileController.view.render);
router.setRoute('/join', joinController.view.render);

router.go(window.location.pathname,{});
