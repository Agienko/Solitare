import {game} from "../../../app.js";
import {isAtReel} from "../../../helpers/reelTranslateHelpers.js";
import {backCardSound, cardTake} from "../../../sounds/sounds.js";
import {Reel} from "../../Reel.js";

export function endCortage(currentCard, parent) {

    let backCortageFlag = true

    game.reels.forEach(reel => {
        if (isAtReel(currentCard, reel)) {
            currentCard.cortage.forEach((card, i) => {
                card.position.set(0, reel.isEmpty() ? 0 : reel.last().y + 35)
                reel.addChild(card)
                cardTake.play()
            })
            currentCard.cortage = []
            currentCard.cortaging = false
            backCortageFlag = false

            if (parent instanceof Reel && !parent.isEmpty()) parent.last().open()
        }
    })

    if (backCortageFlag) {
        backCardSound.currentTime = 0
        backCardSound.play()
        currentCard.cortage.forEach((card, i) => {
            gsap.to(card, {
                pixi: {x: currentCard.startX, y: currentCard.startY + i * 35,},
                onComplete: () => {
                    card.x = 0
                    card.y = 35 * (parent.children.length - 1);
                    backCardSound.pause()
                    parent.addChild(card)

                    currentCard.cortage = []
                    currentCard.cortaging = false
                },
                duration: 0.2
            })
        })
    }

}
