import './pages/index.css';
import {initialCards} from './components/cards.js';
import {createCard} from './components/card';
import {closeOnOverlayClick, hide, show} from './components/modal.js';

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupSrc = imagePopup.querySelector('.popup__image');
const cardsContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const profileCloseButton = profilePopup.querySelector('.popup__close');
const profileSubmitButton = profilePopup.querySelector('.popup__button');
const profileNameFiled = profilePopup.querySelector('.popup__input_type_name');
const profileDescriptionField = profilePopup.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardCloseButton = newCardPopup.querySelector('.popup__close');
const newCardSubmitButton = newCardPopup.querySelector('.popup__button');
const newCardNameFiled = newCardPopup.querySelector('.popup__input_type_card-name');
const newCardUrlFiled = newCardPopup.querySelector('.popup__input_type_url');
const newCardButton = document.querySelector('.profile__add-button');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');
const popups = document.querySelectorAll('.popup');

function openImagePopup(evt) {
    imagePopupSrc.src = evt.target.src;
    imagePopupSrc.alt = evt.target.alt;
    show(imagePopup);
}

initialCards.forEach((cardData) => {
    const newCard = createCard(cardData, openImagePopup);
    cardsContainer.append(newCard);
});

profileEditButton.addEventListener('click', () => {
    show(profilePopup);
    profileNameFiled.value = profileTitle.textContent;
    profileDescriptionField.value = profileDescription.textContent;
})

profileCloseButton.addEventListener('click', () => {
    hide(profilePopup);
})

profileSubmitButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    profileTitle.textContent = profileNameFiled.value;
    profileDescription.textContent = profileDescriptionField.value;
    hide(profilePopup);
})

newCardButton.addEventListener('click', () => {
    show(newCardPopup);
})

newCardCloseButton.addEventListener('click', () => {
    hide(newCardPopup);
})

newCardSubmitButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    const cardData = {};
    cardData.name = newCardNameFiled.value;
    cardData.link = newCardUrlFiled.value;
    const card = createCard(cardData, openImagePopup);
    cardsContainer.prepend(card);
    newCardNameFiled.value = '';
    newCardUrlFiled.value = '';
    hide(newCardPopup);
})

imagePopupCloseButton.addEventListener('click', () => {
    hide(imagePopup);
})

popups.forEach((item) => {
    item.classList.add('popup_is-animated');
    item.addEventListener('click', (evt) => closeOnOverlayClick(evt, item))
})
