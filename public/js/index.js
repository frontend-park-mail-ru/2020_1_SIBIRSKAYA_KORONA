import Router from "./libs/router.js";
import JoinView from './views/join/join.js'
import LoginView from './views/login/login.js'
import ProfileView from './views/profile/profile.js'

const application = document.getElementById('application');

const joinView = new JoinView(application);
const loginView = new LoginView(application);
const profileView = new ProfileView(application);

const router = new Router(application);


router.setRoute('/login', loginView.render);
router.setRoute('/join', joinView.render);
router.setRoute('/profile', profileView.render);

router.go('/login');
