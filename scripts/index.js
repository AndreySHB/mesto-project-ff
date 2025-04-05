const cardsContainer = document.querySelector('.places__list');
const onDelButListener = (event) => {
    if (event.target.closest('.card__delete-button')) {
        event.target.closest('li').remove();
    }
};
initialCards.forEach((cardData) => {
    const card = createCard(cardData, onDelButListener);
    cardsContainer.append(card);
});

function createCard(cardData, delButListener) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImg = cardElement.querySelector('.card__image');
    cardImg.src = cardData.link;
    cardImg.alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__delete-button')
        .addEventListener(
            'click', delButListener
        );
    return cardElement;
}