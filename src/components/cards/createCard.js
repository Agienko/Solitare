import {BACK_CARD, GLOW} from "../../constants/cards.js";
import {game} from "../../game/game.js";
import {cards} from "./addAnimatedCards.js";
import {colision} from "../../common/colision.js";



export const createCard = (textures, name, isOpen, inDeck) => {

    const card = new PIXI.Sprite(isOpen ? name : textures[BACK_CARD])
    card.inDeck = inDeck
    card.isOpen = isOpen
    const glow = new PIXI.Sprite(textures[GLOW])

    glow.anchor.set(0.5)
    glow.visible = false
    glow.alpha = 0
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
        if(card.inDeck){

            card.texture = name
            let parent = card.parent
            parent.removeChild(card)
            parent.addChild(card)

            let cardName = card.texture.textureCacheIds[0]
            game.translateInOpen(cardName)

            card.isOpen = true
            card.inDeck = false
            gsap.to(card, {pixi:{x: this.x + 115}, duration: 0.1})

        } else {
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
        //need to inside collizion!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if(this.dragging){
            // card.x = startX
            // card.y = startY
            gsap.to(card, {pixi:{x: startX, y: startY }, duration: 0.2})
        }
        this.dragging = false;
        this.data = null;

    }

    function onDragMove() {
        if (this.dragging) {
            const newPosition = this.data.getLocalPosition(this.parent);
            this.x = newPosition.x + deltaX
            this.y = newPosition.y + deltaY

            console.log(colision( card,cards.children[2]))

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


