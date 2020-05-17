import {
    boardGet,
    taskAssignDelete,
    taskAssignPost,
    taskChecklistDelete,
    taskChecklistGet,
    taskChecklistItemPost,
    taskChecklistItemPut,
    taskChecklistPost,
    taskCommentsDelete,
    taskCommentsGet,
    taskCommentsPost,
    taskDelete,
    taskFileDelete,
    taskFilesGet,
    taskFilesPost,
    taskGet,
    taskPut,
} from '../libs/apiService.js';
import parseDate from '../libs/dateParser.js';
import responseSwitchBuilder from '../libs/responseSwitchBuilder.js';
import webSocket from '../libs/webSocketWrapper.js';


/**
 * Task settings model
 */
export default class TaskSettingsModel {
    /**
     * Task settings model constructor
     * @param {Object} eventBus to share events with task settings view
     * @param {Object} taskData - information about current task
     */
    constructor(eventBus, taskData) {
        this.eventBus = eventBus;
        this.taskData = taskData;

        this.eventBus.subscribe('getTaskSettings', this.getTaskSettings.bind(this));
        this.eventBus.subscribe('getTaskAssigns', this.getTaskAssign.bind(this));
        this.eventBus.subscribe('saveTaskSettings', this.saveTaskSettings.bind(this));
        this.eventBus.subscribe('deleteTask', this.deleteTask.bind(this));
        this.eventBus.subscribe('addComment', this.addTaskComment.bind(this));
        this.eventBus.subscribe('deleteComment', this.deleteTaskComment.bind(this));
        this.eventBus.subscribe('addChecklist', this.addChecklist.bind(this));
        this.eventBus.subscribe('deleteChecklist', this.deleteChecklist.bind(this));
        this.eventBus.subscribe('addChecklistItem', this.addChecklistItem.bind(this));
        this.eventBus.subscribe('updateChecklistItem', this.updateChecklistItem.bind(this));
        this.eventBus.subscribe('updateAssign', this.updateAssign.bind(this));
        this.eventBus.subscribe('uploadAttach', this.uploadAttach.bind(this));
        this.eventBus.subscribe('deleteAttach', this.deleteAttach.bind(this));

        this.socket = webSocket;
        this.socket.subscribe('message', this.liveUpdateHandler.bind(this));

        const errorResponseStatusMap = new Map([
            [401, () => this.eventBus.call('unauthorized')],
            [400, () => this.eventBus.call('goToBoards')],
            [403, () => this.eventBus.call('goToBoards')],
            [500, () => this.eventBus.call('goToBoards')],
            ['default', () => this.eventBus.call('goToBoards')],
        ]);
        this.handleResponseStatus = responseSwitchBuilder(errorResponseStatusMap).bind(this);
    }

    /**
     * Add comment to task
     * @param {String} commentText
     */
    async addTaskComment(commentText) {
        const response = await taskCommentsPost(this.taskData, commentText);
        this.handleResponseStatus(response, () => this.getTaskSettings());
    }

    /**
     * Delete task comment
     * @param {Number} commentID
     */
    async deleteTaskComment(commentID) {
        const response = await taskCommentsDelete(this.taskData, commentID);
        this.handleResponseStatus(response, () => this.getTaskSettings());
    }

    /**
     * Add new checklist
     * @param {String} checklistName
     */
    async addChecklist(checklistName) {
        const response = await taskChecklistPost(this.taskData, checklistName);
        this.handleResponseStatus(response, () => this.getTaskSettings());
    }

    /**
     * Delete checklist from task
     * @param {Number} checklistID
     */
    async deleteChecklist(checklistID) {
        const response = await taskChecklistDelete(this.taskData, checklistID);
        this.handleResponseStatus(response, () => this.getTaskSettings());
    }

    /**
     * Add new item in checklist
     * @param {Object} itemData
     */
    async addChecklistItem(itemData) {
        const response = await taskChecklistItemPost(this.taskData, itemData);
        this.handleResponseStatus(response, () => this.getTaskSettings());
    }

    /**
     * Update item value
     * @param {Number} checklistId
     * @param {Object} itemData
     */
    async updateChecklistItem(checklistId, itemData) {
        const response = await taskChecklistItemPut(this.taskData, checklistId, itemData);
        this.handleResponseStatus(response);
    }

    /**
     * Returns task information
     */
    async getTaskSettings() {
        let taskData;
        const taskResponse = await taskGet(this.taskData);
        if (!(await this.handleResponseStatus(taskResponse, (body) => taskData = body))) {
            return;
        }
        if (!taskData.labels) {
            taskData.labels = [];
        }

        const checklistResponse = await taskChecklistGet(this.taskData);
        if (!(await this.handleResponseStatus(checklistResponse, (body) => taskData.checklists = body))) {
            return;
        }

        for (const checklist of taskData.checklists) {
            if (checklist.items) {
                let itemsDone = 0;
                checklist.items.forEach((item) => {
                    if (item.done) {
                        itemsDone++;
                    }
                });
                checklist.progress = Math.floor(itemsDone / checklist.items.length * 100) || 0;
                checklist.progressColor = (checklist.progress < 33) ? '#eb5a46' :
                    (checklist.progress < 66) ? '#f2d600' : '#61bd4f';
            } else {
                checklist.items = [];
            }
        }

        const commentsResponse = await taskCommentsGet(this.taskData);
        if (!(await this.handleResponseStatus(commentsResponse, (body) => {
            taskData.comments = new Array(body.length);
            body.forEach((comment, i) => {
                const dateString = parseDate(comment.createdAt);
                taskData.comments[i] = {
                    id: comment.id,
                    text: comment.text,
                    date: dateString,
                    avatar: comment.avatar || '/img/default_avatar.png',
                    nickname: comment.nickname || 'vasYa_pupKin',
                    deletable: comment.readerIsAuthor,
                };
            });
        }))) {
            return;
        }

        const filesResponse = await taskFilesGet(this.taskData);
        if (!(await this.handleResponseStatus(filesResponse, (body) => {
            taskData.files = body;
        }))) {
            return;
        }

        // this.taskData = Object.assign(this.taskData, taskData);
        this.eventBus.call('gotTaskSettings', taskData);
    }

    /**
     * Returns board members with assigned to task flag;
     */
    async getTaskAssign() {
        let boardMembers;
        const boardResponse = await boardGet(this.taskData.boardID);
        if (!(await this.handleResponseStatus(boardResponse, (body) => {
            boardMembers = [...(body.members || []), ...(body.admins || [])];
        }))) {
            return;
        }

        let assignedMembers;
        const assignsResponse = await taskGet(this.taskData);
        if (!(await this.handleResponseStatus(assignsResponse, (body) => {
            assignedMembers = new Set(body.members?.map((id, i) => body.members[i].id));
        }))) {
            return;
        }

        boardMembers.forEach((member) => {
            member.assigned = assignedMembers.has(member.id);
        });
        this.eventBus.call('gotTaskAssigns', boardMembers);
    }

    /**
     * Set or unset task assign on user
     * @param {number} userId
     * @param {boolean} assigned
     */
    async updateAssign(userId, assigned) {
        let response;
        if (assigned) {
            response = await taskAssignPost(this.taskData, userId);
        } else {
            response = await taskAssignDelete(this.taskData, userId);
        }
        await this.handleResponseStatus(response, () => this.eventBus.call('assignSuccess'));
    }

    /**
     * Upload attach file
     * @param {File} file
     * @return {Promise<void>}
     */
    async uploadAttach(file) {
        const fileForm = new FormData();
        fileForm.append('file', file);

        const uploadFileResponse = await taskFilesPost(this.taskData, fileForm);
        await this.handleResponseStatus(uploadFileResponse, () => this.eventBus.call('uploadAttachSuccess'));
    }

    /**
     * Delete attach file
     * @param {Number} fileID
     * @return {Promise<void>}
     */
    async deleteAttach(fileID) {
        const deleteFileResponse = await taskFileDelete(this.taskData, fileID);
        await this.handleResponseStatus(deleteFileResponse, () => this.eventBus.call('deleteAttachSuccess'));
    }

    /**
     * Saves task information
     * @param {Object} taskData
     * @return {Promise<void>}
     */
    async saveTaskSettings(taskData) {
        const response = await taskPut(this.taskData, taskData);
        this.handleResponseStatus(response, () => this.getTaskSettings());
    }

    /**
     * Deletes task
     * @return {Promise<void>}
     */
    async deleteTask() {
        const response = await taskDelete(this.taskData);
        this.handleResponseStatus(response, () => this.eventBus.call('closeSelf'));
    }


    /**
     * Handles messages from websocket for live update
     * @param {Event} event - websocket message event
     */
    liveUpdateHandler(event) {
        const msg = JSON.parse(event.data);
        switch (msg.eventType) {
            case 'UpdateTask':
            case 'AssignOnTask':
            case 'AddComment':
                if (/^\/boards\/[0-9]+\/columns\/[0-9]+\/tasks\/[0-9]+\/?$/.test(window.location.pathname)) {
                    console.log(window.location.pathname);
                    if (this.taskData.taskID === msg.metaData.tid) {
                        console.log('ZALUPA');
                        this.taskData.columnID = msg.metaData.cid;
                        this.getTaskSettings();
                    }
                }
                break;
            default:
                break;
        }
    }
}
