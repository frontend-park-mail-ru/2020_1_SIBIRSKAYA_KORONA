// import JoinView from './views/join/join.js';
// import LoginView from './views/login/login.js';
import ProfileView from './views/profile/profile.js';
import ApiService from "./libs/apiService.js";

const application = document.getElementById('application');

// const joinView = new JoinView(application);
// const loginView = new LoginView(application);
const profileView = new ProfileView(application);

// profileView.render(user);
const api = new ApiService('http://localhost:8080/');

const submitButton = document.getElementById('submit_button');

const avatarField = document.getElementById('avatar');
const nameInput = document.getElementById('newName');
const surnameInput = document.getElementById('newSurname');
const nicknameInput = document.getElementById('newNickname');
const emailInput = document.getElementById('newEmail');
const newPasswordInput = document.getElementById('newPassword');
const oldPasswordInput = document.getElementById('oldPassword');

const user = {
    name: "kek",
    nickname: "kek",
    surname: "kek",
    password: "kek",
    email: "kek@kek.ru",
};

api.join(user)
    .then(res => {
        console.log('Результат регистрации')
        console.log(res)
    })

    .then(() => api.login(user))
    .then(res => {
        console.log('Результат авторизации')
        console.log(res)
    })

    .then(() => api.getUser(user))
    .then(res => {
        console.log('Результат получения профиля')
        console.log(res)
    })


submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const avatar = avatarField.files[0];
    console.log(avatar);

    const formData = new FormData();
    formData.append('newName', nameInput.value);
    formData.append('newSurname', surnameInput.value);
    formData.append('newNickname', nicknameInput.value);
    formData.append('newEmail', emailInput.value);
    formData.append('newPassword', newPasswordInput.value);
    formData.append('oldPassword', oldPasswordInput.value);

    formData.append('avatar', avatar);
    formData.append('avatarName', avatar.name);


    api.putUser(formData)
        .then(res => res.text())
        .then(res=>console.log(res))

        .then(() => api.getUser(user))
        .then(res => {
            console.log('Результат получения профиля');
            console.log(res)
        })
    
});
