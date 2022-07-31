import {app, game} from "../../app.js";
import {animationData} from "../../../data/animationData.js";

let data = animationData.winAnimation.winTextAnim

export function winTextAnim(container, delay) {

    const style = new PIXI.TextStyle(data.style);

    const text = new PIXI.Text('YOU WIN!', style);
    text.anchor.set(0.5)

    container.x = app.screen.width / 2;
    container.y = app.screen.height / 2;
    container.addChild(text)
    container.zIndex = data.zIndex
    container.interactive = true
    container.buttonMode = true
    container.on('pointerdown', game.newGame.bind(game))

    gsap.from(container,{ ...data.beginAnimation, delay: delay,
        onComplete: () => gsap.to(container, data.onCompleteAnimation)
    })
}
