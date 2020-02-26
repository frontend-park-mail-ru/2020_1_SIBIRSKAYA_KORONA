'use strict';

export const fetchDelete = (url) => {
    const delUrl = new URL(url);

    return fetch(delUrl.href, {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'include',
    })
};

export const fetchPutJson = (url, body) => {
    const putUrl = new URL(url);

    return fetch(putUrl.href, {
        method: 'PUT',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(body),
    }).then((res) => res.json())
};

export const fetchGetJson = (url, paramsObj) => {
    const getUrl = new URL(url);

    for (const [key, value] of Object.entries(paramsObj)) {
        getUrl.searchParams.append(key, value);
    }

    return fetch(getUrl.href, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    }).then((res) => res.json())
};

export const fetchPostJson = (url, jsonObj = null) => {
    const postUrl = new URL(url);

    let body = null;
    if (jsonObj !== null) {
        body = JSON.stringify(jsonObj);
    }

    return fetch(postUrl.href, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: body,
    }).then((res) => res.json())
};


