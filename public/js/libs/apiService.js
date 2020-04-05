import {fetchDelete, fetchGet, fetchPost, fetchPut} from './httpUtils.js';

const BACKEND_ADDRESS = 'http://localhost:8080/';
// const BACKEND_ADDRESS = 'http://89.208.197.150:8080/';

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
export const settingsPut = (userForm) => {
    const apiUrl = new URL('settings', BACKEND_ADDRESS);
    return fetchPut(apiUrl.href, userForm);
};

/** ******************* SESSION ************************/


/**
 * @description Login user; create user session
 * @param {Object} userInfo - user info object
 * @return {Promise<Response>}
 */
export const sessionPost = (userInfo) => {
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

/**
 * Get task
 * @param {Number} boardID
 * @param {Number} columnID
 * @param {Number} taskID
 * @return {Promise<Response>}
 */
export const taskGet = (boardID, columnID, taskID) => {
    const apiUrl = new URL(`boards/${boardID}/columns/${columnID}/tasks/${taskID}`, BACKEND_ADDRESS);
    return fetchGet(apiUrl.href);
};

/**
 * Updates task info
 * @param {Number} boardID
 * @param {Number} columnID
 * @param {Number} taskID
 * @param {Object} task
 * @return {Promise<Response>}
 */
export const taskPut = (boardID, columnID, taskID, task) => {
    const apiUrl = new URL(`boards/${boardID}/columns/${columnID}/tasks/${taskID}`, BACKEND_ADDRESS);
    return fetchPut(apiUrl.href, task);
};
