export function createCard(cardData, popupImageFun) {
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
            'click', like
        )
    cardElement.querySelector('.card__image')
        .addEventListener(
            'click', popupImageFun
        )
    return cardElement;
}

function like(evt) {
    evt.target.classList.toggle('card__like-button_active');
}

function deleteCard(card) {
    card.remove()
}