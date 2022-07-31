import {game, textures} from "../../app.js";
import {randomMinMax} from "../../common/randMinMax.js";
import {animationData} from "../../../data/animationData.js";

let data = animationData.winAnimation.dropCardsAnim

export const dropCardsAnim = (container, delay = 0, x = 500, y = 200 ) => {

    let cardNames = game.deck.saveTextures
    container.zIndex = data.zIndex

    for(let i = 0; i < data.cardsCount; i++){

        let randomTexture = cardNames[Math.floor(Math.random()*52)]

        let card = new PIXI.Sprite(textures[randomTexture])
        card.visible = false
        card.anchor.set(0.5)
        card.scale.set(0.6)
        card.position.set(x, y)

        container.addChild(card)
    }

    container.children.forEach(card =>{
        gsap.to(card,{
            pixi:{
                x: card.x + randomMinMax(...data.minMaxX),
                y: card.y + randomMinMax(...data.minMaxY),
                angle: 180*Math.random()},
            delay: delay,
            duration: data.duration,
            ease: data.ease,
            onStart:() => card.visible = true
        })
    })

}
