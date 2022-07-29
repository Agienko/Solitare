import {textures} from "../app.js";
import {GLOW} from "../constants/constants.js";
import {data} from "../../data/data.js";

export class Glow extends PIXI.Sprite{

    constructor(params) {
        super(params)
        this.texture = textures[GLOW]
        this.position.set(data.glow.position.x, data.glow.position.y)

        this.alpha = data.glow.alpha
        this.visible = false
    }

}
