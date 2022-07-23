import {createBgSprite} from "./bgTextureCreator.js";
import {BASE_FOUNDATION, BASE_GRADIENT, EMPTY} from "../../constants/background.js";
import {data} from "../../../data/data.js";
import {createEmptyPlace} from "./createEmptyPlace.js";

export const backgroundContainer = () => {

    const container = new PIXI.Container()

    let startUpX = data.background.startUpX
    for (let i = 0; i < 4; i++){
        const base = createBgSprite(BASE_FOUNDATION, startUpX, data.background.y)
        startUpX += data.background.step
        container.addChild(base)
    }

    let startDownX = data.background.startDownX
    for (let i = 0; i < 7; i++){
        const base = createBgSprite(BASE_GRADIENT, startDownX, 250)
        startDownX += data.background.step
        container.addChild(base)
    }

    const empty = createEmptyPlace()
    container.addChild(empty)

    return container
}


