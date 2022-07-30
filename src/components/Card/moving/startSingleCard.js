import {app, game} from "../../../app.js";

export const startSingleCard = (card, parent) => {

    game.memory.addMove(card, parent)

    card.position.set(card.parentX, card.parentY)
    app.stage.addChild(card)
    card.zIndex = 10
}
