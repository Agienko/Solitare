import {colision} from "./colision.js";


const isFirstCardCorrect = (card, home) => {
    return home.children.length === 1 && card.getNumber() === 1
}

const isCorrectRestCard = (card, home) => {
    const lastHomeCard = home.last()
    let isCorrectSuit = card.getSuit() === card.getSuit(lastHomeCard)
    let isCorrectNumber = card.getNumber() === card.getNumber(lastHomeCard) + 1

    return isCorrectSuit && isCorrectNumber
}
export const isAtHome = (card, home) => {
    let isFirstCorrect = colision(card, home) && isFirstCardCorrect(card, home)
    let isRestCorrect = colision(card, home) && isCorrectRestCard(card, home)
    return isFirstCorrect || isRestCorrect
}
