import {popupImage} from "./popup/image";

export const cardsContainer = document.querySelector('.places__list');
export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

export function createCard(cardData) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImg = cardElement.querySelector('.card__image');
    cardImg.src = cardData.link;
    cardImg.alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__delete-button')
        .addEventListener(
            'click', () => deleteCard(cardElement)
        );
    cardElement.querySelector('.card__like-button')
        .addEventListener(
            'click', (evt) => {
                evt.target.classList.toggle('card__like-button_active');
            }
        )
    cardElement.querySelector('.card__image')
        .addEventListener(
            'click', popupImage
        )
    return cardElement;
}

function deleteCard(card) {
    card.remove()
}