import {boardGet, getUsers, postMember} from '../libs/apiService.js';

/**
 * Board settings model
 */
export default class TaskSettingsModel {
    /**
     * Board settings model constructor
     * @param {Object} eventBus to share events with task settings view
     * @param {number} boardID - board id
     */
    constructor(eventBus, boardID) {
        this.eventBus = eventBus;

        this.boardId = boardID;

        this.eventBus.subscribe('getBoardSettings', this.getBoardSettings.bind(this));
        this.eventBus.subscribe('getUsers', this.searchUsers.bind(this));
        this.eventBus.subscribe('inviteUser', this.inviteUser.bind(this));
        // this.eventBus.subscribe('saveBoardSettings', this.saveBoardSettings.bind(this);
        // this.eventBus.subscribe('deleteBoard', this.deleteBoard.bind(this);
    }

    /**
     * Search users by nickname part
     * @param {String} nicknamePart - part of nickname for search user
     */
    async searchUsers(nicknamePart) {
        const limit = 5;
        const searchUsersResponse = await getUsers(this.boardId, nicknamePart, limit);
        switch (searchUsersResponse.status) {
            case 200:
                const users = await searchUsersResponse.json();
                this.eventBus.call('gotUsers', users.user);
                break;
            case 401:
                this.eventBus.call('unauthorized');
                break;
            case 400:
            case 403:
            case 500:
                this.eventBus.call('goToBoards');
                break;
            default:
                console.log('Бекендер молодец!!!');
                this.eventBus.call('goToBoards');
                break;
        }
    };

    /**
     * Invite user to board
     * @param {Number} userId
     * @param {String?} role - admin or member, default - 'member'
     */
    async inviteUser(userId, role = 'member') {
        const postMemberResponse = await postMember(this.boardId, userId);
        switch (postMemberResponse.status) {
            case 200:
                this.getBoardSettings();
                break;
            case 401:
                this.eventBus.call('unauthorized');
                break;
            case 400:
            case 403:
            case 500:
                this.eventBus.call('goToBoards');
                break;
            default:
                console.log('Бекендер молодец!!!');
                this.eventBus.call('goToBoards');
                break;
        }
    }

    /**
     * Returns board data
     */
    async getBoardSettings() {
        const boardResponse = await boardGet(this.boardId);
        switch (boardResponse.status) {
            case 200:
                const boardData = await boardResponse.json();
                this.eventBus.call('gotBoardSettings', boardData);
                break;
            case 401:
                this.eventBus.call('unauthorized');
                break;
            case 400:
            case 403:
            case 500:
                this.eventBus.call('goToBoards');
                break;
            default:
                console.log('Бекендер молодец!!!');
                this.eventBus.call('goToBoards');
                break;
        }
    }
};
