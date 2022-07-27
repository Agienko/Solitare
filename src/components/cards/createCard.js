import {BACK_CARD, GLOW} from "../../constants/cards.js";
import {gameDescriptor} from "../../game/gameDescriptor.js";
import {cards} from "./addAnimatedCards.js";
import {app, textures} from "../../app.js";
import {glowBorderCreator} from "../glowBorderCreator/glowBorderCreator.js";
import {data} from "../../../data/data.js";
import {reelIndexColision} from "./createCardHelpers/reelIndexColision.js";
import {isTranslatebleToReel} from "./createCardHelpers/isTranslatebleToReel.js";


export const createCard = ( name, isOpen, inDeck) => {

    const container = new PIXI.Container()
    container.sortableChildren = true

    const card = new PIXI.Sprite(isOpen ? name : textures[BACK_CARD])



    let parent
    let reelIndexCurrent = []

    container.name = name
    container.inDeck = inDeck
    container.isOpen = isOpen

    const glow = glowBorderCreator(GLOW)

    onOut()
    container.addChild(glow)

    card.anchor.set(0.5)

    card.scale.set(0.6)
    glow.scale.set(0.6)
    container.interactive = container.isOpen || container.inDeck;
    container.buttonMode = container.isOpen || container.inDeck;

    container
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove)
    .on('pointerover', onOver)
    .on('pointerout', onOut);

    let deltaX, deltaY, startX, startY

    function onDragStart(event) {
        parent = container.parent
        if(container.inDeck){
            container.children[1].texture = container.name

            // parent.removeChild(container)
            parent.addChild(container)
            container
            console.log()
            gameDescriptor.translateInOpen(container.name.textureCacheIds[0])

            container.isOpen = true
            container.inDeck = false
            gsap.to(container, {pixi:{x: this.x + 115}, duration: 0.1})

        } else {
            // if(container.parent.children.length > 2) container.parent.removeChild(container) ///////////////
            app.stage.addChild(container)
            this.data = event.data;
            console.log(event.target)
            this.dragging = true;
            const newPosition = this.data.getLocalPosition(this.parent);
            startX = container.x
            startY = container.y
            deltaX = container.x - newPosition.x
            deltaY = container.y - newPosition.y
            console.log(startX)
        }

    }

    function onDragEnd() {

        if(this.dragging){

            if (isTranslatebleToReel(reelIndexCurrent, container)){
                //...........................................................

                const currentReel = cards.children[reelIndexCurrent]

                const lastReelCard = currentReel.children[currentReel.children.length - 1]


                startX = lastReelCard.x

                startY = container.children[0].y
                container.x = lastReelCard.children[lastReelCard.children.length - 1].x
                container.y = lastReelCard.children[lastReelCard.children.length - 1].y + data.cards.deltaY

                //
                lastReelCard.addChild(container)

                let lastCardInOutReel = parent.children[parent.children.length - 1]
                lastCardInOutReel.children[1].texture = lastCardInOutReel.name
                lastCardInOutReel.isOpen = true
                lastCardInOutReel.interactive = true
                lastCardInOutReel.buttonMode = true
            } else {
                gsap.to(container, {pixi:{x: startX, y: startY, },
                    onComplete: () => parent.addChild(container),
                    duration: 0.2})
            }

        }
        this.dragging = false;
        this.data = null;

    }

    function onDragMove() {
        if (this.dragging) {

            reelIndexCurrent = reelIndexColision(container)

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
    container.addChild(card)
    return container
}




