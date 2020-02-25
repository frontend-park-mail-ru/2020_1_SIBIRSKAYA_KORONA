'use strict';

import {fetchGetJson, fetchPostJson} from './httpUtils.js';

/** Used for communicating with backend */
export default class ApiService {
    /**
     * @param {string|URL} address - backend api address
     */
    constructor(address) {
        this.address = address;
    }

    /**
     * @description Register user
     * @param {Object} userInfo - user info object (name, surname, nickname, password)
     * @return {Promise<Response>}
     */
    join(userInfo) {
        const apiUrl = new URL('join', this.address);
        return fetchPostJson(apiUrl, userInfo);
    }

    /**
     * @description Login user; create user session
     * @param {Object} userInfo - user info object (nickname, password)
     * @return {Promise<Response>}
     */
    login(userInfo) {
        const apiUrl = new URL('login', this.address);
        return fetchPostJson(apiUrl, userInfo);
    }

    /**
     * @description Logout user
     * @returns {Promise<* | void>}
     */
    logout() {
        const apiUrl = new URL('logout', this.address);
        return fetchPostJson(apiUrl);
    }

    // TODO(Alexandr): check if works
    /**
     * @description Update profile info
     * @param {Object} userInfo -
     * @return {Promise<Response>}
     */
    postUser(userInfo) {
        const apiUrl = new URL('profile', this.address);
        return fetchPostJson(apiUrl, userInfo);
    }

    /**
     * @description Get profile info
     * @param {Object} userInfo - user info object (nickname)
     * @return {Promise<Response>}
     */
    getUser(userInfo) {
        const apiUrl = new URL('profile', this.address);
        return fetchGetJson(apiUrl, userInfo);
    }
}
