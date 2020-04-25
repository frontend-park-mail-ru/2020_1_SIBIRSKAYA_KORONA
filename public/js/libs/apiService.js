import {fetchDelete, fetchGet, fetchPost, fetchPut} from './httpUtils.js';

const BACKEND_ADDRESS = 'http://localhost:8080/';
// const BACKEND_ADDRESS = 'http://89.208.197.150:8080/';

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
 * @param {String} nicknamePart
 * @param {Number} limit - result count limit
 * @return {Promise<Response>}
 */
export const usersGet = (boardID, nicknamePart, limit) => {
    const apiUrl = new URL(`/boards/${boardID}/search_for_invite?nickname=${nicknamePart}&limit=${limit}`,
        BACKEND_ADDRESS);
    return fetchGet(apiUrl.href);
};

/**
 * Add user to board
 * @param {Number} boardID
 * @param {Number} userID
 * @return {Promise<Response>}
 */
export const postMember = (boardID, userID) => {
    const apiUrl = new URL(`/boards/${boardID}/members/${userID}`, BACKEND_ADDRESS);
    return fetchPost(apiUrl.href, null);
};

/** ******************* TASK SETTINGS ************************/

/**
 * Get task
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @return {Promise<Response>}
 */
export const taskGet = (taskData) => {
    const taskUrlPart = `boards/${taskData.boardID}/columns/${taskData.columnID}/tasks/${taskData.taskID}`;
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
    const taskUrlPart = `boards/${taskData.boardID}/columns/${taskData.columnID}/tasks/${taskData.taskID}`;
    const apiUrl = new URL(`${taskUrlPart}`, BACKEND_ADDRESS);
    return fetchPut(apiUrl.href, JSON.stringify(body));
};

/**
 * Delete task
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @return {Promise<Response>}
 */
export const taskDelete = (taskData) => {
    const taskUrlPart = `boards/${taskData.boardID}/columns/${taskData.columnID}/tasks/${taskData.taskID}`;
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
    const taskUrlPart = `boards/${taskData.boardID}/columns/${taskData.columnID}/tasks/${taskData.taskID}`;
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
    const taskUrlPart = `boards/${taskData.boardID}/columns/${taskData.columnID}/tasks/${taskData.taskID}`;
    const apiUrl = new URL(`${taskUrlPart}/comments`, BACKEND_ADDRESS);
    return fetchPost(apiUrl.href, JSON.stringify({text: text}));
};

/** ******************* CHECKLISTS ************************/

/**
 * Get all checklists in task
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @return {Promise<Response>}
 */
export const taskChecklistGet = (taskData) => {
    const taskUrlPart = `boards/${taskData.boardID}/columns/${taskData.columnID}/tasks/${taskData.taskID}`;
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
    const taskUrlPart = `boards/${taskData.boardID}/columns/${taskData.columnID}/tasks/${taskData.taskID}`;
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
    const taskUrlPart = `boards/${taskData.boardID}/columns/${taskData.columnID}/tasks/${taskData.taskID}`;
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
    const taskUrlPart = `boards/${taskData.boardID}/columns/${taskData.columnID}/tasks/${taskData.taskID}`;
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
    const taskUrlPart = `boards/${taskData.boardID}/columns/${taskData.columnID}/tasks/${taskData.taskID}`;
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
    const taskUrlPart = `boards/${taskData.boardID}/columns/${taskData.columnID}/tasks/${taskData.taskID}`;
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
    const taskUrlPart = `boards/${taskData.boardID}/columns/${taskData.columnID}/tasks/${taskData.taskID}`;
    const url = `${taskUrlPart}/checklists/${checklistID}/items/${itemId}`;
    const apiUrl = new URL(url, BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href);
};

/** ******************* ASSIGNS ************************/

// POST boards/{bid}/columns/{cid}/tasks/{tid}/members/{uid} на назначение
/**
 * Create assign
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {Number} userId
 * @return {Promise<Response>}
 */
export const taskAssignPost = (taskData, userId) => {
    const taskUrlPart = `boards/${taskData.boardID}/columns/${taskData.columnID}/tasks/${taskData.taskID}`;
    const url = `${taskUrlPart}/members/${userId}`;
    const apiUrl = new URL(url, BACKEND_ADDRESS);
    return fetchPost(apiUrl.href, '');
};

// DELETE boards/{bid}/columns/{cid}/tasks/{tid}/members/{uid} на снятие с задачи
/**
 * Delete assign
 * @param {Object} taskData - {boardID, columnID, taskID}
 * @param {Number} userId
 * @return {Promise<Response>}
 */
export const taskAssignDelete = (taskData, userId) => {
    const taskUrlPart = `boards/${taskData.boardID}/columns/${taskData.columnID}/tasks/${taskData.taskID}`;
    const url = `${taskUrlPart}/members/${userId}`;
    const apiUrl = new URL(url, BACKEND_ADDRESS);
    return fetchDelete(apiUrl.href);
};
