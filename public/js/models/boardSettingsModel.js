import {
    boardDelete,
    boardGet,
    boardInviteLinkPost,
    boardPut,
    postMember,
    deleteMember,
    usersGet,
    settingsGet,
} from '../libs/apiService.js';
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
        this.eventBus.subscribe('deleteMember', this.deleteMember.bind(this));

        const errorResponseStatusMap = new Map([
            [400, () => {}],
            [401, () => this.eventBus.call('unauthorized')],
            [403, () => console.log('Недостаточно прав!')],
            [404, () => {}],
            [500, () => {}],
            ['default', () => {}],
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
     * Delete member from board
     * @param {Number} userID - removes member from board
     * @return {Promise<void>}
     */
    async deleteMember(userID) {
        const response = await deleteMember(this.boardId, userID);
        this.handleResponseStatus(response, () => this.eventBus.call('deletedMember', userID));
    }

    /**
     * Returns board data
     */
    async getBoardSettings() {
        let currentUserInfo = {};

        const currentUserResponse = await settingsGet();
        this.handleResponseStatus(currentUserResponse, (body) => {
            currentUserInfo = body;
        });

        const boardResponse = await boardGet(this.boardId);
        this.handleResponseStatus(boardResponse, (body) => {
            body.isAdmin = false;
            for (const admin of body.admins) {
                if (admin?.id === currentUserInfo.id) {
                    body.isAdmin = true;
                    break;
                }
            }

            body.inviteLink = 'https://' + window.location.host + '/invite/' + body.inviteLink;
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
