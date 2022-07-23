import {data} from "../../../data/data.js";
import {textures} from "../../app.js";

export const createBgSprite = (name, x = 0, y = 0) => {

    const sprite = new PIXI.Sprite(textures[name])
    sprite.anchor.set(0.5)
    sprite.x = x
    sprite.y = y
    sprite.scale.set(data.background.scale)

    return sprite
}