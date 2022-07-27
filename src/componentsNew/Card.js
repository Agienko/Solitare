import {textures} from "../app.js";
import {BACK_CARD, GLOW} from "../constants/cards.js";
import {Glow} from "./Glow.js";

export class Card extends PIXI.Sprite{
    constructor(params) {
        super(params)
        this.openTexture = this.texture
        this.scale.set(0.6)
        this.close()

        this.glow = new Glow()
        this.addChild(this.glow)

        this
            // .on('pointerdown', onDragStart)
            // .on('pointerup', onDragEnd)
            // .on('pointerupoutside', onDragEnd)
            // .on('pointermove', onDragMove)
            // .on('pointerover', onOver)
            // .on('pointerout', onOut)
            .on('pointerover', this.onOver)
            .on('pointerout', this.onOut)
    }

    open(){
        this.texture = this.openTexture
        this.interactive = true
        this.buttonMode = true
    }
    close(){
        this.texture = textures[BACK_CARD]
        this.interactive = false
        this.buttonMode = false
    }
    onOver(){
        this.glow.visible = true
        this.glow.alpha = 0.5
    }
    onOut(){
        this.glow.visible = false
        this.glow.alpha = 0
    }
}
