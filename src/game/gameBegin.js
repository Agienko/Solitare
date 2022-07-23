import {gameDescriptor} from "./gameDescriptor.js";
import {menuCreator} from "../components/menu/menu.js";
import {backgroundContainer} from "../components/background/backgroundContainer.js";
import {addAnimatedCards} from "../components/cards/addAnimatedCards.js";
import {app} from "../app.js";

export function gameBegin(newG = false) {
    app.stage.removeChildren();

    newG ? gameDescriptor.newGame() : gameDescriptor.replayGame()
    gameDescriptor.deal()

    const menu = menuCreator()
    const background = backgroundContainer()
    const cards = addAnimatedCards()

    app.stage.addChild(menu, background, cards)

}