import {gameDescriptor} from "./gameDescriptor.js";

import {backgroundCreator} from "../components/background/backgroundCreator.js";
import {addAnimatedCards} from "../components/cards/addAnimatedCards.js";
import {app} from "../app.js";


export const gameBegin = newG => {
    app.stage.removeChildren();

    newG ? gameDescriptor.newGame() : gameDescriptor.replayGame()
    gameDescriptor.deal()

    gameDescriptor2.btns.map(btn => btn.addToStage())
    const background = backgroundCreator()
    const cards = addAnimatedCards()

    app.stage.addChild( background, cards)

}
