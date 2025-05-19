const token = '95ce6314-fbd3-43d0-9ed9-c6e84752f93b';
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-38/',
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    }
}

function processResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
}

export function removeLike(cardId) {
    return fetch(config.baseUrl + 'cards/likes/' + cardId, {
        method: 'DELETE',
        headers: config.headers
    }).then(processResponse);
}

export function addLike(cardId) {
    return fetch(config.baseUrl + 'cards/likes/' + cardId, {
        method: 'PUT',
        headers: config.headers
    }).then(processResponse);
}

export function removeCard(cardId) {
    return fetch(config.baseUrl + 'cards/' + cardId, {
        method: 'DELETE',
        headers: config.headers
    }).then(processResponse);
}

export function updateAvatar(imageUrl) {
    return fetch(config.baseUrl + 'users/me/avatar', {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: imageUrl,
        })
    }).then(processResponse);
}

export function updateProfile(name, description) {
    return fetch(config.baseUrl + '/users/me', {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: description
        })
    }).then(processResponse);
}

export function saveCard(cardData) {
    return fetch(config.baseUrl + 'cards/', {
        method: 'POST',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: cardData.name,
            link: cardData.link
        })
    }).then(processResponse);
}

export function fetchCurrentUser() {
    return fetch(config.baseUrl + 'users/me', {
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        }
    }).then(processResponse);
}

export function fetchCards() {
    return fetch(config.baseUrl + 'cards', {
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        }
    }).then(processResponse);
}