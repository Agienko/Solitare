import {createBgSprite} from "./bgTextureCreator.js";
import {BASE_FOUNDATION, BASE_GRADIENT, EMPTY} from "../../constants/background.js";
import {data} from "../../../data/data.js";

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
    container.addChild(empty)

    return container
}