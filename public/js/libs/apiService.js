'use strict';

import {fetchCors, fetchGetJson, fetchPostJson} from './httpUtils.js';

/** Used for communicating with backend */
export default class ApiService {
    /**
     *
     */
    constructor() {
        // this.address = 'http://localhost:8080/';
        this.address = 'http://89.208.197.150:8080/';
    }

    /**
     * @description Register user
     * @param {Object} userInfo - user info object (name, surname, nickname, password)
     * @return {Promise<any>}
     */
    join(userInfo) {
        const apiUrl = new URL('join', this.address);
        return fetchPostJson(apiUrl, userInfo);
    }

    /**
     * @description Login user; create user session
     * @param {Object} userInfo - user info object (nickname, password)
     * @return {Promise<any>}
     */
    login(userInfo) {
        const apiUrl = new URL('login', this.address);
        return fetchPostJson(apiUrl, userInfo);
    }

    /**
     * @description Logout user
     * @return {Promise<* | void>}
     */
    logout() {
        const apiUrl = new URL('logout', this.address);
        return fetchCors(apiUrl, {method: 'DELETE'});
    }

    /**
     * @description Update profile info
     * @param {FormData} userForm - form with new user data
     * @return {Promise<Response | any>}
     */
    putUser(userForm) {
        const apiUrl = new URL('profile', this.address);
        return fetchCors(apiUrl, {method: 'PUT', body: userForm});
    }

    /**
     * @description Get profile info
     * @param {Object} userInfo - user info object (nickname)
     * @return {Promise<Response | any>}
     */
    getUser(userInfo = {}) {
        const apiUrl = new URL('profile', this.address);
        return fetchGetJson(apiUrl, userInfo);
    }
}
