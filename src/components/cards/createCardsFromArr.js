import {createCard} from "./createCard.js";
import {data} from "../../../data/data.js";

export const createCardsFromArr =
    (textures, arrCards, toX, toY = 250,
     speed = data.animations.defaultDistSpeed,
     isFan = false,
     inDeck = false
    ) => {

    let counter = 0
    const container = new PIXI.Container()
    for(let i = 0; i < arrCards.length; i++){
        let name = textures[arrCards[i][0]]
        let isOpen = arrCards[i][1]
        const card = createCard(textures, name, isOpen, inDeck)
        card.x = 560;
        card.y = 90

        container.addChild(card)
        gsap.to(card, {
            pixi: {x: toX, y: toY + ( isFan ? 0 : counter * 35 )},
            duration: data.animations.duration,
            delay: ++counter/speed,
            ease: 'Expo.easeOut'
        })
    }

    return container
}