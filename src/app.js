import {data} from '../data/data.js'
import {loader} from "./loader/loader.js";
import {menuCreator} from "./components/menu/menu.js";
import {backgroundContainer} from "./components/background/backgroundContainer.js";
import {createCard} from "./components/cards/createCard.js";
import {gameDescriptor} from "./game/game.js";
import {createCardsFromArr} from "./components/cards/createCardsFromArr.js";

export const app = new PIXI.Application(data.canvas)

loader.load((i, res) =>{

    gameDescriptor.newLayout()
    gameDescriptor.deal()
    const homes = gameDescriptor.homes
    const reels = gameDescriptor.reels

    const textures = res.atlas.textures

    const menu = menuCreator(textures)
    const background = backgroundContainer(textures)


    const homeOpen = new PIXI.Container()
    const homeStart = new PIXI.Container()


    const home1 = new PIXI.Container()
    const home2 = new PIXI.Container()
    const home3 = new PIXI.Container()
    const home4 = new PIXI.Container()


    const reel1 = createCardsFromArr(textures, reels[1], 330, 250)
    const reel2 = createCardsFromArr(textures, reels[2], 445, 250)
    const reel3 = createCardsFromArr(textures, reels[3], 560, 250)
    const reel4 = createCardsFromArr(textures, reels[4], 675, 250)
    const reel5 = createCardsFromArr(textures, reels[5], 790, 250)
    const reel6 = createCardsFromArr(textures, reels[6], 905, 250)
    const reel7 = createCardsFromArr(textures, reels[7], 1020, 250)
    const  homeClose = createCardsFromArr(textures, gameDescriptor.layout, 330, 90, 15, true)

    const all = new PIXI.Container()
    all.addChild(reel1, reel2, reel3, reel4, reel5, reel6, reel7, homeClose)


    console.log( gameDescriptor._layoutSafe)
    app.stage.addChild(menu,background, all)
    });

root.appendChild(app.view)


