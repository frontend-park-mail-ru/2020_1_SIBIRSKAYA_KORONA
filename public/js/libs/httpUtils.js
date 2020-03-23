/**
 * @description Shortcut for creating data
 * @param {string} url - request address
 * @param {Object} body - request body
 * @param {Object} headers - additional headers
 * @return {Promise<Response>}
 */
export const fetchPost = (url, body, headers = {}) => {
    return fetch(url, {
        mode: 'cors',
        credentials: 'include',
        method: 'POST',
        headers,
        body,
    });
};

/**
 * @description Shortcut for getting data
 * @param {string} url - request address
 * @param {Object.<string, string>} queryObj - 'GET' parameters for query string
 * @param {Object} headers - additional headers
 * @return {Promise<Response>}
 */
export const fetchGet = (url, queryObj = {}, headers = {}) => {
    const urlObj = new URL(url);
    for (const [key, value] of Object.entries(queryObj)) {
        urlObj.searchParams.append(key, value);
    }

    return fetch(urlObj.href, {
        mode: 'cors',
        credentials: 'include',
        method: 'GET',
        headers,
    });
};

/**
 * @description Shortcut for updating data
 * @param {string} url - request address
 * @param {*} body - request body
 * @param {Object} headers - additional headers
 * @return {Promise<Response>}
 */
export const fetchPut = (url, body, headers = {}) => {
    return fetch(url, {
        mode: 'cors',
        credentials: 'include',
        method: 'PUT',
        headers,
        body,
    });
};

/**
 * @description Shortcut for deleting data
 * @param {string} url - request address
 * @param {Object} headers - additional headers
 * @return {Promise<Response>}
 */
export const fetchDelete = (url, headers = {}) => {
    return fetch(url, {
        mode: 'cors',
        credentials: 'include',
        method: 'DELETE',
        headers,
    });
};


