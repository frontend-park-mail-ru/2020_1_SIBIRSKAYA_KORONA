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

const csrfTokenWrapper = (funcToExec) => {
    return async (...params) => {
        const tokenResponse = await getCSRFToken();
        if (tokenResponse.status === 200) {
            return funcToExec(...params);
        }
        return tokenResponse;
    };
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
export const settingsGet = csrfTokenWrapper(() => {
    const apiUrl = new URL('settings', BACKEND_ADDRESS);
    return fetchGet(apiUrl.href, {}, {'X-Csrf-Token': CSRFToken});
});

/**
 * @description Update current user settings
 * @param {FormData} userForm - form with new user data
 * @return {Promise<Response>}
 */
export const settingsPut = csrfTokenWrapper((userForm) => {
    const apiUrl = new URL('settings', BACKEND_ADDRESS);
    return fetchPut(apiUrl.href, userForm, {'X-Csrf-Token': CSRFToken});
});

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
export const sessionGet = csrfTokenWrapper(() => {
    const apiUrl = new URL('session', BACKEND_ADDRESS);
    return fetchGet(apiUrl.href, {}, {'X-Csrf-Token': CSRFToken});
});

/**
 * @description Logout current user
 * @return {Promise<Response>}
 */
export const sessionDelete = csrfTokenWrapper(() => {
    CSRFToken = null;
    const apiUrl = new URL('session', BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href, {'X-Csrf-Token': CSRFToken});
});

/** ******************* PROFILE ************************/

/**
 * @description Get public user info by nickname
 * @param {string} nickname - user nickname
 * @return {Promise<Response>}
 */
export const profileGet = csrfTokenWrapper((nickname) => {
    const apiUrl = new URL(`profile/${nickname}`, BACKEND_ADDRESS);
    return fetchGet(apiUrl.href, {}, {'X-Csrf-Token': CSRFToken});
});

/** ******************* BOARDS ************************/

/**
 * @description Create new board
 * @param {string} boardName - board name
 * @return {Promise<Response>}
 */
export const boardsPost = csrfTokenWrapper((boardName) => {
    const apiUrl = new URL('boards', BACKEND_ADDRESS);
    const body = {
        title: boardName,
    };
    return fetchPost(apiUrl.href, JSON.stringify(body),
        {'Content-Type': 'application/json', 'X-Csrf-Token': CSRFToken});
});

/**
 * @description Get available boards for current user
 * @return {Promise<Response>}
 */
export const boardsGet = csrfTokenWrapper(() => {
    const apiUrl = new URL('boards', BACKEND_ADDRESS);
    return fetchGet(apiUrl.href, {}, {'X-Csrf-Token': CSRFToken});
});

/**
 * @description Get board info
 * @param {Number} boardID
 * @return {Promise<Response>}
 */
export const boardGet = csrfTokenWrapper((boardID) => {
    const apiUrl = new URL(`boards/${boardID}`, BACKEND_ADDRESS);
    return fetchGet(apiUrl.href, {}, {'X-Csrf-Token': CSRFToken});
});

/**
 * Delete board
 * @param {Number} boardID
 * @return {Promise<Response>}
 */
export const boardDelete = csrfTokenWrapper((boardID) => {
    const apiUrl = new URL(`boards/${boardID}`, BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href, {'X-Csrf-Token': CSRFToken});
});

/**
 * Put board
 * @param {Number} boardID
 * @param {Object} newData - {title}
 * @return {Promise<Response>}
 */
export const boardPut = csrfTokenWrapper((boardID, newData) => {
    const apiUrl = new URL(`boards/${boardID}`, BACKEND_ADDRESS);
    return fetchPut(apiUrl.href, JSON.stringify(newData), {'X-Csrf-Token': CSRFToken});
});

/**
 * Generate new invite link
 * @param {Number} boardID
 * @return {Promise<Response>}
 */
export const boardInviteLinkPost = csrfTokenWrapper((boardID) => {
    const apiUrl = new URL(`boards/${boardID}/invite_link`, BACKEND_ADDRESS);
    return fetchPost(apiUrl.href, null, {'X-Csrf-Token': CSRFToken});
});

/**
 * Creates board by template
 * @param {string} boardTemplate - template name
 * @return {Promise<Response>}
 */
export const boardsTemplatePost = csrfTokenWrapper((boardTemplate) => {
    // doesnt matter what ${boardTemplate} in api right now (27.05.2020)
    const apiUrl = new URL(`boards/templates`, BACKEND_ADDRESS);
    const body = {
        template: boardTemplate,
    };
    return fetchPost(apiUrl.href, JSON.stringify(body),
        {'Content-Type': 'application/json', 'X-Csrf-Token': CSRFToken});
});

/** ********************* COLUMNS ***********************/

/**
 * @description Create new column
 * @param {Number} boardID
 * @param {String} columnName
 * @param {Number} columnPosition
 * @return {Promise<Response>}
 */
export const columnsPost = csrfTokenWrapper((boardID, columnName, columnPosition) => {
    const apiUrl = new URL(`boards/${boardID}/columns`, BACKEND_ADDRESS);
    const body = {
        title: columnName,
        position: columnPosition,
    };
    return fetchPost(apiUrl.href, JSON.stringify(body), {
        'Content-Type': 'application/json',
        'X-Csrf-Token': CSRFToken,
    });
});

/**
 * @param {Number} boardID
 * @description Get all board columns column
 * @return {Promise<Response>}
 */
export const columnsGet = csrfTokenWrapper((boardID) => {
    const apiUrl = new URL(`boards/${boardID}/columns`, BACKEND_ADDRESS);
    return fetchGet(apiUrl.href, {}, {'X-Csrf-Token': CSRFToken});
});

/**
 * @param {Number} boardID
 * @param {Number} columnID
 * @param {Object} newData - {position, title}
 * @description Get all board columns column
 * @return {Promise<Response>}
 */
export const columnsPut = csrfTokenWrapper((boardID, columnID, newData = {position, title}) => {
    const apiUrl = new URL(`boards/${boardID}/columns/${columnID}`, BACKEND_ADDRESS);
    return fetchPut(apiUrl.href, JSON.stringify(newData), {'X-Csrf-Token': CSRFToken});
});

/**
 * @param {Number} boardID
 * @param {Number} columnID
 * @description Delete column
 * @return {Promise<Response>}
 */
export const columnsDelete = csrfTokenWrapper((boardID, columnID) => {
    const apiUrl = new URL(`boards/${boardID}/columns/${columnID}`, BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href, {'X-Csrf-Token': CSRFToken});
});

/** ********************* TASKS ***********************/

/**
 * @description Get all tasks
 * @param {Number} boardID
 * @param {Number} columnID
 * @return {Promise<Response>}
 */
export const tasksGet = csrfTokenWrapper((boardID, columnID) => {
    const apiUrl = new URL(`boards/${boardID}/columns/${columnID}/tasks`, BACKEND_ADDRESS);
    return fetchGet(apiUrl.href, {}, {'X-Csrf-Token': CSRFToken});
});

/**
 * Create new task in column
 * @param {Number} boardID
 * @param {Number} columnID
 * @param {Object} task
 * @return {Promise<Response>}
 */
export const tasksPost = csrfTokenWrapper((boardID, columnID, task = {position: 1, description: '', title: ''}) => {
    const apiUrl = new URL(`boards/${boardID}/columns/${columnID}/tasks`, BACKEND_ADDRESS);
    const body = {
        title: task.title,
        description: task.description,
        position: task.position,
    };
    return fetchPost(apiUrl.href, JSON.stringify(body), {
        'Content-Type': 'application/json',
        'X-Csrf-Token': CSRFToken,
    });
});

/** ******************* BOARD SETTINGS ************************/

/**
 * Search users by part of nickname
 * @param {Number} boardID
 * @param {String} nickname - part of nickname
 * @param {Number} limit - result count limit
 * @return {Promise<Response>}
 */
export const usersGet = csrfTokenWrapper((boardID, nickname, limit) => {
    const apiUrl = new URL(`boards/${boardID}/search_for_invite?nickname=${nickname}&limit=${limit}`, BACKEND_ADDRESS);
    return fetchGet(apiUrl.href, {}, {'X-Csrf-Token': CSRFToken});
});

/**
 * Add user to board
 * @param {Number} boardID
 * @param {Number} userID
 * @return {Promise<Response>}
 */
export const postMember = csrfTokenWrapper((boardID, userID) => {
    const apiUrl = new URL(`boards/${boardID}/members/${userID}`, BACKEND_ADDRESS);
    return fetchPost(apiUrl.href, null, {'X-Csrf-Token': CSRFToken});
});

/**
 * Remove user from board
 * @param {Number} boardID
 * @param {Number} userID
 * @return {Promise<Response>}
 */
export const deleteMember = csrfTokenWrapper((boardID, userID) => {
    const apiUrl = new URL(`boards/${boardID}/members/${userID}`, BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href, {'X-Csrf-Token': CSRFToken});
});

/**
 * Add user to board by invite link
 * @param {String} inviteHash - unique board hash
 * @return {Promise<Response>}
 */
export const putMemberWithInviteLink = csrfTokenWrapper((inviteHash) => {
    const apiUrl = new URL(`invite_to_board/${inviteHash}`, BACKEND_ADDRESS);
    return fetchPut(apiUrl.href, null, {'X-Csrf-Token': CSRFToken});
});


/** ******************* TASK SETTINGS ************************/

/**
 * Get task
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @return {Promise<Response>}
 */
export const taskGet = csrfTokenWrapper((taskData) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const apiUrl = new URL(`${taskUrlPart}`, BACKEND_ADDRESS);
    return fetchGet(apiUrl.href, {}, {'X-Csrf-Token': CSRFToken});
});

/**
 * Updates task info
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {Object} body = {new task data}
 * @return {Promise<Response>}
 */
export const taskPut = csrfTokenWrapper((taskData, body) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const apiUrl = new URL(`${taskUrlPart}`, BACKEND_ADDRESS);
    return fetchPut(apiUrl.href, JSON.stringify(body), {'X-Csrf-Token': CSRFToken});
});

/**
 * Delete task
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @return {Promise<Response>}
 */
export const taskDelete = csrfTokenWrapper((taskData) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const apiUrl = new URL(`${taskUrlPart}`, BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href, {'X-Csrf-Token': CSRFToken});
});

/** ******************* COMMENTS ************************/

/**
 * Get task comments
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @return {Promise<Response>}
 */
export const taskCommentsGet = csrfTokenWrapper((taskData) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const apiUrl = new URL(`${taskUrlPart}/comments`, BACKEND_ADDRESS);
    return fetchGet(apiUrl.href, {}, {'X-Csrf-Token': CSRFToken});
});

/**
 * Post task comment
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {String} text - comment text
 * @return {Promise<Response>}
 */
export const taskCommentsPost = csrfTokenWrapper((taskData, text) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const apiUrl = new URL(`${taskUrlPart}/comments`, BACKEND_ADDRESS);
    return fetchPost(apiUrl.href, JSON.stringify({text: text}), {'X-Csrf-Token': CSRFToken});
});

/**
 * Delete task comment
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {Number} commentID
 * @return {Promise<Response>}
 */
export const taskCommentsDelete = csrfTokenWrapper((taskData, commentID) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const apiUrl = new URL(`${taskUrlPart}/comments/${commentID}`, BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href, {'X-Csrf-Token': CSRFToken});
});

/** ******************* CHECKLISTS ************************/

/**
 * Get all checklists in task
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @return {Promise<Response>}
 */
export const taskChecklistGet = csrfTokenWrapper((taskData) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const apiUrl = new URL(`${taskUrlPart}/checklists`, BACKEND_ADDRESS);
    return fetchGet(apiUrl.href, {}, {'X-Csrf-Token': CSRFToken});
});

/**
 * Create checklist
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {String} checklistName
 * @return {Promise<Response>}
 */
export const taskChecklistPost = csrfTokenWrapper((taskData, checklistName) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const apiUrl = new URL(`${taskUrlPart}/checklists`, BACKEND_ADDRESS);
    return fetchPost(apiUrl.href, JSON.stringify({name: checklistName}), {'X-Csrf-Token': CSRFToken});
});

/**
 * Update checklist
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {Number} checklistID
 * @param {String} checklistName
 * @return {Promise<Response>}
 */
export const taskChecklistPut = csrfTokenWrapper((taskData, checklistID, checklistName) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const url = `${taskUrlPart}/checklists/${checklistID}`;
    const apiUrl = new URL(url, BACKEND_ADDRESS);
    return fetchPut(apiUrl.href, JSON.stringify({name: checklistName}), {'X-Csrf-Token': CSRFToken});
});

/**
 * Delete checklist
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {Number} checklistID
 * @return {Promise<Response>}
 */
export const taskChecklistDelete = csrfTokenWrapper((taskData, checklistID) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const url = `${taskUrlPart}/checklists/${checklistID}`;
    const apiUrl = new URL(url, BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href, {'X-Csrf-Token': CSRFToken});
});

/**
 * Create item in checklist
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {Object} itemData - {checklistID, text, isDone}
 * @return {Promise<Response>}
 */
export const taskChecklistItemPost = csrfTokenWrapper((taskData, itemData) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const url = `${taskUrlPart}/checklists/${itemData.checklistID}/items`;
    const apiUrl = new URL(url, BACKEND_ADDRESS);
    return fetchPost(apiUrl.href, JSON.stringify({
        text: itemData.text,
        isDone: itemData.isDone,
    }), {'X-Csrf-Token': CSRFToken});
});

/**
 * Update item in checklist
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {Number} checklistID
 * @param {Object} itemData {id, text, isDone}
 * @return {Promise<Response>}
 */
export const taskChecklistItemPut = csrfTokenWrapper((taskData, checklistID, itemData) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const url = `${taskUrlPart}/checklists/${checklistID}/items/${itemData.id}`;
    const apiUrl = new URL(url, BACKEND_ADDRESS);
    return fetchPut(apiUrl.href, JSON.stringify(itemData), {'X-Csrf-Token': CSRFToken});
});

/**
 * Delete item
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {Number} checklistID
 * @param {Number} itemId
 * @return {Promise<Response>}
 */
export const taskChecklistItemDelete = csrfTokenWrapper((taskData, checklistID, itemId) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const url = `${taskUrlPart}/checklists/${checklistID}/items/${itemId}`;
    const apiUrl = new URL(url, BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href, {'X-Csrf-Token': CSRFToken});
});

/** ********************* LABELS ***********************/

/**
 * Get board labels
 * @param {Number} boardID
 * @return {Promise<Response>}
 */
export const labelsGet = csrfTokenWrapper((boardID) => {
    const apiUrl = new URL(`boards/${boardID}/labels`, BACKEND_ADDRESS);
    return fetchGet(apiUrl.href, {}, {'X-Csrf-Token': CSRFToken});
});

/**
 * Create new label in board
 * @param {Number} boardID
 * @param {Object} labelData - label text and color
 * @return {Promise<Response>}
 */
export const labelsPost = csrfTokenWrapper((boardID, labelData = {title: void 0, color: void 0}) => {
    const apiUrl = new URL(`boards/${boardID}/labels`, BACKEND_ADDRESS);
    return fetchPost(apiUrl.href, JSON.stringify(labelData), {'X-Csrf-Token': CSRFToken});
});

/**
 * Get label info
 * @param {Number} boardID
 * @param {Number} labelID
 * @return {Promise<Response>}
 */
export const labelGet = csrfTokenWrapper((boardID, labelID) => {
    const apiUrl = new URL(`boards/${boardID}/labels/${labelID}`, BACKEND_ADDRESS);
    return fetchGet(apiUrl.href, {}, {'X-Csrf-Token': CSRFToken});
});

/**
 * Update some label params
 * @param {Number} boardID
 * @param {Number}  labelID
 * @param {Object}  labelData - label text and color
 * @return {Promise<Response>}
 */
export const labelPut = csrfTokenWrapper((boardID, labelID, labelData = {title: void 0, color: void 0}) => {
    const apiUrl = new URL(`boards/${boardID}/labels/${labelID}`, BACKEND_ADDRESS);
    return fetchPut(apiUrl.href, JSON.stringify(labelData), {'X-Csrf-Token': CSRFToken});
});

/**
 * Delete label from board
 * @param {Number} boardID
 * @param {Number} labelID
 * @return {Promise<Response>}
 */
export const labelDelete = csrfTokenWrapper((boardID, labelID) => {
    const apiUrl = new URL(`boards/${boardID}/labels/${labelID}`, BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href, {'X-Csrf-Token': CSRFToken});
});

/**
 * Add label to task
 * @param {Number} boardID
 * @param {Number} columnID
 * @param {Number} taskID
 * @param {Number} labelID
 * @return {Promise<Response>}
 */
export const taskLabelPost = csrfTokenWrapper((boardID, columnID, taskID, labelID) => {
    const apiUrl = new URL(`boards/${boardID}/columns/${columnID}/tasks/${taskID}/labels/${labelID}`, BACKEND_ADDRESS);
    return fetchPost(apiUrl.href, null, {'X-Csrf-Token': CSRFToken});
});

/**
 * Remove label from task
 * @param {Number} boardID
 * @param {Number} columnID
 * @param {Number} taskID
 * @param {Number} labelID
 * @return {Promise<Response>}
 */
export const taskLabelDelete = csrfTokenWrapper((boardID, columnID, taskID, labelID) => {
    const apiUrl = new URL(`boards/${boardID}/columns/${columnID}/tasks/${taskID}/labels/${labelID}`, BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href, {'X-Csrf-Token': CSRFToken});
});

/** ******************* ASSIGNS ************************/

/**
 * Create assign
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {Number} userId
 * @return {Promise<Response>}
 */
export const taskAssignPost = csrfTokenWrapper((taskData, userId) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const url = `${taskUrlPart}/members/${userId}`;
    const apiUrl = new URL(url, BACKEND_ADDRESS);
    return fetchPost(apiUrl.href, '', {'X-Csrf-Token': CSRFToken});
});

/**
 * Delete assign
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {Number} userId
 * @return {Promise<Response>}
 */
export const taskAssignDelete = csrfTokenWrapper((taskData, userId) => {
    const taskUrlPart = buildTaskUrlPart(taskData);
    const url = `${taskUrlPart}/members/${userId}`;
    const apiUrl = new URL(url, BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href, {'X-Csrf-Token': CSRFToken});
});

/** ******************* FILES ************************/

/**
 * Get attaches from task
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @return {Promise<Response>}
 */
export const taskFilesGet = csrfTokenWrapper((taskData) => {
    const apiUrlPart = `boards/${taskData.boardID}/columns/${taskData.columnID}/tasks/${taskData.taskID}/files`;
    const apiUrl = new URL(apiUrlPart, BACKEND_ADDRESS);
    return fetchGet(apiUrl.href, {}, {'X-Csrf-Token': CSRFToken});
});

/**
 * Upload attach file
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {FormData} fileForm - form with file
 * @return {Promise<Response>}
 */
export const taskFilesPost = csrfTokenWrapper((taskData, fileForm) => {
    const apiUrlPart = `boards/${taskData.boardID}/columns/${taskData.columnID}/tasks/${taskData.taskID}/files`;
    const apiUrl = new URL(apiUrlPart, BACKEND_ADDRESS);
    return fetchPost(apiUrl.href, fileForm, {'X-Csrf-Token': CSRFToken});
});

/**
 * Delete attach from task
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {Number} fileID
 * @return {Promise<Response>}
 */
export const taskFileDelete = csrfTokenWrapper((taskData, fileID) => {
    const apiUrlPart1 = `boards/${taskData.boardID}/columns/${taskData.columnID}/tasks/${taskData.taskID}`;
    const apiUrlPart2 = `/files/${fileID}`;
    const apiUrl = new URL(apiUrlPart1 + apiUrlPart2, BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href, {'X-Csrf-Token': CSRFToken});
});


/** ******************* HEADER NOTIFICATIONS ************************/


/**
 * Get user notifications
 * @return {Promise<Response>}
 */
export const notificationsGet = csrfTokenWrapper(() => {
    const apiUrl = new URL('notifications', BACKEND_ADDRESS);
    return fetchGet(apiUrl.href, {}, {'X-Csrf-Token': CSRFToken});
});

/**
 * Put user notifications (is used to mark them read)
 * @return {Promise<Response>}
 */
export const notificationsPut = csrfTokenWrapper(() => {
    const apiUrl = new URL('notifications', BACKEND_ADDRESS);
    return fetchPut(apiUrl.href, {}, {'X-Csrf-Token': CSRFToken});
});

/**
 * Delete user notifications
 * @return {Promise<Response>}
 */
export const notificationsDelete = csrfTokenWrapper(() => {
    const apiUrl = new URL('notifications', BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href, {'X-Csrf-Token': CSRFToken});
});
