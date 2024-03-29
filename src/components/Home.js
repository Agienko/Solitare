import {data} from "../../data/data.js";
import {textures} from "../app.js";
import {BASE_FOUNDATION} from "../constants/constants.js";

export class Home extends PIXI.Container{

    constructor(number) {
        super()
        this.x = data.homes.startX + (number - 1) * data.homes.step
        this.y = data.homes.y
        this.emptyImage = new PIXI.Sprite(textures[BASE_FOUNDATION])
        this.emptyImage.scale.set(data.cards.scale)
        this.addChild(this.emptyImage)
    }

    last(){
        return this.children[this.children .length -1]
    }

    isEmpty(){
        return this.children.length === 1
    }

    isFool(){
        return this.children.length  === 14
    }

}

