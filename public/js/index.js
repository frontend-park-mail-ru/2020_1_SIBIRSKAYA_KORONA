// import JoinView from './views/join/join.js';
// import LoginView from './views/login/login.js';
import ProfileView from './views/profile/profile.js';
import ApiService from "./libs/apiService.js";

const application = document.getElementById('application');

// const joinView = new JoinView(application);
// const loginView = new LoginView(application);
const profileView = new ProfileView(application);

const user = {
    name: 'Вася Пупкин',
    initials: 'ВП',
    nickname: 'Uasesapupa',
    avatar: 'img/default_avatar.png',
    email: 'pupkin@mail.ru',
};

// profileView.render(user);
const api = new ApiService('http://localhost:8080/');

const submitButton = document.getElementById('submit_button');
const fileField = document.getElementById('myfile');

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const file = fileField.files[0];
    console.log(file);


    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('name', file.name);

    api.sendFile(formData)
        .then(res => console.log(res));
});