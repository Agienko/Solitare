import {game} from "../../app.js";
import {reloadDeck} from "../../sounds/sounds.js";

export const dealCardAnimation = () =>{

    reloadDeck.currentTime = 0
    reloadDeck.play()

    const reelDelayArr = [0, 0.1, 0.2, 0.4, 0.7, 1.1, 1.4]
    reelDelayArr.forEach((delay, i) => game.reels[i].animate(delay))
    game.deckClose.animate(1.6, unblockBtns)
    game.maskCard.hide(2.0)
    game.btns[0].block()
    game.btns[1].block()

    function unblockBtns() {
        game.btns[0].unblock()
        game.btns[1].unblock()
    }



}



