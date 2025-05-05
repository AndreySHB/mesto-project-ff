import {hide, show, clickSomeWhere2Close} from "./common";

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');
const imagePopupSrc = imagePopup.querySelector('.popup__image');

imagePopupCloseButton.addEventListener('click', ()=> {
    hide(imagePopup);
    document.removeEventListener('click', clickSomeWhere2Close);
})

export function popupImage(evt) {
    imagePopupSrc.src = evt.target.src;
    imagePopupSrc.alt = evt.target.alt;
    document.addEventListener('click', clickSomeWhere2Close);
    show(imagePopup);
}

