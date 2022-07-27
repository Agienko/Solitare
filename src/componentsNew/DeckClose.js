import {textures} from "../app.js";
import {EMPTY} from "../constants/background.js";
import {Glow} from "./Glow.js";

export class DeckClose extends PIXI.Container{
    constructor() {
        super()
        this.position.set(260, 10)
        this.empty = new PIXI.Sprite(textures[EMPTY])
        this.empty.scale.set(0.6)
        this.addChild(this.empty)

        this.glow = new Glow()
        this.glow.scale.set(0.6)
        this.glow.position.set(-2, -2)
        this.addChild(this.glow)

        this.interactive = true
        this.buttonMode = true
        this
            .on('pointerdown', this.onDown)
            .on('pointerover', this.onOver)
            .on('pointerout', this.onOut)
    }
    animate(delay){
        gsap.from(this.children.slice(1), {
            pixi:{x: 230},
            delay: delay,
            stagger: 0.05 ,
            ease:'Expo.easeOut',
            duration: 0.5,
        })
    }
    onDown(){

    }
    onOver(){
        this.glow.visible = true
        this.glow.alpha = 0.5
    }
    onOut(){
        this.glow.visible = false
        this.glow.alpha = 0
    }
}
