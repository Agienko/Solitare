import {createCardsFromArr} from "./createCardsFromArr.js";
import {gameDescriptor} from "../../game/gameDescriptor.js";
import {data} from "../../../data/data.js";
import {BACK_CARD} from "../../constants/cards.js";
import {createCard} from "./createCard.js";

export let cards, cardsInDeck

export function addAnimatedCards (){
    cards = new PIXI.Container()
    cards.sortableChildren = true
    let startX = 330

    const mask = createCard(BACK_CARD, false, false)
    mask.x = 560
    mask.y = 90
    mask.zIndex = 8
    cards.addChild(mask)

    for(let i = 1; i <= 7; i++ ){
        setTimeout(() => {
            const reel = createCardsFromArr(gameDescriptor.reels[i], startX)
            cards.addChild(reel)
            startX += 115
        }, (i - 1) * i * data.animations.interval)
    }

    setTimeout(() =>{
        cards.removeChild(mask)
        cardsInDeck = createCardsFromArr(
            gameDescriptor.layout,
            330, 90,
            data.animations.defaultDeckSpeed,
            true,
            true
        )
        // cardsInDeck.sortableChildren = true
        cards.addChild(cardsInDeck)
    }, data.animations.deckDelay * 1000)

    return cards
}