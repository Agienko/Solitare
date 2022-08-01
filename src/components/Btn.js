import {textures} from "../app.js";
import {data} from "../../data/data.js";
import {clickSound} from "../sounds/sounds.js";

export class Btn extends PIXI.Container{

    constructor(name, x, y , callback) {
        super()

        this.callback = callback

        this.sprite = new PIXI.Sprite(textures[name])
        this.sprite.anchor.set(0.5)

        this.mask = new PIXI.Graphics()
        this.mask.beginFill(0x000000)
        this.mask.drawCircle(0, 0, data.btns.maskRadius)
        this.mask.endFill()

        this.sprite.mask = this.mask

        this.point = new PIXI.Graphics()
        this.point.beginFill(0x000000);
        this.point.drawRect(-50, -10, 100, 20);
        this.point.endFill();
        this.point.angle = -45
        this.point.alpha = 0.7
        this.point.visible = false

        this.position.set(x, y)
        this.scale.set(data.btns.scale)
        this.zIndex = 300
        this.alpha = data.btns.startAlpha

        this.interactive = true;
        this.buttonMode = true;

        this.addChild(this.sprite, this.mask, this.point)

        this.on('pointerover', this.onOver)
            .on('pointerout', this.onOut)
            .on('pointerdown', this.onDown)
            .on('pointerup', this.onUp)
    }

    onDown(){
        clickSound.currentTime = 0
        clickSound.play()
        this.callback()
    }

    onUp(){
        clickSound.pause()
    }

    onOver(){
        gsap.to(this, data.btns.onOver)
    }

    onOut(){
        gsap.to(this, data.btns.onOut)
    }

    togglePoint(){
        this.point.visible = !this.point.visible
    }

    block(){
        this.interactive = false
    }

    unblock(){
        this.interactive = true
    }

}
