import {createCardsFromArr} from "./createCardsFromArr.js";
import {game} from "../../game/game.js";
import {data} from "../../../data/data.js";
import {BACK_CARD} from "../../constants/cards.js";
import {createCard} from "./createCard.js";


export let cardsInDeck

export function addAnimatedCards (textures){
    const cards = new PIXI.Container()
    cards.sortableChildren = true
    let startX = 330

    const mask = createCard(textures, BACK_CARD, false, false)
    mask.x = 560
    mask.y = 90
    mask.zIndex = 2
    cards.addChild(mask)

    for(let i = 1; i <= 7; i++ ){
        setTimeout(() => {
            const reel = createCardsFromArr(textures, game.reels[i], startX)
            cards.addChild(reel)
            startX += 115
        }, (i - 1) * i * data.animations.interval)
    }

    setTimeout(() =>{
        console.log('in....')
        mask.destroy()
        cardsInDeck = createCardsFromArr(
            textures,
            game.layout,
            330, 90,
            data.animations.defaultDeckSpeed,
            true,
            true
        )
        cards.addChild(cardsInDeck)
    }, data.animations.deckDelay * 1000)

    return cards
}