import {game, textures} from "../../app.js";
import {randomMinMax} from "../../common/randMinMax.js";

export const dropCardsAnim = (container, delay = 0, x = 500, y = 200 ) => {

    container.zIndex = 200
    let cardNames = game.deck.saveTextures
    for(let i = 0; i < 12; i++){
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
            pixi:{x: card.x + randomMinMax(-140, 140), y: card.y + randomMinMax(-100, 100), angle: 180*Math.random()},
            delay: delay,
            duration: 1.16,
            ease:'Power4.easeOut',
            onStart(){
                card.visible = true
            }
        })
    })

}
