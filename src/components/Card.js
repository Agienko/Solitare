import {app, game, textures} from "../app.js";
import {BACK_CARD, BLACK_CARD_COLOR, RED_CARD_COLOR} from "../constants/cards.js";
import {isAtHome} from "../common/homeTranslateHelpers.js";
import {isAtReel} from "../common/reelTranslateHelpers.js";
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
        this.scale.set(0.6)
        this.close()

        this.cortaging = false
        this.cortage = []

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
        parentY = this.parent instanceof DeckOpen
            ? game.deckOpen.y
            : this.parent.y + (this.parent.children.length - 2) * 35

        if ((parent.children.indexOf(this) === parent.children.length - 1) && !(parent instanceof Home)) { //is single Card
            this.position.set(parentX, parentY)
            app.stage.addChild(this)
            this.zIndex = 10


        } else if(parent instanceof Home){
            this.position.set(parentX, this.parent.y)
            app.stage.addChild(this)

        } else{ //is cortage

            this.cortaging = true
            let cortageSize = parent.children.indexOf(this) - parent.children.length

            parentY = parent.children[parent.children.indexOf(this)].y
            this.cortage = [...parent.children.slice(cortageSize)]

            app.stage.addChild(...this.cortage)

            this.cortage.forEach((card, i) => {
                card.x = parentX
                card.y = parentY + 170 + (i) * 35
                card.zIndex = 10
            })
        }
        this.data = event.data;
        this.dragging = true;
        clickSound.play()


        const newPosition = this.data.getLocalPosition(this.parent);
        startX = this.x
        startY = this.y
        deltaX = this.x - newPosition.x
        deltaY = this.y - newPosition.y
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
                this.x = newPosition.x + deltaX
                this.y = newPosition.y + deltaY
            }
        }
    }

    onDragEnd() {
        if (this.dragging && !this.cortaging) {
            let backCardFlag = true
            game.homes.forEach(home => {
                if (isAtHome(this, home)) {
                    this.position.set(0, 0)
                    cardTake.play()
                    home.addChild(this)
                    backCardFlag = false
                    if (parent instanceof Reel && !parent.isEmpty()) parent.last().open()
                    winAnimation()
                }
            })

            game.reels.forEach(reel => {
                if (isAtReel(this, reel)) {
                    this.position.set(0, reel.isEmpty() ? 0 : reel.last().y + 35)
                    reel.addChild(this)
                    cardTake.play()
                    backCardFlag = false
                    if (parent instanceof Reel && !parent.isEmpty()) parent.last().open()
                }
            })

            if (backCardFlag) {
                backCardSound.currentTime = 0
                backCardSound.play()
                gsap.to(this, {
                    pixi: {x: startX, y: startY},
                    onComplete: () => {
                        this.x = 0
                        if (parent instanceof Home || parent instanceof DeckOpen){
                            this.y = 0
                        } else {
                            this.y = 35 * (parent.children.length - 1);
                        }
                        backCardSound.pause()
                        parent.addChild(this)
                    },
                    duration: 0.2
                })
            }
        }
        if (this.dragging && this.cortaging) { //with cortage
            let backCortageFlag = true

            game.reels.forEach(reel => {
                if (isAtReel(this, reel)) {
                    this.cortage.forEach((card, i) => {
                        card.position.set(0, reel.isEmpty() ? 0 : reel.last().y + 35)
                        reel.addChild(card)
                    })
                    this.cortage = []
                    this.cortaging = false
                    backCortageFlag = false
                    if (parent instanceof Reel && !parent.isEmpty()) parent.last().open()
                }
            })

            if (backCortageFlag) {
                backCardSound.currentTime = 0
                backCardSound.play()
                this.cortage.forEach((card, i) => {
                    gsap.to(card, {
                        pixi: {x: startX, y: startY + i * 35,},
                        onComplete: () => {
                            card.x = 0
                            card.y = 35 * (parent.children.length - 1);
                            backCardSound.pause()
                            parent.addChild(card)

                            this.cortage = []
                            this.cortaging = false

                        },
                        duration: 0.2
                    })
                })
            }

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
