export function show(elem) {
    elem.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupEsc);
}

export function hide(elem) {
    elem.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupEsc);
}

export function closeOnOverlayClick(evt, popup) {
    if (evt.target.classList.contains('popup')) {
        hide(popup);
    }
}

export function closePopupEsc(evt) {
    if(evt.key === 'Escape') {
        hide(document.querySelector('.popup_is-opened'));
    }
}