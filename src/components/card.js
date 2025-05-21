import {addLike, removeCard, removeLike} from "./api";

export function createCard(cardData, popupImageFun, currentUser) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImg = cardElement.querySelector('.card__image');
    const cardLikeCount = cardElement.querySelector('.card__like-count');
    cardElement.id = cardData._id;
    cardImg.src = cardData.link;
    cardImg.alt = cardData.name;
    cardLikeCount.textContent = cardData.likes ? cardData.likes.length : 0;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    const isCardOwner = !cardData.owner || !cardData.owner.name || cardData.owner.name === currentUser;
    const isCardLikedByCurrentUser = cardData.likes && cardData.likes.some((like) => like.name === currentUser);
    const cardDelButton = cardElement.querySelector('.card__delete-button');
    if (isCardOwner) {
        cardDelButton.addEventListener(
            'click', () => deleteCard(cardElement)
        );
    } else {
        disableButton(cardDelButton);
    }
    const likeElement = cardElement.querySelector('.card__like-button');
    if (isCardLikedByCurrentUser) {
        likeElement.classList.add('card__like-button_active');
    }
    likeElement.addEventListener(
        'click', evt => like(evt, cardElement)
    )
    cardElement.querySelector('.card__image')
        .addEventListener(
            'click', popupImageFun
        )
    return cardElement;
}

function disableButton(button) {
    button.disabled = true;
}

function refreshLikes(likeCountElement, responce) {
    if (responce && responce.likes) {
        likeCountElement.textContent = responce.likes.length;
    }
}

function like(evt, card) {
    const likedElement = evt.target;
    const likeCountElement = card.querySelector('.card__like-count');
    let cardId = card.id;
    if (likedElement.classList.contains('card__like-button_active')) {
        removeLike(cardId)
            .then((result) => {
                refreshLikes(likeCountElement, result);
                likedElement.classList.toggle('card__like-button_active');
            })
            .catch((message) => {
                alert(message)
            });
    } else {
        addLike(cardId)
            .then((result) => {
                refreshLikes(likeCountElement, result);
                likedElement.classList.toggle('card__like-button_active');
            })
            .catch((message) => {
                alert(message)
            });
    }
}

function deleteCard(card) {
    removeCard(card.id)
        .then(() => {
            card.remove();
        })
        .catch((message) => {
            alert(message)
        })
}