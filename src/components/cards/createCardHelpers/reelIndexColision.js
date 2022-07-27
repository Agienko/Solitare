import {colision} from "../../../common/colision.js";
import {cards} from "../addAnimatedCards.js";

export const reelIndexColision = card => {
    const indexArr = []
    for(let i = 0; i < 7; i++){
        indexArr[i] = colision(card, cards.children[i]) ? i: -1
    }
    const arrCurrent = indexArr.filter(i => i >= 0)
    if (arrCurrent.length === 2) {
        let distance1 = cards.children[arrCurrent[0]].getBounds().x - card.getBounds().x
        let distance2 = cards.children[arrCurrent[1]].getBounds().x - card.getBounds().x
        return (distance1  > distance2 ) ? arrCurrent[1] : arrCurrent[0]
    }
    return arrCurrent.length === 0 ? -1 : arrCurrent[0]
}