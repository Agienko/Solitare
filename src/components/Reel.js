import {data} from "../../data/data.js";
import {textures} from "../app.js";
import {BASE_GRADIENT} from "../constants/constants.js";

export class Reel extends PIXI.Container{

    constructor(number) {
        super()
        this.number = number

        this.x = data.reels.startX + (number - 2) * data.reels.step
        this.y = data.reels.y

        this.emptyImage = new PIXI.Sprite(textures[BASE_GRADIENT])
        this.emptyImage.scale.set(data.cards.scale)
        this.addChild(this.emptyImage)
    }

    animate(delay = 0){
        return gsap.from(this.children.slice(1), {
            pixi:{
                x: this.x + 200 - 230*this.number,
                y:  this.y - 330
            },
            delay: delay,
            stagger: 0.07 ,
            ease:'Expo.easeOut',
            duration: this.children.slice(1).length/7,
        })
    }

    verticalAlignCards(){
        this.children.forEach((card, i) => card.y = i > 0 ? (i - 1 ) * 35 : 0)
    }

    isEmpty(){
      return this.children.length === 1
    }

    last() {
        if (!this.isEmpty()) {
            return this.children[this.children.length - 1]
        }
    }

}
