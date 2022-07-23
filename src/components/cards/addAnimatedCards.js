import {createCardsFromArr} from "./createCardsFromArr.js";
import {game} from "../../game/game.js";

export function addAnimatedCards (textures){
    const cards = new PIXI.Container()
    let startX = 330

    for(let i = 1; i <= 7; i++ ){
        setTimeout(() => {
            const reel = createCardsFromArr(textures, game.reels[i], startX)
            cards.addChild(reel)
            startX += 115
        }, (i-1)*i*50)
    }

    setTimeout(() =>{
        const  elseCardsToDeck = createCardsFromArr(textures, game.layout, 330, 90, 22, true)
        cards.addChild(elseCardsToDeck)
    }, 2900)

    return cards
}