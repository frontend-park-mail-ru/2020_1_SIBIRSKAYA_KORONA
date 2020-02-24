'use strict';

import {fetchGetJson, fetchPostJson} from './httpUtils.js'

export default class ApiService {
    constructor(address) {
        this.address = address;
    }

    /**
     * @description Register user
     * @param userInfo - user info object (name, surname, nickname, password)
     * @returns {Promise<Response>}
     */
    join(userInfo) {
        const apiUrl = new URL('join', this.address);
        return fetchPostJson(apiUrl, userInfo);
    }

    /**
     * @description Login user; create user session
     * @param userInfo - user info object (nickname, password)
     * @returns {Promise<Response>}
     */
    login(userInfo) {
        const apiUrl = new URL('login', this.address);
        return fetchPostJson(apiUrl, userInfo);
    }

    // TODO(Alexandr): logout

    // TODO(Alexandr): postUser jsdoc
    /**
     * @description Update profile info
     * @param userInfo -
     * @returns {Promise<Response>}
     */
    postUser(userInfo) {
        const apiUrl = new URL('profile', this.address);
        return fetchPostJson(apiUrl, userInfo)
    }

    /**
     * @description Get profile info
     * @param userInfo - user info object (nickname)
     * @returns {Promise<Response>}
     */
    getUser(userInfo) {
        const apiUrl = new URL('profile', this.address);
        return fetchGetJson(apiUrl, userInfo)
    }

}