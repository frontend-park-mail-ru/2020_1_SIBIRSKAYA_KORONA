import {fetchPost, fetchGet, fetchPut, fetchDelete} from './httpUtils.js';

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
        name: boardName,
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
