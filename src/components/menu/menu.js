import {createBtn} from "./btns/btnCreator.js";
import {data} from '../../../data/data.js'
import {BACK_BTN, INGO_BTN, NEW_GAME_BTN, REPLAY_BTN, SOUND_BTN} from "../../constants/btns.js";
import {gameBegin} from "../../game/gameBegin.js";
import {textures} from "../../app.js";

export const menuCreator = () => {
    const menu = new PIXI.Container()

    const newGameBtn = createBtn(NEW_GAME_BTN, data.menu.newGameBtn.x, () => gameBegin(true))
    const replayBtn = createBtn(REPLAY_BTN, data.menu.replayBtn.x, () => gameBegin(false))
    const backBtn = createBtn(BACK_BTN, data.menu.backBtn.x)

    const soundBtn = createBtn(SOUND_BTN, data.menu.soundBtn.x)
    const infoBtn = createBtn(INGO_BTN, data.menu.infoBtn.x)

    menu.x = data.menu.x
    menu.y = data.menu.y
    menu.addChild(newGameBtn, replayBtn, backBtn, soundBtn, infoBtn)

    return menu
}