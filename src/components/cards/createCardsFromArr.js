import {createCard} from "./createCard.js";


export const createCardsFromArr =
    (textures, arrCards, toX, toY = 250, speed = 8, isFan = false) =>{
    let counter = 0
    const container = new PIXI.Container()
    for(let i = 0; i < arrCards.length; i++){
        let name = textures[arrCards[i][0]]
        const card = createCard(name)
        card.x = 560;
        card.y = 90


        container.addChild(card)
        gsap.to(card, {
            pixi: {x: toX, y: toY + ( isFan ? 0 : counter * 35 )},
            duration: 1,
            delay: ++counter/speed,
            ease: 'Expo.easeOut'
        })
    }


    return container
}