import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import '../css/sass/base.sass';
import BoardController from './controllers/boardControl.js';
import BoardsController from './controllers/boardsControl.js';
import HeaderController from './controllers/headerControl.js';
import JoinController from './controllers/joinControl.js';
import LoginController from './controllers/loginControl.js';
import ProfileController from './controllers/profileControl.js';
import EventBus from './libs/eventBus.js';
import Router from './libs/router.js';
import Notifications from './notifications/notifications.js';

document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) {
        runtime.register().then((reg) => {
            if (reg.installing) {
                console.log('Service worker installing');
            } else if (reg.waiting) {
                console.log('Service worker installed');
            } else if (reg.active) {
                console.log('Service worker active');
            }
        }).catch((error) => {
            console.log('Registration failed with ' + error);
        });
    }

    const root = document.getElementById('root');
    const router = new Router(root);

    const globalEventBus = new EventBus([
        'logout',
        'login',
        'userDataChanged',
        'enableNotifications',
    ]);

    const headerController = new HeaderController(router, globalEventBus);
    const profileController = new ProfileController(router, globalEventBus);
    const joinController = new JoinController(router, globalEventBus);
    const loginController = new LoginController(router, globalEventBus);
    const boardsController = new BoardsController(router);
    const boardController = new BoardController(router);
    const notifications = new Notifications(globalEventBus);

    router.setRoute('^/$', boardsController.view.render);
    router.setRoute('^/join/?$', joinController.view.render);
    router.setRoute('^/login/?$', loginController.view.render);
    router.setRoute('^/boards/?$', boardsController.view.render);
    router.setRoute('^/profile/?$', profileController.view.render);
    router.setRoute('^/boards/(?<boardId>\\d+)/?$', boardController.view.render);
    router.setRoute('^/boards/(?<boardId>\\d+)/settings/?$', boardController.triggerBoardSettingsAndBoard);
    router.setRoute('^/boards/(?<boardId>\\d+)/columns/(?<columnId>\\d+)/tasks/(?<taskId>\\d+)/?$',
        boardController.triggerTaskAndBoard);
    router.setRoute('^/invite/(?<inviteHash>\\w*)/?$', boardController.handleInvite);

    notifications.enableNotifications(true);

    headerController.view.render({});
    router.go(window.location.pathname);
});
