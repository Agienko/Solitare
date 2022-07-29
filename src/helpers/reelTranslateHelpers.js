import {colision} from "../common/colision.js";

const isCorrectColor = (card, reel) => {
    return card.getColor() !== card.getColor(reel.last())
}
const isCorrectNumber = (card, reel) => {
    return card.getNumber() + 1 === card.getNumber(reel.last())
}

const correctToEmptyReel = (card, reel) => {
    return colision(card,reel) && reel.isEmpty() && card.getNumber() === 13
}
const correctToNotEmptyReel = (card, reel) => {
    return colision(card, reel) && !reel.isEmpty() && isCorrectColor(card, reel) && isCorrectNumber(card, reel)
}
export const isAtReel = (card, reel) => {
    return correctToEmptyReel(card,reel) || correctToNotEmptyReel(card, reel)

}
