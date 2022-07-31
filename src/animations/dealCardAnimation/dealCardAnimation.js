import {game} from "../../app.js";
import {reloadDeck} from "../../sounds/sounds.js";
import {animationData} from "../../../data/animationData.js";

export const dealCardAnimation = () =>{
    let data = animationData.dealCardAnimation
    reloadDeck.currentTime = 0
    reloadDeck.play()

    const reelDelayArr = data.reelDelayArr
    reelDelayArr.forEach((delay, i) => game.reels[i].animate(delay))
    game.deckClose.animate(data.deckCloseAnimationDelay, unblockBtns)
    game.maskCard.hide(data.maskCardDelay)
    game.btns[0].block()
    game.btns[1].block()

    function unblockBtns() {
        game.btns[0].unblock()
        game.btns[1].unblock()
    }



}



