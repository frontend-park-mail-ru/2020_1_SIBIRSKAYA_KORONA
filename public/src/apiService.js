'use strict';

export default class ApiService {
    constructor(address) {
        this.address = address;
    }

    /**
     *
     * @param userInfo - user info object (name, surname, nickname, password)
     * @returns {Promise<Response>}
     */
    join(userInfo) {
        const apiUrl = new URL('join', this.address);

        return fetch(apiUrl.href, {
            method: 'POST',
            mode: "cors",
            credentials: 'include',
            body: JSON.stringify(userInfo),
        })
    }

    /**
     *
     * @param userInfo - user info object (nickname, password)
     * @returns {Promise<Response>}
     */
    login(userInfo) {
        const apiUrl = new URL('login', this.address);

        return fetch(apiUrl.href, {
            method: 'POST',
            mode: "cors",
            credentials: 'include',
            body: JSON.stringify(userInfo)
        })
    }


}