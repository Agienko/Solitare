import {data} from '../../../../data/data.js'
 export const createBtn = (name, x = 0, callback = () =>{console.log('empty')}) => {

        const container = new PIXI.Container()
        let sprite = new PIXI.Sprite(name)
        sprite.anchor.set(0.5)

        const mask = new PIXI.Graphics()
        mask.beginFill(0x000000)
        mask.drawCircle(0, 0, data.menu.btns.maskRadius)
        mask.endFill()

        sprite.mask = mask

        container.addChild(sprite, mask)
        container.x = x
        container.alpha = 0.9
        container.interactive = true;
        container.buttonMode = true;

        container.on('pointerover', () => gsap.to(container, data.menu.btns.onOver));
        container.on('pointerout', () => gsap.to(container, data.menu.btns.onOut));
        container.on('pointerdown', callback);
        container.scale.set(data.menu.btns.scale)

        return container
    }
