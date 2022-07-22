import {createBtn} from "./btns/btnCreator.js";
import {data} from '../../../data/data.js'

export const menuCreator = textures => {
    const menu = new PIXI.Container()

    const newGameBtn = createBtn(textures['new_game_btn'], data.menu.newGameBtn.x)
    const replayBtn = createBtn(textures['replay_btn'], data.menu.replayBtn.x)
    const backBtn = createBtn(textures['back_btn'], data.menu.backBtn.x)

    const soundBtn = createBtn(textures['sound_btn'], data.menu.soundBtn.x)
    const infoBtn = createBtn(textures['info_btn'], data.menu.infoBtn.x)

    menu.y = data.menu.defaultY
    menu.addChild(newGameBtn, replayBtn, backBtn, soundBtn, infoBtn)

    return menu
}