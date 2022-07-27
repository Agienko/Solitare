import {app, textures} from "../app.js";
import {BACK_CARD} from "../constants/cards.js";
import {data} from "../../data/data.js";

export class MaskCard extends PIXI.Sprite{
    constructor(params) {
        super(params)
        this.texture = textures[BACK_CARD]
        this.scale.set(0.6)
        this.position.set(data.cards.startPositionX, data.cards.startPositionY)
        app.stage.addChild(this)
        app.stage.sortableChildren = true
        this.zIndex = 200
    }
    hide(delay){
        setTimeout(() => this.visible = false, delay*1000)
    }
}
