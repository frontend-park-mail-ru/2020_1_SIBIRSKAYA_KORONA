'use strict';

export const fetchGetJson = (url, paramsObj) => {
    let getUrl = new URL(url);

    for (const [key, value] of Object.entries(paramsObj)) {
        getUrl.searchParams.append(key, value);
    }

    return fetch(getUrl.href, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    }).then(res => res.json())
        .catch(err => console.log(err))
};

export const fetchPostJson = (url, jsonObj = null) => {
    let postUrl = new URL(url);

    return fetch(postUrl.href, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(jsonObj),
    }).then(res => res.json())
        .catch(err => console.log(err))

};


