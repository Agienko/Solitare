import {app} from "../../../app.js";

export const startCortage = (currentCard, parent) => {

    currentCard.cortaging = true
    let cortageSize = parent.children.indexOf(currentCard) - parent.children.length

    currentCard.parentY = parent.children[parent.children.indexOf(currentCard)].y
    currentCard.cortage = [...parent.children.slice(cortageSize)]

    app.stage.addChild(...currentCard.cortage)

    currentCard.cortage.forEach((card, i) => {
        card.x = currentCard.parentX
        card.y = currentCard.parentY + 170 + i * 35
        card.zIndex = 10
    })
}
