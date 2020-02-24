import JoinView from './views/join/join.js'
import LoginView from './views/login/login.js'
import ProfileView from './views/profile/profile.js'

const application = document.getElementById('application');

const joinView = new JoinView(application);
const loginView = new LoginView(application);
const profileView = new ProfileView(application);

const user = {
    name : 'Вася Пупкин',
    initials : 'ВП',
    nickname : 'Uasesapupa',
    avatar : 'img/default_avatar.png',
    email : 'pupkin@mail.ru'
};

profileView.render(user);
