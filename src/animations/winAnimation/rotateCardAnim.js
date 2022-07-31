import {game, textures} from "../../app.js";
import {animationData} from "../../../data/animationData.js";

let data = animationData.winAnimation.rotateCardAnim

export const rotateCardAnim = (container, delay = 0, y = 100 , toRight = true) => {

    container.zIndex = data.zIndex
    let cardNames = game.deck.saveTextures
    let randomTexture = cardNames[Math.floor(Math.random()*52)]
    let card = new PIXI.Sprite(textures[randomTexture])
    card.anchor.set(0.5)
    card.scale.set(0.6)
    card.position.set(-100, y)
    container.addChild(card)

    let rotation = gsap.to(card,{
        pixi:{angle: toRight ? 360 : -360},
        ...data.rotation
    })

    if(toRight){
        gsap.to(card,{
            ...data.move, delay: delay,
            onComplete(){
                rotation.pause()
                card.destroy()
            },

        })
    } else {
        gsap.from(card,{
            ...data.move, delay: delay,
            onComplete(){
                rotation.pause()
                card.destroy()
            }
        })
    }

}
