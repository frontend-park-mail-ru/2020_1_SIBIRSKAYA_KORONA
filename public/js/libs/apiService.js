import {fetchDelete, fetchGet, fetchPost, fetchPut} from './httpUtils.js';

const BACKEND_ADDRESS = `https://${IP_ADDRESS}/api/`;

let CSRFToken;

/**
 * Gets CSRF token from backend
 * @return {Promise<Response>}
 */
const getCSRFToken = async () => {
    let response;
    if (CSRFToken) {
        response = new Response();
        response.headers.set('X-Csrf-Token', CSRFToken);
        return response;
    }
    const apiUrl = new URL('token', BACKEND_ADDRESS);
    response = await fetchGet(apiUrl.href);
    if (response.status === 200) {
        CSRFToken = response.headers.get('X-Csrf-Token');
    }
    return response;
};

/**
 * Transform task data object in url
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @return {string} - part of url with task data
 */
const buildTaskUrlPart = (taskData) => {
    return `boards/${taskData.boardID}/columns/${taskData.columnID}/tasks/${taskData.taskID}`;
};

/** ******************* SETTINGS ************************/

/**
 * @description Register user; create new user settings
 * @param {Object} userInfo - user info object
 * @return {Promise<Response>}
 */
export const settingsPost = (userInfo) => {
    const apiUrl = new URL('settings', BACKEND_ADDRESS);
    return fetchPost(apiUrl.href, JSON.stringify(userInfo), {'Content-Type': 'application/json'});
};

/**
 * @description Get current user settings
 * @return {Promise<Response>}
 */
export const settingsGet = () => {
    const apiUrl = new URL('settings', BACKEND_ADDRESS);
    return fetchGet(apiUrl.href);
};

/**
 * @description Update current user settings
 * @param {FormData} userForm - form with new user data
 * @return {Promise<Response>}
 */
export const settingsPut = async (userForm) => {
    const tokenResponse = await getCSRFToken();
    if (tokenResponse.status === 200) {
        const apiUrl = new URL('settings', BACKEND_ADDRESS);
        return fetchPut(apiUrl.href, userForm, {'X-Csrf-Token': CSRFToken});
    }
    return tokenResponse;
};

/** ******************* SESSION ************************/


/**
 * @description Login user; create user session
 * @param {Object} userInfo - user info object
 * @return {Promise<Response>}
 */
export const sessionPost = (userInfo) => {
    CSRFToken = null;
    const apiUrl = new URL('session', BACKEND_ADDRESS);
    return fetchPost(apiUrl.href, JSON.stringify(userInfo), {'Content-Type': 'application/json'});
};

/**
 * @description Check if current user is logged in
 * @return {Promise<Response>}
 */
export const sessionGet = () => {
    const apiUrl = new URL('session', BACKEND_ADDRESS);
    return fetchGet(apiUrl.href);
};

/**
 * @description Logout current user
 * @return {Promise<Response>}
 */
export const sessionDelete = () => {
    CSRFToken = null;
    const apiUrl = new URL('session', BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href);
};

/** ******************* PROFILE ************************/

/**
 * @description Get public user info by nickname
 * @param {string} nickname - user nickname
 * @return {Promise<Response>}
 */
export const profileGet = (nickname) => {
    const apiUrl = new URL(`profile/${nickname}`, BACKEND_ADDRESS);
    return fetchGet(apiUrl.href);
};

/** ******************* BOARDS ************************/

/**
 * @description Create new board
 * @param {string} boardName - board name
 * @return {Promise<Response>}
 */
export const boardsPost = (boardName) => {
    const apiUrl = new URL('boards', BACKEND_ADDRESS);
    const body = {
        title: boardName,
    };
    return fetchPost(apiUrl.href, JSON.stringify(body), {'Content-Type': 'application/json'});
};

/**
 * @description Get available boards for current user
 * @return {Promise<Response>}
 */
export const boardsGet = () => {
    const apiUrl = new URL('boards', BACKEND_ADDRESS);
    return fetchGet(apiUrl.href);
};

/**
 * @description Get board info
 * @param {Number} boardID
 * @return {Promise<Response>}
 */
export const boardGet = (boardID) => {
    const apiUrl = new URL(`boards/${boardID}`, BACKEND_ADDRESS);
    return fetchGet(apiUrl.href);
};

/**
 * Delete board
 * @param {Number} boardID
 * @return {Promise<Response>}
 */
export const boardDelete = (boardID) => {
    const apiUrl = new URL(`boards/${boardID}`, BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href);
};

/**
 * Put board
 * @param {Number} boardID
 * @param {Object} newData - {title}
 * @return {Promise<Response>}
 */
export const boardPut = (boardID, newData) => {
    const apiUrl = new URL(`boards/${boardID}`, BACKEND_ADDRESS);
    return fetchPut(apiUrl.href, JSON.stringify(newData));
};

/**
 * Generate new invite link
 * @param {Number} boardID
 * @return {Promise<Response>}
 */
export const boardInviteLinkPost = (boardID) => {
    const apiUrl = new URL(`boards/${boardID}/invite_link`, BACKEND_ADDRESS);
    return fetchPost(apiUrl.href, null);
};

/** ********************* COLUMNS ***********************/

/**
 * @description Create new column
 * @param {Number} boardID
 * @param {String} columnName
 * @param {Number} columnPosition
 * @return {Promise<Response>}
 */
export const columnsPost = (boardID, columnName, columnPosition) => {
    const apiUrl = new URL(`boards/${boardID}/columns`, BACKEND_ADDRESS);
    const body = {
        title: columnName,
        position: columnPosition,
    };
    return fetchPost(apiUrl.href, JSON.stringify(body), {'Content-Type': 'application/json'});
};

/**
 * @param {Number} boardID
 * @description Get all board columns column
 * @return {Promise<Response>}
 */
export const columnsGet = (boardID) => {
    const apiUrl = new URL(`boards/${boardID}/columns`, BACKEND_ADDRESS);
    return fetchGet(apiUrl.href);
};

/**
 * @param {Number} boardID
 * @param {Number} columnID
 * @description Delete column
 * @return {Promise<Response>}
 */
export const columnsDelete = (boardID, columnID) => {
    const apiUrl = new URL(`boards/${boardID}/columns/${columnID}`, BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href);
};

/** ********************* TASKS ***********************/

/**
 * @description Get all tasks
 * @param {Number} boardID
 * @param {Number} columnID
 * @return {Promise<Response>}
 */
export const tasksGet = (boardID, columnID) => {
    const apiUrl = new URL(`boards/${boardID}/columns/${columnID}/tasks`, BACKEND_ADDRESS);
    return fetchGet(apiUrl.href);
};

/**
 * Create new task in column
 * @param {Number} boardID
 * @param {Number} columnID
 * @param {Object} task
 * @return {Promise<Response>}
 */
export const tasksPost = (boardID, columnID, task = {position: 1, description: '', title: ''}) => {
    const apiUrl = new URL(`boards/${boardID}/columns/${columnID}/tasks`, BACKEND_ADDRESS);
    const body = {
        title: task.title,
        description: task.description,
        position: task.position,
    };
    return fetchPost(apiUrl.href, JSON.stringify(body), {'Content-Type': 'application/json'});
};

/** ******************* BOARD SETTINGS ************************/

/**
 * Search users by part of nickname
 * @param {Number} boardID
 * @param {String} nickname - part of nickname
 * @param {Number} limit - result count limit
 * @return {Promise<Response>}
 */
export const usersGet = (boardID, nickname, limit) => {
    const apiUrl = new URL(`boards/${boardID}/search_for_invite?nickname=${nickname}&limit=${limit}`, BACKEND_ADDRESS);
    return fetchGet(apiUrl.href);
};

/**
 * Add user to board
 * @param {Number} boardID
 * @param {Number} userID
 * @return {Promise<Response>}
 */
export const postMember = (boardID, userID) => {
    const apiUrl = new URL(`boards/${boardID}/members/${userID}`, BACKEND_ADDRESS);
    return fetchPost(apiUrl.href, null);
};

/**
 * Add user to board by invite link
 * @param {String} inviteHash - unique board hash
 * @return {Promise<Response>}
 */
export const putMemberWithInviteLink = (inviteHash) => {
    const apiUrl = new URL(`invite_to_board/${inviteHash}`, BACKEND_ADDRESS);
    return fetchPut(apiUrl.href, null);
};


/** ******************* TASK SETTINGS ************************/

/**
 * Get task
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @return {Promise<Response>}
 */
export const taskGet = (taskData) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const apiUrl = new URL(`${taskUrlPart}`, BACKEND_ADDRESS);
    return fetchGet(apiUrl.href);
};

/**
 * Updates task info
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {Object} body = {new task data}
 * @return {Promise<Response>}
 */
export const taskPut = (taskData, body) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const apiUrl = new URL(`${taskUrlPart}`, BACKEND_ADDRESS);
    return fetchPut(apiUrl.href, JSON.stringify(body));
};

/**
 * Delete task
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @return {Promise<Response>}
 */
export const taskDelete = (taskData) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const apiUrl = new URL(`${taskUrlPart}`, BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href);
};

/** ******************* COMMENTS ************************/

/**
 * Get task comments
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @return {Promise<Response>}
 */
export const taskCommentsGet = (taskData) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const apiUrl = new URL(`${taskUrlPart}/comments`, BACKEND_ADDRESS);
    return fetchGet(apiUrl.href);
};

/**
 * Post task comment
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {String} text - comment text
 * @return {Promise<Response>}
 */
export const taskCommentsPost = (taskData, text) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const apiUrl = new URL(`${taskUrlPart}/comments`, BACKEND_ADDRESS);
    return fetchPost(apiUrl.href, JSON.stringify({text: text}));
};

/**
 * Delete task comment
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {Number} commentID
 * @return {Promise<Response>}
 */
export const taskCommentsDelete = (taskData, commentID) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const apiUrl = new URL(`${taskUrlPart}/comments/${commentID}`, BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href);
};

/** ******************* CHECKLISTS ************************/

/**
 * Get all checklists in task
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @return {Promise<Response>}
 */
export const taskChecklistGet = (taskData) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const apiUrl = new URL(`${taskUrlPart}/checklists`, BACKEND_ADDRESS);
    return fetchGet(apiUrl.href);
};

/**
 * Create checklist
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {String} checklistName
 * @return {Promise<Response>}
 */
export const taskChecklistPost = (taskData, checklistName) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const apiUrl = new URL(`${taskUrlPart}/checklists`, BACKEND_ADDRESS);
    return fetchPost(apiUrl.href, JSON.stringify({name: checklistName}));
};

/**
 * Update checklist
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {Number} checklistID
 * @param {String} checklistName
 * @return {Promise<Response>}
 */
export const taskChecklistPut = (taskData, checklistID, checklistName) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const url = `${taskUrlPart}/checklists/${checklistID}`;
    const apiUrl = new URL(url, BACKEND_ADDRESS);
    return fetchPut(apiUrl.href, JSON.stringify({name: checklistName}));
};

/**
 * Delete checklist
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {Number} checklistID
 * @return {Promise<Response>}
 */
export const taskChecklistDelete = (taskData, checklistID) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const url = `${taskUrlPart}/checklists/${checklistID}`;
    const apiUrl = new URL(url, BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href);
};

/**
 * Create item in checklist
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {Object} itemData - {checklistID, text, isDone}
 * @return {Promise<Response>}
 */
export const taskChecklistItemPost = (taskData, itemData) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const url = `${taskUrlPart}/checklists/${itemData.checklistID}/items`;
    const apiUrl = new URL(url, BACKEND_ADDRESS);
    return fetchPost(apiUrl.href, JSON.stringify({text: itemData.text, isDone: itemData.isDone}));
};

/**
 * Update item in checklist
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {Number} checklistID
 * @param {Object} itemData {id, text, isDone}
 * @return {Promise<Response>}
 */
export const taskChecklistItemPut = (taskData, checklistID, itemData) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const url = `${taskUrlPart}/checklists/${checklistID}/items/${itemData.id}`;
    const apiUrl = new URL(url, BACKEND_ADDRESS);
    return fetchPut(apiUrl.href, JSON.stringify(itemData));
};

/**
 * Delete item
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {Number} checklistID
 * @param {Number} itemId
 * @return {Promise<Response>}
 */
export const taskChecklistItemDelete = (taskData, checklistID, itemId) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const url = `${taskUrlPart}/checklists/${checklistID}/items/${itemId}`;
    const apiUrl = new URL(url, BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href);
};

/** ********************* LABELS ***********************/

/**
 * Get board labels
 * @param {Number} boardID
 * @return {Promise<Response>}
 */
export const labelsGet = (boardID) => {
    const apiUrl = new URL(`boards/${boardID}/labels`, BACKEND_ADDRESS);
    return fetchGet(apiUrl.href);
};

/**
 * Create new label in board
 * @param {Number} boardID
 * @param {Object} labelData - label text and color
 * @return {Promise<Response>}
 */
export const labelsPost = (boardID, labelData = {title: void 0, color: void 0}) => {
    const apiUrl = new URL(`boards/${boardID}/labels`, BACKEND_ADDRESS);
    return fetchPost(apiUrl.href, JSON.stringify(labelData));
};

/**
 * Get label info
 * @param {Number} boardID
 * @param {Number} labelID
 * @return {Promise<Response>}
 */
export const labelGet = (boardID, labelID) => {
    const apiUrl = new URL(`boards/${boardID}/labels/${labelID}`, BACKEND_ADDRESS);
    return fetchGet(apiUrl.href);
};

/**
 * Update some label params
 * @param {Number} boardID
 * @param {Number}  labelID
 * @param {Object}  labelData - label text and color
 * @return {Promise<Response>}
 */
export const labelPut = (boardID, labelID, labelData = {title: void 0, color: void 0}) => {
    const apiUrl = new URL(`boards/${boardID}/labels/${labelID}`, BACKEND_ADDRESS);
    return fetchPut(apiUrl.href, JSON.stringify(labelData));
};

/**
 * Delete label from board
 * @param {Number} boardID
 * @param {Number} labelID
 * @return {Promise<Response>}
 */
export const labelDelete = (boardID, labelID) => {
    const apiUrl = new URL(`boards/${boardID}/labels/${labelID}`, BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href);
};

/**
 * Add label to task
 * @param {Number} boardID
 * @param {Number} columnID
 * @param {Number} taskID
 * @param {Number} labelID
 * @return {Promise<Response>}
 */
export const taskLabelPost = (boardID, columnID, taskID, labelID) => {
    const apiUrl = new URL(`boards/${boardID}/columns/${columnID}/tasks/${taskID}/labels/${labelID}`, BACKEND_ADDRESS);
    return fetchPost(apiUrl.href, null);
};

/**
 * Remove label from task
 * @param {Number} boardID
 * @param {Number} columnID
 * @param {Number} taskID
 * @param {Number} labelID
 * @return {Promise<Response>}
 */
export const taskLabelDelete = (boardID, columnID, taskID, labelID) => {
    const apiUrl = new URL(`boards/${boardID}/columns/${columnID}/tasks/${taskID}/labels/${labelID}`, BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href);
};

/** ******************* ASSIGNS ************************/

/**
 * Create assign
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {Number} userId
 * @return {Promise<Response>}
 */
export const taskAssignPost = (taskData, userId) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const url = `${taskUrlPart}/members/${userId}`;
    const apiUrl = new URL(url, BACKEND_ADDRESS);
    return fetchPost(apiUrl.href, '');
};

/**
 * Delete assign
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {Number} userId
 * @return {Promise<Response>}
 */
export const taskAssignDelete = (taskData, userId) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const url = `${taskUrlPart}/members/${userId}`;
    const apiUrl = new URL(url, BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href);
};

/** ******************* FILES ************************/

/**
 * Get attaches from task
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @return {Promise<Response>}
 */
export const taskFilesGet = (taskData) => {
    const apiUrlPart = `boards/${taskData.boardID}/columns/${taskData.columnID}/tasks/${taskData.taskID}/files`;
    const apiUrl = new URL(apiUrlPart, BACKEND_ADDRESS);
    return fetchGet(apiUrl.href);
};

/**
 * Upload attach file
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {FormData} fileForm - form with file
 * @return {Promise<Response>}
 */
export const taskFilesPost = (taskData, fileForm) => {
    const apiUrlPart = `boards/${taskData.boardID}/columns/${taskData.columnID}/tasks/${taskData.taskID}/files`;
    const apiUrl = new URL(apiUrlPart, BACKEND_ADDRESS);
    return fetchPost(apiUrl.href, fileForm);
};

/**
 * Delete attach from task
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {Number} fileID
 * @return {Promise<Response>}
 */
export const taskFileDelete = (taskData, fileID) => {
    const apiUrlPart1 = `boards/${taskData.boardID}/columns/${taskData.columnID}/tasks/${taskData.taskID}`;
    const apiUrlPart2 = `/files/${fileID}`;
    const apiUrl = new URL(apiUrlPart1 + apiUrlPart2, BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href);
};


/** ******************* HEADER NOTIFICATIONS ************************/


/**
 * Get user notifications
 * @return {Promise<Response>}
 */
export const notificationsGet = () => {
    const apiUrl = new URL('notifications', BACKEND_ADDRESS);
    return fetchGet(apiUrl.href);
};

/**
 * Put user notifications (is used to mark them read)
 * @return {Promise<Response>}
 */
export const notificationsPut = () => {
    const apiUrl = new URL('notifications', BACKEND_ADDRESS);
    return fetchPut(apiUrl.href, {});
};

/**
 * Delete user notifications
 * @return {Promise<Response>}
 */
export const notificationsDelete = () => {
    const apiUrl = new URL('notifications', BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href);
};
