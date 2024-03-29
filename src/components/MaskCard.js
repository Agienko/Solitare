import {textures} from "../app.js";
import {BACK_CARD} from "../constants/constants.js";
import {data} from "../../data/data.js";

export class MaskCard extends PIXI.Sprite{

    constructor(params) {
        super(params)
        this.texture = textures[BACK_CARD]
        this.scale.set(data.cards.scale)
        this.position.set(data.cards.startPositionX, data.cards.startPositionY)
        this.zIndex = data.maskCard.zIndex
    }

    hide(delay){
        setTimeout(() => this.visible = false, delay*1000)
    }

}
