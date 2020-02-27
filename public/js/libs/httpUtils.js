'use strict';

/**
 * @description Fetch used for CORS
 * @param {string|URL} url - fetch url
 * @param {string} method - POST, GET, etc.
 * @param {any} body - request body
 * @param {Object} headersObj
 * @param {Object} queryObj - 'GET' parameters for query string
 * @return {Promise<Response>}
 */
export const fetchCors = (url, {
    method = 'POST',
    body,
    headersObj = {},
    queryObj = {},
}) => {
    const urlObj = new URL(url);

    for (const [key, value] of Object.entries(queryObj)) {
        urlObj.searchParams.append(key, value);
    }

    return fetch(urlObj.href, {
        method,
        headers: headersObj,
        body,
        mode: 'cors',
        credentials: 'include',
    });
};

/** ************* SHORTCUTS ****************/

/**
 * @description Shortcut for parsing json response
 * @param {string|URL} url - fetch url
 * @param {Object} queryObj - 'GET' parameters for query string
 * @return {Promise<any>}
 */
export const fetchGetJson = (url, queryObj) => {
    return fetchCors(url, {method: 'GET', queryObj})
        .then((res) => res.json());
};


/**
 * @description Shortcut for sending json request and parsing json response
 * @param {string|URL} url - fetch url
 * @param {Object} body - object
 * @return {Promise<any>}
 */
export const fetchPostJson = (url, body) => {
    return fetchCors(url, {method: 'POST', body: JSON.stringify(body)})
        .then((res) => res.json());
};
