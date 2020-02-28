'use strict';

import {fetchCors, fetchGetJson, fetchPostJson} from './httpUtils.js';

const BACKEND_ADDRESS = 'http://localhost:8080/';

/**
 * @description Register user
 * @param {Object} userInfo - user info object
 * @return {Promise<any>}
 */
export const apiJoin = (userInfo) => {
    const apiUrl = new URL('join', BACKEND_ADDRESS);
    return fetchPostJson(apiUrl, userInfo);
};

/**
 * @description Login user; create user session
 * @param {Object} userInfo - user info object
 * @return {Promise<any>}
 */
export const apiLogin = (userInfo) => {
    const apiUrl = new URL('login', BACKEND_ADDRESS);
    return fetchPostJson(apiUrl, userInfo);
};

/**
 * @description Logout user
 * @return {Promise<* | void>}
 */
export const apiLogout = () => {
    const apiUrl = new URL('logout', BACKEND_ADDRESS);
    return fetchCors(apiUrl, {method: 'DELETE'});
};

/**
 * @description Update profile info
 * @param {FormData} userForm - form with new user data
 * @return {Promise<Response | any>}
 */
export const apiPutUser = (userForm) => {
    const apiUrl = new URL('profile', BACKEND_ADDRESS);
    return fetchCors(apiUrl, {method: 'PUT', body: userForm});
};

/**
 * @description Get profile info
 * @param {Object} userInfo - user info object
 * @return {Promise<Response | any>}
 */
export const apiGetUser = (userInfo = {}) => {
    const apiUrl = new URL('profile', BACKEND_ADDRESS);
    return fetchGetJson(apiUrl, userInfo);
};

