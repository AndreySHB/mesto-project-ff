import './pages/index.css';
import {initialCards} from './components/cards.js'

const cardsContainer = document.querySelector('.places__list');
initialCards.forEach((cardData) => {
    const card = createCard(cardData);
    cardsContainer.append(card);
});

function createCard(cardData) {
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
    return cardElement;
}

function deleteCard(card) {
    card.remove()
}