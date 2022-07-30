import {app, game} from "../../app.js";

export function winTextAnim(container, delay) {

    const style = new PIXI.TextStyle({
        fontFamily: 'serif',
        fontSize: 200,
        fontWeight: 'bold',
        fill: ['#eae108', '#01ab1d'], // gradient
        stroke: '#2d2902',
        strokeThickness: 8,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 8,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 12,
        wordWrap: true,
        wordWrapWidth: 540,
        lineJoin: 'round',
    });

    const text = new PIXI.Text('YOU WIN!', style);
    text.anchor.set(0.5)

    container.x = app.screen.width / 2;
    container.y = app.screen.height / 2;
    container.addChild(text)
    container.zIndex = 500
    container.interactive = true
    container.buttonMode = true
    container.on('pointerdown', game.newGame.bind(game))

    gsap.from(container,{
        pixi:{scale: 0, alpha: 0},
        delay: delay,
        duration: 1.67,
        ease:'Back.easeOut',
        onComplete(){
            gsap.to(container,
                {pixi: {scale: 1.1},
                    duration: 0.57,
                    yoyo: true,
                    repeat: -1,
                    ease:'Sine.easeInOut'})
        }
    })
}
