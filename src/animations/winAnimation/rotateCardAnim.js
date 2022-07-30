import {game, textures} from "../../app.js";

export const rotateCardAnim = (container, delay = 0, y = 100 , toRight = true) => {

    container.zIndex = 201
    let cardNames = game.deck.saveTextures
    let randomTexture = cardNames[Math.floor(Math.random()*52)]
    let card = new PIXI.Sprite(textures[randomTexture])
    card.anchor.set(0.5)
    card.scale.set(0.6)
    card.position.set(-100, y)
    container.addChild(card)

    let rotation = gsap.to(card,{
        pixi:{angle: toRight ? 360 : -360},
        duration: 2.33,
        ease:'Linear.easeInOut',
        repeat: -1
    })

    if(toRight){
        gsap.to(card,{pixi:{x:1400}, delay: delay, duration: 3.5, ease:'Linear.easeInOut',
            onComplete(){
                rotation.pause()
                card.destroy()
            }
        })
    } else {
        gsap.from(card,{pixi:{x:1400}, delay: delay, duration: 3.5, ease:'Linear.easeInOut',
            onComplete(){
                rotation.pause()
                card.destroy()
            }
        })
    }

}
