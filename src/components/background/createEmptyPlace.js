import {createBgSprite} from "./bgTextureCreator.js";
import {EMPTY} from "../../constants/background.js";
import {data} from "../../../data/data.js";
import {GLOW} from "../../constants/cards.js";
import {gameDescriptor} from "../../game/gameDescriptor.js";
import {cardsInDeck} from "../cards/addAnimatedCards.js";
import {textures} from "../../app.js";
import {glowBorderCreator} from "../glowBorderCreator/glowBorderCreator.js";

export function createEmptyPlace() {

    const empty = createBgSprite(EMPTY, data.background.startDownX, data.background.y)

    const glow = glowBorderCreator(GLOW)

    onOut()

    empty.addChild(glow)

    empty.interactive = true
    empty.buttonMode = true
    empty
        .on('pointerdown', onDown)
        .on('pointerover', onOver)
        .on('pointerout', onOut);

    function onDown(){
        if(gameDescriptor.isLayoutEmpty()){
            cardsInDeck.children.reverse().map(i => {
                i.texture = textures['back']
                i.inDeck = true
            })
            gsap.to(cardsInDeck.children, {pixi:{x: this.x }, duration: 0.05, stagger: 0.01})
            gameDescriptor.translateFromOpen()
        }
    }
    function onOver(){
        glow.visible = true
        glow.alpha = 0.5
    }

    function onOut(){
        glow.visible = false
        glow.alpha = 0
    }
    return empty
}