import {textures} from "../app.js";
import {data} from "../../data/data.js";
import {mainMusic, winMusic} from "../sounds/sounds.js";

export class Btn extends PIXI.Container{

    constructor(name, x = 0, callback = () =>{console.log('no func')}) {
        super()
        this.sprite = new PIXI.Sprite(textures[name])
        this.sprite.anchor.set(0.5)
        this.zIndex = 300
        this.mask = new PIXI.Graphics()
        this.mask.beginFill(0x000000)
        this.mask.drawCircle(0, 0, data.btns.maskRadius)
        this.mask.endFill()


        this.point = new PIXI.Graphics()

        this.point.beginFill(0x000000);
        this.point.drawRect(-50, -10, 100, 20);
        this.point.endFill();
        this.point.angle = -45
        this.point.alpha = 0.7
        this.point.visible = false

        this.sprite.mask = this.mask
        this.addChild(this.sprite, this.mask, this.point)
        this.position.set(x, data.btns.y)

        this.alpha = data.btns.startAlpha
        this.interactive = true;
        this.buttonMode = true;

        this.scale.set(data.btns.scale)
        this.on('pointerover', this.onOver);
        this.on('pointerout', this.onOut);
        this.on('pointerdown', callback);
    }
    onOver(){
        gsap.to(this, data.btns.onOver)
    }
    onOut(){
        gsap.to(this, data.btns.onOut)
    }
    toggleSound(){
        this.point.visible ? mainMusic.play() : mainMusic.pause();
        !this.point.visible && winMusic.pause()
        this.point.visible = !this.point.visible
    }
}
