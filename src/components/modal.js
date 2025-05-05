export function changeVisibility(elem) {
    elem.classList.toggle('popup_is-opened');
}

function hide(elem) {
    elem.classList.remove('popup_is-opened');
}

export function closeAllPopups() {
    const allPopups = document.querySelectorAll('.popup');
    allPopups.forEach((elem) => {
        hide(elem);
    })
}

export function clickSomeWhere2Close(evt) {
    if (evt.target.classList.contains('popup')) {
        closeAllPopups();
        document.removeEventListener('click', clickSomeWhere2Close);
    }
}

export function openImagePopup(evt) {
    const imagePopup = document.querySelector('.popup_type_image');
    const imagePopupSrc = imagePopup.querySelector('.popup__image');
    imagePopupSrc.src = evt.target.src;
    imagePopupSrc.alt = evt.target.alt;
    document.addEventListener('click', clickSomeWhere2Close);
    changeVisibility(imagePopup);
}