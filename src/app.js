import {data} from '../data/data.js'
import {loader} from "./loader/loader.js";
import {menuCreator} from "./components/menu/menu.js";
import {backgroundContainer} from "./components/background/backgroundContainer.js";
import {game} from "./game/game.js";
import {addAnimatedCards} from "./components/cards/addAnimatedCards.js";

const app = new PIXI.Application(data.canvas)

loader.load((i, res) =>{

    game.newLayout()
    game.deal()

    const textures = res.atlas.textures

    const menu = menuCreator(textures)
    const background = backgroundContainer(textures)
    const cards = addAnimatedCards(textures)

    app.stage.addChild(menu, background, cards)
    console.log(game)
    });

root.appendChild(app.view)


