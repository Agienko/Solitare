import {data} from '../data/data.js'
import {loader} from "./loader/loader.js";
import {menuCreator} from "./components/menu/menu.js";
import {backgroundContainer} from "./components/background/backgroundContainer.js";
import {gameDescriptor} from "./game/gameDescriptor.js";
import {addAnimatedCards} from "./components/cards/addAnimatedCards.js";
import {gameBegin} from "./game/gameBegin.js";

export let textures
export const app = new PIXI.Application(data.canvas)

loader.load((i, res) => {
    document.body.style.opacity = 1
    textures = res.atlas.textures
    gameBegin(true)
    })

root.appendChild(app.view)



