import './pages/index.css';
import {createCard} from './components/card';
import {closeOnOverlayClick, hide, show} from './components/modal.js';
import {clearValidation, enableValidation, toggleButtonState} from './components/validation';
import {fetchCards, fetchCurrentUser, saveCard, updateAvatar, updateProfile} from "./components/api";

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupSrc = imagePopup.querySelector('.popup__image');
const cardsContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileImage = document.querySelector('.profile__image');
const profileImagePopup = document.querySelector('.popup_image_edit');
const profileImageEditButton = document.querySelector('.profile__image-edit-button');
const profileImageCloseButton = profileImagePopup.querySelector('.popup__close');
const profileInputImage = profileImagePopup.querySelector('.popup__input_type_image_url');
const profileInputImageErrorMessageHolder = profileImagePopup.querySelector('.url-input-error');
const profileImageSubmitButton = profileImagePopup.querySelector('.popup__button');
const profileImageValidationDataHolders = [
    {
        'input': profileInputImage,
        'errorMessageHolder': profileInputImageErrorMessageHolder,
        'lockedButton': profileImageSubmitButton
    }
]
const profilePopup = document.querySelector('.popup_type_edit');
const profileCloseButton = profilePopup.querySelector('.popup__close');
const profileSubmitButton = profilePopup.querySelector('.popup__button');
const profileInputName = profilePopup.querySelector('.popup__input_type_name');
const profileInputNameErrorMessageHolder = profilePopup.querySelector('.name-input-error');
const profileInputDescription = profilePopup.querySelector('.popup__input_type_description');
const profileInputDescriptionErrorMessageHolder = profilePopup.querySelector('.description-input-error');
const profileRegexp = /^[a-zA-Zа-яА-ЯёЁ\- ]*$/u;
const profileValidationDataHolders = [
    {
        'input': profileInputName,
        'errorMessageHolder': profileInputNameErrorMessageHolder,
        'pattern': profileRegexp,
        'lockedButton': profileSubmitButton
    },
    {
        'input': profileInputDescription,
        'errorMessageHolder': profileInputDescriptionErrorMessageHolder,
        'pattern': profileRegexp,
        'lockedButton': profileSubmitButton
    }
]
const profileNameInputFiled = profilePopup.querySelector('.popup__input_type_name');
const profileDescriptionInputField = profilePopup.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = newCardPopup.querySelector('.popup__form');
const newCardCloseButton = newCardPopup.querySelector('.popup__close');
const newCardSubmitButton = newCardPopup.querySelector('.popup__button');
const newCardInputTitle = newCardPopup.querySelector('.popup__input_type_card-name');
const newCardInputTitleErrorMessageHolder = newCardPopup.querySelector('.title-input-error');
const newCardInputTitleRegexp = /^[a-zA-Zа-яА-ЯёЁ\- ]*$/u;
const newCardInputUrl = newCardPopup.querySelector('.popup__input_type_url');
const newCardInputUrlErrorMessageHolder = newCardPopup.querySelector('.url-input-error');
const newCardValidationDataHolders = [
    {
        'input': newCardInputTitle,
        'errorMessageHolder': newCardInputTitleErrorMessageHolder,
        'pattern': newCardInputTitleRegexp,
        'lockedButton': newCardSubmitButton
    },
    {
        'input': newCardInputUrl,
        'errorMessageHolder': newCardInputUrlErrorMessageHolder,
        'lockedButton': newCardSubmitButton
    }
]
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

function setSavingState(button) {
    button.textContent = 'Сохранение...';
}

function setInitialSaveState(button) {
    button.textContent = 'Сохранить';
}

Promise.all([fetchCurrentUser(), fetchCards()])
    .then((results) => {
        const userData = results[0];
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.setAttribute('style', `background-image: url(${userData.avatar});`);
        const cardDatas = results[1];
        cardDatas.forEach((cardData) => {
            const newCard = createCard(cardData, openImagePopup, profileTitle.textContent);
            cardsContainer.append(newCard);
        })
    })
    .catch((message) => {
        alert(message)
    });

profileEditButton.addEventListener('click', () => {
    clearValidation(profileValidationDataHolders, profileSubmitButton);
    show(profilePopup);
    profileNameInputFiled.value = profileTitle.textContent;
    profileDescriptionInputField.value = profileDescription.textContent;
})

profileImageEditButton.addEventListener('click', () => {
    show(profileImagePopup);
    toggleButtonState(profileImageSubmitButton, profileImageValidationDataHolders);
})

profileImageCloseButton.addEventListener('click', () => {
    hide(profileImagePopup);
})

profileImageSubmitButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    const imageUrl = profileImageSubmitButton.closest('.popup_image_edit')
        .querySelector('.popup__input_type_image_url')
        .value
    setSavingState(profileImageSubmitButton);
    updateAvatar(imageUrl)
        .then(() => {
            profileImage.setAttribute('style', `background-image: url(${imageUrl});`);
            hide(profileImagePopup);
        })
        .catch((message) => {
            alert(message)
        })
        .finally(() => {
            setInitialSaveState(profileImageSubmitButton);
        });
})

profileCloseButton.addEventListener('click', () => {
    hide(profilePopup);
})

profileSubmitButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        const profileNameVal = profileNameInputFiled.value;
        const profileDescriptionVal = profileDescriptionInputField.value
        setSavingState(profileSubmitButton);
        updateProfile(profileNameVal, profileDescriptionVal, profileSubmitButton)
            .then(() => {
                profileTitle.textContent = profileNameVal;
                profileDescription.textContent = profileDescriptionVal;
            })
            .catch((message) => {
                alert(message)
            })
            .finally(() => {
                setInitialSaveState(profileSubmitButton);
            });
        hide(profilePopup);
    }
)

newCardButton.addEventListener('click', () => {
    newCardForm.reset();
    show(newCardPopup);
    toggleButtonState(newCardSubmitButton, newCardValidationDataHolders);
})

newCardCloseButton.addEventListener('click', () => {
    hide(newCardPopup);
})

newCardSubmitButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    const cardData = {};
    cardData.name = newCardNameFiled.value;
    cardData.link = newCardUrlFiled.value;
    const card = createCard(cardData, openImagePopup, profileTitle.textContent);
    setSavingState(newCardSubmitButton);
    saveCard(cardData)
        .then((result) => {
            card.id = result._id;
            newCardForm.reset();
            cardsContainer.prepend(card);
        })
        .catch((message) => {
            alert(message)
        })
        .finally(() => {
            setInitialSaveState(newCardSubmitButton);
        });
    hide(newCardPopup);
})

enableValidation([newCardValidationDataHolders, profileImageValidationDataHolders, profileValidationDataHolders])

imagePopupCloseButton.addEventListener('click', () => {
    hide(imagePopup);
})

popups.forEach((item) => {
    item.classList.add('popup_is-animated');
    item.addEventListener('click', (evt) => closeOnOverlayClick(evt, item))
})