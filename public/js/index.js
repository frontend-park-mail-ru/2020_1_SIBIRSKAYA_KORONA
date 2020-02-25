import Router from './libs/router.js';
// import LoginView from './views/login/loginView.js';
// import ProfileView from './views/profile/profileView.js';
// import JoinView from './views/join/joinView.js';
import JoinController from './controllers/joinControl.js';

const application = document.getElementById('application');

// const joinView = new JoinView(application);
// const loginView = new LoginView(application);
// const profileView = new ProfileView(application);

const router = new Router(application);

const joinController = new JoinController();

// router.setRoute('/login', loginView.render);
// router.setRoute('/profile', profileView.render);
router.setRoute('/join', joinController.view.render);

router.go('/join');
