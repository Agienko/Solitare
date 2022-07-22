import {data} from "../../../data/data.js";

export const createBgSprite = (name, x = 0, y = 0) => {

    const sprite = new PIXI.Sprite(name)
    sprite.anchor.set(0.5)
    sprite.x = x
    sprite.y = y
    sprite.scale.set(data.background.scale)

    return sprite
}