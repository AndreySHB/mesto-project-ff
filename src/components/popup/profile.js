import {hide, show, clickSomeWhere2Close} from "./common";

const profileEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const profileCloseButton = profilePopup.querySelector('.popup__close');
const profileSubmitButton = profilePopup.querySelector('.popup__button');
const profileNameFiled = profilePopup.querySelector('.popup__input_type_name');
const profileDescriptionField = profilePopup.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription= document.querySelector('.profile__description');

profileEditButton.addEventListener('click', () => {
    show(profilePopup);
    profileNameFiled.value = profileTitle.textContent;
    profileDescriptionField.value = profileDescription.textContent;
    document.addEventListener('click', clickSomeWhere2Close);
})

profileCloseButton.addEventListener('click', () => {
    hide(profilePopup);
    document.removeEventListener('click', clickSomeWhere2Close);
})

profileSubmitButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    profileTitle.textContent = profileNameFiled.value;
    profileDescription.textContent = profileDescriptionField.value;
    hide(profilePopup);
    document.removeEventListener('click', clickSomeWhere2Close);
})
