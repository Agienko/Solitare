import {BACK_CARD, GLOW} from "../../constants/cards.js";
import {gameDescriptor} from "../../game/gameDescriptor.js";
import {cards} from "./addAnimatedCards.js";
import {colision} from "../../common/colision.js";
import {app, textures} from "../../app.js";
import {glowBorderCreator} from "../glowBorderCreator/glowBorderCreator.js";
import {data} from "../../../data/data.js";


export const createCard = ( name, isOpen, inDeck) => {

    const card = new PIXI.Sprite(isOpen ? name : textures[BACK_CARD])
    let parent
    let reelIndexCurrent = []

    card.name = name
    card.inDeck = inDeck
    card.isOpen = isOpen

    const glow = glowBorderCreator(GLOW)

    onOut()
    card.addChild(glow)

    card.anchor.set(0.5)
    card.scale.set(0.6)
    card.interactive = card.isOpen || card.inDeck;
    card.buttonMode = card.isOpen || card.inDeck;


    card
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove)
    .on('pointerover', onOver)
    .on('pointerout', onOut);

    let deltaX, deltaY, startX, startY

    function onDragStart(event) {
        parent = card.parent
        if(card.inDeck){
            card.texture = name

            parent.removeChild(card)
            parent.addChild(card)

            let cardName = card.texture.textureCacheIds[0]
            gameDescriptor.translateInOpen(cardName)

            card.isOpen = true
            card.inDeck = false
            gsap.to(card, {pixi:{x: this.x + 115}, duration: 0.1})

        } else {
            app.stage.addChild(card)

            this.data = event.data;
            this.dragging = true;
            const newPosition = this.data.getLocalPosition(this.parent);
            startX = card.x
            startY = card.y
            deltaX = card.x - newPosition.x
            deltaY = card.y - newPosition.y
        }

    }

    function onDragEnd() {

        if(this.dragging){


            if (isTranslateToReel(reelIndexCurrent, card)){
                //...........................................................
                const currentReel = cards.children[reelIndexCurrent]

                const lastReelCard = currentReel.children[currentReel.children.length - 1]
                card.x = lastReelCard.x
                card.y = lastReelCard.y + data.cards.deltaY
                startX = card.x
                startY = card.y

                currentReel.addChild(card)
                let lastCardInOutReel = parent.children[parent.children.length - 1]
                lastCardInOutReel.texture = lastCardInOutReel.name
                lastCardInOutReel.isOpen = true
            } else {
                gsap.to(card, {pixi:{x: startX, y: startY, },
                    onComplete: () => parent.addChild(card),
                    duration: 0.2})
            }

        }
        this.dragging = false;
        this.data = null;

    }

    function onDragMove() {
        if (this.dragging) {

            reelIndexCurrent = reelIndexesColision(card)

            const newPosition = this.data.getLocalPosition(this.parent);
            this.x = newPosition.x + deltaX
            this.y = newPosition.y + deltaY

        }
    }

    function onOver() {
        glow.visible = true
        glow.alpha = 0.5

    }
    function onOut() {
        glow.visible = false
        glow.alpha = 0

    }

    return card
}


function isTranslateToReel(i, card){

        let res
        let reel = cards.children[i]
        let lastCardInReel = reel.children[reel.children.length - 1].texture.textureCacheIds[0]
        let cardName = card.texture.textureCacheIds[0]
        let lastCardValue = parseInt(lastCardInReel)
        let lastCardColor = getCardColor(lastCardInReel.slice(-1))
        let cardValue = parseInt(cardName)
        let cardColor = getCardColor(cardName.slice(-1))
        res = cardColor !== lastCardColor && cardValue + 1 === lastCardValue
        return res

    function getCardColor(currentCard){
        return (currentCard === 'c' || currentCard === 's') ? 'black' : 'red'
    }


}

function reelIndexesColision(card){
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