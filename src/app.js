import {data} from '../data/data.js'
import {loader} from "./loader/loader.js";
import {gameBegin} from "./game/gameBegin.js";
import {gameCreator} from "./game/gameDescriptor.js";

import {BACK_BTN, NEW_GAME_BTN, REPLAY_BTN} from "./constants/btns.js";



export let textures, game
export const app = new PIXI.Application(data.canvas)

loader.load((i, res) => {
    // document.body.style.opacity = 1
    textures = res.atlas.textures
    // gameBegin(true)
    game = gameCreator()
    game.btns.map(btn => btn.addToStage())
        game.init()
    })

root.appendChild(app.view)




