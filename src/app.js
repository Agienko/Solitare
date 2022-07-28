import {data} from '../data/data.js'
import {loader} from "./loader/loader.js";
import {Game} from "./game/gameDescriptor.js";

export let  game, textures
export const app = new PIXI.Application(data.canvas)

loader.load((i, res) => {
    document.body.style.opacity = 1
    textures = res.atlas.textures
    game = new Game()
    game.init()
    })

root.appendChild(app.view)




