import './pages/index.css';
import {createCard, initialCards, cardsContainer} from "./components/cards.js";
import * as common from './components/popup/common.js';
import * as card from './components/popup/card.js';
import * as image from './components/popup/image.js';
import * as profile from './components/popup/profile.js';

initialCards.forEach((cardData) => {
    const newCard = createCard(cardData);
    cardsContainer.append(newCard);
});