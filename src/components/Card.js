import {app, game, textures} from "../app.js";
import {BACK_CARD, BLACK_CARD_COLOR, RED_CARD_COLOR} from "../constants/constants.js";
import {isAtHome} from "../helpers/homeTranslateHelpers.js";
import {isAtReel} from "../helpers/reelTranslateHelpers.js";
import {Glow} from "./Glow.js";
import {DeckOpen} from "./DeckOpen.js";
import {Reel} from "./Reel.js";
import {Home} from "./Home.js";
import {winAnimation} from "../animations/winAnimation.js";
import {backCardSound, cardTake, clickSound} from "../sounds/sounds.js";


let deltaX, deltaY, startX, startY, parent, parentX, parentY

export class Card extends PIXI.Sprite {

    constructor(params) {
        super(params)

        this.openTexture = this.texture
        this.cortaging = false
        this.cortage = []

        this.scale.set(0.6)
        this.close()

        this.glow = new Glow()
        this.addChild(this.glow)

        this.on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            .on('pointermove', this.onDragMove)
            .on('pointerover', this.onOver)
            .on('pointerout', this.onOut)
    }

    onDragStart(event) {
        parent = this.parent

        parentX = this.parent.x
        parentY = this.isCardFromReel() ? this.parent.y + (this.parent.children.length - 2) * 35 : game.deckOpen.y

       this.isSingleCard() ? startSingleCard(this): startCortage(this)

        this.data = event.data;
        this.dragging = true;

        const newPosition = this.data.getLocalPosition(this.parent);
        startX = this.x
        startY = this.y
        deltaX = this.x - newPosition.x
        deltaY = this.y - newPosition.y

        clickSound.play()

    }

    onDragMove() {
        if (this.dragging) {
            const newPosition = this.data.getLocalPosition(this.parent);

            if (this.cortaging) {
                this.cortage.forEach((card, i) => {
                    card.x = newPosition.x + deltaX
                    card.y = newPosition.y + deltaY + i * 35
                })
            } else {
                this.position.set(newPosition.x + deltaX, newPosition.y + deltaY)
            }
        }
    }

    onDragEnd() {
        if (this.dragging) {

            this.cortaging ? endCortage(this) : endSingleCard(this)

        }

        this.dragging = false;
        this.data = null;

    }

    onOver() {
        this.glow.visible = true
        this.glow.alpha = 0.5
    }

    onOut() {
        this.glow.visible = false
        this.glow.alpha = 0
    }

    isCardFromReel(){
        return this.parent instanceof Reel
    }

    isSingleCard(){
        return (parent.children.indexOf(this) === parent.children.length - 1)
    }

    open() {
        this.texture = this.openTexture
        this.interactive = true
        this.buttonMode = true
    }

    close() {
        this.texture = textures[BACK_CARD]
        this.interactive = false
        this.buttonMode = false
    }

    getNumber(card = this) {
        return parseInt(card.texture.textureCacheIds[0])
    }

    getColor(card = this) {
        let suit = card.getSuit()
        return suit === 's' || suit === 'c' ? BLACK_CARD_COLOR : RED_CARD_COLOR
    }

    getSuit(card = this) {
        return card.texture.textureCacheIds[0].slice(-1)
    }

}


function startSingleCard(card) {
    card.position.set(parentX, parentY)
    app.stage.addChild(card)
    card.zIndex = 10
}

function startCortage(currentCard) {
    currentCard.cortaging = true
    let cortageSize = parent.children.indexOf(currentCard) - parent.children.length

    parentY = parent.children[parent.children.indexOf(currentCard)].y
    currentCard.cortage = [...parent.children.slice(cortageSize)]

    app.stage.addChild(...currentCard.cortage)

    currentCard.cortage.forEach((card, i) => {
        card.x = parentX
        card.y = parentY + 170 + (i) * 35
        card.zIndex = 10
    })
}

function endSingleCard(card){
    let backCardFlag = true
    game.homes.forEach(home => {
        if (isAtHome(card, home)) {
            card.position.set(0, 0)
            cardTake.play()
            home.addChild(card)
            backCardFlag = false
            if (parent instanceof Reel && !parent.isEmpty()) parent.last().open()
            winAnimation()
        }
    })

    game.reels.forEach(reel => {
        if (isAtReel(card, reel)) {
            card.position.set(0, reel.isEmpty() ? 0 : reel.last().y + 35)
            reel.addChild(card)
            cardTake.play()
            backCardFlag = false
            if (parent instanceof Reel && !parent.isEmpty()) parent.last().open()
        }
    })

    if (backCardFlag) {
        backCardSound.currentTime = 0
        backCardSound.play()
        gsap.to(card, {
            pixi: {x: startX, y: startY},
            onComplete: () => {
                card.x = 0
                if (parent instanceof Home || parent instanceof DeckOpen){
                    card.y = 0
                } else {
                    card.y = 35 * (parent.children.length - 1);
                }
                backCardSound.pause()
                parent.addChild(card)
            },
            duration: 0.2
        })
    }
}

function endCortage(currentCard) {
    let backCortageFlag = true

    game.reels.forEach(reel => {
        if (isAtReel(currentCard, reel)) {
            currentCard.cortage.forEach((card, i) => {
                card.position.set(0, reel.isEmpty() ? 0 : reel.last().y + 35)
                reel.addChild(card)
            })
            currentCard.cortage = []
            currentCard.cortaging = false
            backCortageFlag = false
            if (parent instanceof Reel && !parent.isEmpty()) parent.last().open()
        }
    })

    if (backCortageFlag) {
        backCardSound.currentTime = 0
        backCardSound.play()
        currentCard.cortage.forEach((card, i) => {
            gsap.to(card, {
                pixi: {x: startX, y: startY + i * 35,},
                onComplete: () => {
                    card.x = 0
                    card.y = 35 * (parent.children.length - 1);
                    backCardSound.pause()
                    parent.addChild(card)

                    currentCard.cortage = []
                    currentCard.cortaging = false
                },
                duration: 0.2
            })
        })
    }
}

