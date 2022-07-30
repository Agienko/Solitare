import {game} from "../../../app.js";
import {backCardSound, cardTake} from "../../../sounds/sounds.js";
import {isAtHome} from "../../../helpers/homeTranslateHelpers.js";
import {winAnimation} from "../../../animations/winAnimation/winAnimation.js";
import {isAtReel} from "../../../helpers/reelTranslateHelpers.js";
import {Reel} from "../../Reel.js";
import {Home} from "../../Home.js";
import {DeckOpen} from "../../DeckOpen.js";

export function endSingleCard(card, parent){

    let backCardFlag = true

    game.homes.forEach(home => {
        if (isAtHome(card, home)) {
            card.position.set(0, 0)
            cardTake.play()
            home.addChild(card)
            backCardFlag = false
            if (parent instanceof Reel && !parent.isEmpty()) parent.last().open()
            winAnimation()
        }
    })

    game.reels.forEach(reel => {
        if (isAtReel(card, reel)) {
            card.position.set(0, reel.isEmpty() ? 0 : reel.last().y + 35)
            reel.addChild(card)

            // memory.push(moveMemory)
            cardTake.play()

            backCardFlag = false
            if (parent instanceof Reel && !parent.isEmpty()) parent.last().open()
        }
    })

    if (backCardFlag) {
        backCardSound.currentTime = 0
        backCardSound.play()
        gsap.to(card, {
            pixi: {x: card.startX, y: card.startY},
            onComplete: () => {
                card.x = 0
                if (parent instanceof Home || parent instanceof DeckOpen){
                    card.y = 0
                } else {
                    card.y = 35 * (parent.children.length - 1);
                }
                backCardSound.pause()

                parent.addChild(card)

                game.memory.removeMove()

            },
            duration: 0.2
        })
    }

}
