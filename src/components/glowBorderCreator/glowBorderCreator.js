import {textures} from "../../app.js";

export const glowBorderCreator = name => {
    const glow = new PIXI.Sprite(textures[name])
    glow.anchor.set(0.5)
    return glow
}