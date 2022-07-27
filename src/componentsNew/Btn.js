import {app, textures} from "../app.js";
import {data} from "../../data/data.js";

export class Btn extends PIXI.Container{

    constructor(name, x = 0, callback = () =>{console.log('no func')}) {
        super()
        this.sprite = new PIXI.Sprite(textures[name])
        this.sprite.anchor.set(0.5)

        this.mask = new PIXI.Graphics()
        this.mask.beginFill(0x000000)
        this.mask.drawCircle(0, 0, data.btns.maskRadius)
        this.mask.endFill()

        this.sprite.mask = this.mask
        this.addChild(this.sprite, this.mask)
        this.x = x
        this.y = data.btns.y
        this.alpha = 0.9
        this.interactive = true;
        this.buttonMode = true;

        this.on('pointerover', () => gsap.to(this, data.btns.onOver));
        this.on('pointerout', () => gsap.to(this, data.btns.onOut));
        this.on('pointerdown', callback);
        this.scale.set(data.btns.scale)
    }
    addToStage(){
        app.stage.addChild(this)
    }

}
