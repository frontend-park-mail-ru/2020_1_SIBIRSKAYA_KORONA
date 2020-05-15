import {boardDelete, boardGet, boardInviteLinkPost, boardPut, postMember, usersGet} from '../libs/apiService.js';
import responseSwitchBuilder from '../libs/responseSwitchBuilder.js';

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

        this.getBoardSettings = this.getBoardSettings.bind(this);

        this.eventBus.subscribe('getBoardSettings', this.getBoardSettings);
        this.eventBus.subscribe('getUsers', this.searchUsers.bind(this));
        this.eventBus.subscribe('inviteUser', this.inviteUser.bind(this));
        this.eventBus.subscribe('updateInviteLink', this.updateInviteLink.bind(this));
        this.eventBus.subscribe('saveBoard', this.saveBoard.bind(this));
        this.eventBus.subscribe('deleteBoard', this.deleteBoard.bind(this));

        const errorResponseStatusMap = new Map([
            [401, () => this.eventBus.call('unauthorized')],
            [400, () => this.eventBus.call('goToBoards')],
            [403, () => alert('Недостаточно прав!')],
            [500, () => this.eventBus.call('goToBoards')],
            ['default', () => this.eventBus.call('goToBoards')],
        ]);

        this.handleResponseStatus = responseSwitchBuilder(errorResponseStatusMap).bind(this);
    }

    /**
     * Search users by nickname part
     * @param {String} nicknamePart - part of nickname for search user
     */
    async searchUsers(nicknamePart) {
        const limit = 5;
        const searchUsersResponse = await usersGet(this.boardId, nicknamePart, limit);
        this.handleResponseStatus(searchUsersResponse, (body) => this.eventBus.call('gotUsers', body));
    };

    /**
     * Invite user to board
     * @param {Number} userId
     * @param {String?} role - admin or member, default - 'member'
     */
    async inviteUser(userId, role = 'member') {
        const postMemberResponse = await postMember(this.boardId, userId);
        this.handleResponseStatus(postMemberResponse, this.getBoardSettings);
    }


    /**
     * Update board data
     * @param {Object} newData - {title}
     * @return {Promise<void>}
     */
    async saveBoard(newData) {
        const response = await boardPut(this.boardId, newData);
        this.handleResponseStatus(response, this.getBoardSettings);
    }

    /**
     * Delete board method
     */
    async deleteBoard() {
        const response = await boardDelete(this.boardId);
        this.handleResponseStatus(response, () => this.eventBus.call('goToBoards'));
    }

    /**
     * Returns board data
     */
    async getBoardSettings() {
        const boardResponse = await boardGet(this.boardId);
        this.handleResponseStatus(boardResponse, (body) => {
            body.inviteLink = window.location.host + '/invite/' + body.invateLink;
            delete body.invateLink;
            this.eventBus.call('gotBoardSettings', body);
        });
    }

    /**
     * Generate new invite link
     */
    async updateInviteLink() {
        const response = await boardInviteLinkPost(this.boardId);
        this.handleResponseStatus(response, () => this.getBoardSettings());
    }
};
