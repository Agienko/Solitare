import {cards} from "../addAnimatedCards.js";

export const isTranslatebleToReel = (i, cont) => {
    if (i === -1) return false
    let res
    let reel = cards.children[i]
    let lastCardInReel = reel.children[reel.children.length - 1].children[1].texture.textureCacheIds[0]
    let cardName = cont.children[1].texture.textureCacheIds[0]
    let lastCardValue = parseInt(lastCardInReel)
    let lastCardColor = getCardColor(lastCardInReel.slice(-1))
    let cardValue = parseInt(cardName)
    let cardColor = getCardColor(cardName.slice(-1))
    res = cardColor !== lastCardColor && cardValue + 1 === lastCardValue


    function getCardColor(currentCard){
        return (currentCard === 'c' || currentCard === 's') ? 'black' : 'red'
    }
    return res
}
