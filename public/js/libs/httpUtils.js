/**
 * @description Shortcut for creating data
 * @param {string} url - request address
 * @param {Object} body - request body
 * @return {Promise<Response>}
 */
export const fetchPost = (url, body) => {
    return fetch(url, {
        mode: 'cors',
        credentials: 'include',
        method: 'POST',
        body,
    });
};

/**
 * @description Shortcut for getting data
 * @param {string} url - request address
 * @param {Object.<string, string>} queryObj - 'GET' parameters for query string
 * @return {Promise<Response>}
 */
export const fetchGet = (url, queryObj = {}) => {
    const urlObj = new URL(url);
    for (const [key, value] of Object.entries(queryObj)) {
        urlObj.searchParams.append(key, value);
    }

    return fetch(urlObj.href, {
        mode: 'cors',
        credentials: 'include',
        method: 'GET',
    });
};

/**
 * @description Shortcut for updating data
 * @param {string} url - request address
 * @param {*} body - request body
 * @return {Promise<Response>}
 */
export const fetchPut = (url, body) => {
    return fetch(url, {
        mode: 'cors',
        credentials: 'include',
        method: 'PUT',
        body,
    });
};

/**
 * @description Shortcut for deleting data
 * @param {string} url - request address
 * @return {Promise<Response>}
 */
export const fetchDelete = (url) => {
    return fetch(url, {
        mode: 'cors',
        credentials: 'include',
        method: 'DELETE',
    });
};


