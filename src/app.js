import {data} from '../data/data.js'
import {loader} from "./loader/loader.js";
import {Game} from "./game/GameDescriptor.js";

export let  game, textures
export const app = new PIXI.Application(data.canvas)
app.stage.sortableChildren = true

loader.load((_, res) => {
    document.body.style.opacity = 1
    textures = res.atlas.textures
    game = new Game()
    game.init()
    })

root.appendChild(app.view)




