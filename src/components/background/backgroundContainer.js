import {createBgSprite} from "./bgTextureCreator.js";
import {BASE_FOUNDATION, BASE_GRADIENT, EMPTY} from "../../constants/background.js";
import {data} from "../../../data/data.js";
import {GLOW} from "../../constants/cards.js";
import {game} from "../../game/game.js";
import { cardsInDeck} from "../cards/addAnimatedCards.js";


export const backgroundContainer = textures => {

    const container = new PIXI.Container()

    let startUpX = data.background.startUpX
    for (let i = 0; i < 4; i++){
        const base = createBgSprite(textures[BASE_FOUNDATION], startUpX, data.background.y)
        startUpX += data.background.step
        container.addChild(base)
    }


    let startDownX = data.background.startDownX
    for (let i = 0; i < 7; i++){
        const base = createBgSprite(textures[BASE_GRADIENT], startDownX, 250)
        startDownX += data.background.step
        container.addChild(base)
    }

    const empty = createBgSprite(textures[EMPTY], data.background.startDownX, data.background.y)

    const glow = new PIXI.Sprite(textures[GLOW])

    glow.anchor.set(0.5)
    glow.visible = false
    glow.alpha = 0

    empty.addChild(glow)

    empty.interactive = true
    empty.buttonMode = true
    empty
        .on('pointerdown', onDown)
        .on('pointerover', onOver)
        .on('pointerout', onOut);

    function onDown(){
    if(game.isLayoutEmpty()){
        cardsInDeck.children.reverse().map(i => {
            i.texture = textures['back']
            i.inDeck = true
        })
        gsap.to(cardsInDeck.children, {pixi:{x: this.x }, duration: 0.05, stagger: 0.01})
        game.translateFromOpen()
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

    container.addChild(empty)

    return container
}