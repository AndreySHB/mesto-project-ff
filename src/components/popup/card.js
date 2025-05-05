import {show, hide, clickSomeWhere2Close} from "./common";
import {cardsContainer, createCard} from "../cards";

const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardButton = document.querySelector('.profile__add-button');
const newCardCloseButton = newCardPopup.querySelector('.popup__close');
const newCardSubmitButton = newCardPopup.querySelector('.popup__button');
const newCardNameFiled = newCardPopup.querySelector('.popup__input_type_card-name');
const newCardUrlFiled = newCardPopup.querySelector('.popup__input_type_url');

newCardButton.addEventListener('click', () => {
    show(newCardPopup);
    document.addEventListener('click', clickSomeWhere2Close);
})

newCardCloseButton.addEventListener('click', () => {
    hide(newCardPopup);
    document.removeEventListener('click', clickSomeWhere2Close);
})

newCardSubmitButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    const cardData = {};
    cardData.name = newCardNameFiled.value;
    cardData.link = newCardUrlFiled.value;
    const card = createCard(cardData);
    cardsContainer.append(card);
    newCardNameFiled.value = '';
    newCardUrlFiled.value = '';
    hide(newCardPopup);
    document.removeEventListener('click', clickSomeWhere2Close);
})
