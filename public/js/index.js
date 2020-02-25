import Router from './libs/router.js';

import ProfileView from './views/profile/profileView.js';

import JoinController from './controllers/joinControl.js';
import LoginController from './controllers/loginControl.js';

const application = document.getElementById('application');


// const joinView = new JoinView(application);
// const loginView = new LoginView(application);
const profileView = new ProfileView(application);


const router = new Router(application);


const joinController = new JoinController(router);
const loginController = new LoginController(router);

router.setRoute('/login', loginController.view.render);
router.setRoute('/profile', profileView.render);
router.setRoute('/join', joinController.view.render);

router.go('/login',{});
