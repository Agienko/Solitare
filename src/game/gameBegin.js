
import {app, game} from "../app.js";


export const gameBegin = newG => {
    app.stage.removeChildren();

    newG ? game.newGame() : game.replayGame()
    game.deal()

    game.btns.map(btn => btn.addToStage())


    app.stage.addChild( background, cards)

}
