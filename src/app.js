import {data} from '../data/data.js'
import {loader} from "./loader/loader.js";

import {menuCreator} from "./components/menu/menu.js";

import {backgroundContainer} from "./components/background/backgroundContainer.js";

export let app = new PIXI.Application(data.canvas)

loader.load((i, res) =>{
    const textures = res.atlas.textures
    const menu = menuCreator(textures)
    const background = backgroundContainer(textures)



    app.stage.addChild(menu,background)



    });

function addToGame(textures){

}




root.appendChild(app.view)

