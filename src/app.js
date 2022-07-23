import {data} from '../data/data.js'
import {loader} from "./loader/loader.js";
import {menuCreator} from "./components/menu/menu.js";
import {backgroundContainer} from "./components/background/backgroundContainer.js";
import {game} from "./game/game.js";
import {addAnimatedCards} from "./components/cards/addAnimatedCards.js";

export let textures
const app = new PIXI.Application(data.canvas)

loader.load((i, res) => {
    textures = res.atlas.textures
   newGame(textures)
    })

root.appendChild(app.view)



export function newGame() {
    app.stage.removeChildren()
    game.newGame()
    game.deal()
    const menu = menuCreator(textures)
    const background = backgroundContainer(textures)
    const cards = addAnimatedCards(textures)

    app.stage.addChild(menu, background, cards)
    console.log(game)
}
export function replayGame() {
    app.stage.removeChildren()
    game.replayGame()
    game.deal()
    const menu = menuCreator(textures)
    const background = backgroundContainer(textures)
    const cards = addAnimatedCards(textures)

    app.stage.addChild(menu, background, cards)
    console.log(game)
}
