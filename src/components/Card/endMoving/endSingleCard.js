import {game} from "../../../app.js";
import {backCardSound, cardTake} from "../../../sounds/sounds.js";
import {isAtHome} from "../../../helpers/homeTranslateHelpers.js";
import {winAnimation} from "../../../animations/winAnimation/winAnimation.js";
import {isAtReel} from "../../../helpers/reelTranslateHelpers.js";
import {Reel} from "../../Reel.js";

export function endSingleCard(card, parent){

    let backCardFlag = true

    game.homes.forEach(home => {
        if (isAtHome(card, home)) {
            card.position.set(0, 0)
            cardTake.play()
            home.addChild(card)
            backCardFlag = false
            if (parent instanceof Reel && !parent.isEmpty()  ) parent.last().openAnim()
            winAnimation()
        }
    })

    game.reels.forEach(reel => {
        if (isAtReel(card, reel)) {
            card.position.set(0, reel.isEmpty() ? 0 : reel.last().y + 35)
            reel.addChild(card)
            cardTake.play()
            backCardFlag = false

            if (parent instanceof Reel && !parent.isEmpty()) parent.last().openAnim()
        }
    })

    if (backCardFlag) {
        backCardSound.currentTime = 0
        backCardSound.play()
        gsap.to(card, {
            pixi: {x: card.startX, y: card.startY},
            onStart:() => card.interactive = false,
            onComplete: () => {
                card.x = 0
                card.y = (parent instanceof Reel) ? 35 * (parent.children.length - 1) : 0
                backCardSound.pause()
                parent.addChild(card)
                card.interactive = true
                game.memory.remove()
            },
            duration: 0.2
        })
    }

}
