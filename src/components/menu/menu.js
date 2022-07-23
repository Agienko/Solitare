import {createBtn} from "./btns/btnCreator.js";
import {data} from '../../../data/data.js'
import {BACK_BTN, INGO_BTN, NEW_GAME_BTN, REPLAY_BTN, SOUND_BTN} from "../../constants/btns.js";
import {newGame, replayGame} from "../../app.js";

export const menuCreator = textures => {
    const menu = new PIXI.Container()

    const newGameBtn = createBtn(textures[NEW_GAME_BTN], data.menu.newGameBtn.x, newGame)
    const replayBtn = createBtn(textures[REPLAY_BTN], data.menu.replayBtn.x, replayGame)
    const backBtn = createBtn(textures[BACK_BTN], data.menu.backBtn.x)

    const soundBtn = createBtn(textures[SOUND_BTN], data.menu.soundBtn.x)
    const infoBtn = createBtn(textures[INGO_BTN], data.menu.infoBtn.x)

    menu.x = data.menu.x
    menu.y = data.menu.y
    menu.addChild(newGameBtn, replayBtn, backBtn, soundBtn, infoBtn)

    return menu
}