import {textures} from "../app.js";
import {GLOW} from "../constants/cards.js";



export class Glow extends PIXI.Sprite{
    constructor(params) {
        super(params)
        this.texture = textures[GLOW]
        this.position.set(-5, -5)

        this.alpha = 0.5
        this.visible = false
    }

}
