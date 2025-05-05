import './pages/index.css';
import {initialCards} from './components/cards.js';
import {createCard} from './components/card';
import {clickSomeWhere2Close, changeVisibility, openImagePopup, closeAllPopups} from './components/modal.js';

initialCards.forEach((cardData) => {
    const newCard = createCard(cardData, openImagePopup);
    const cardsContainer = document.querySelector('.places__list');
    cardsContainer.append(newCard);
});

const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const profileCloseButton = profilePopup.querySelector('.popup__close');
const profileSubmitButton = profilePopup.querySelector('.popup__button');
const profileNameFiled = profilePopup.querySelector('.popup__input_type_name');
const profileDescriptionField = profilePopup.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription= document.querySelector('.profile__description');
profileEditButton.addEventListener('click', () => {
    changeVisibility(profilePopup);
    profileNameFiled.value = profileTitle.textContent;
    profileDescriptionField.value = profileDescription.textContent;
    document.addEventListener('click', clickSomeWhere2Close);
})

profileCloseButton.addEventListener('click', () => {
    changeVisibility(profilePopup);
    document.removeEventListener('click', clickSomeWhere2Close);
})

profileSubmitButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    profileTitle.textContent = profileNameFiled.value;
    profileDescription.textContent = profileDescriptionField.value;
    changeVisibility(profilePopup);
    document.removeEventListener('click', clickSomeWhere2Close);
})

const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardButton = document.querySelector('.profile__add-button');
const newCardCloseButton = newCardPopup.querySelector('.popup__close');
const newCardSubmitButton = newCardPopup.querySelector('.popup__button');
const newCardNameFiled = newCardPopup.querySelector('.popup__input_type_card-name');
const newCardUrlFiled = newCardPopup.querySelector('.popup__input_type_url');
newCardButton.addEventListener('click', () => {
    changeVisibility(newCardPopup);
    document.addEventListener('click', clickSomeWhere2Close);
})

newCardCloseButton.addEventListener('click', () => {
    changeVisibility(newCardPopup);
    document.removeEventListener('click', clickSomeWhere2Close);
})

newCardSubmitButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    const cardData = {};
    cardData.name = newCardNameFiled.value;
    cardData.link = newCardUrlFiled.value;
    const card = createCard(cardData, openImagePopup);
    const cardsContainer = document.querySelector('.places__list');
    cardsContainer.append(card);
    newCardNameFiled.value = '';
    newCardUrlFiled.value = '';
    changeVisibility(newCardPopup);
    document.removeEventListener('click', clickSomeWhere2Close);
})

document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
        closeAllPopups();
    }
})

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');
imagePopupCloseButton.addEventListener('click', ()=> {
    changeVisibility(imagePopup);
    document.removeEventListener('click', clickSomeWhere2Close);
})

const popups = document.querySelectorAll('.popup');
popups.forEach((item) => {
    item.classList.add('popup_is-animated');
})
