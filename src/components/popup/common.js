export function show(elem) {
    elem.style.visibility = 'visible';
    elem.style.opacity = 1;
}

export function hide(elem) {
    elem.style.visibility = 'hidden';
    elem.style.opacity = 0;
}

const allPopups = document.querySelectorAll('.popup');

function closeAllPopups() {
    allPopups.forEach((elem) => {
        hide(elem);
    })
}

export function clickSomeWhere2Close(evt) {
    if (evt.target.classList.contains('content')) {
        closeAllPopups();
        document.removeEventListener('click', clickSomeWhere2Close);
    }
}

document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
        closeAllPopups();
    }
})