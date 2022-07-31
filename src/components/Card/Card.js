import {app, game, textures} from "../../app.js";
import {BACK_CARD, BLACK_CARD_COLOR, RED_CARD_COLOR} from "../../constants/constants.js";
import {Glow} from "../Glow.js";
import {Reel} from "../Reel.js";
import {clickSound} from "../../sounds/sounds.js";
import {endSingleCard} from "./endMoving/endSingleCard.js";
import {endCortage} from "./endMoving/endCortage.js";


let  parent

export class Card extends PIXI.Sprite {

    constructor(params) {
        super(params)

        this.deltaX = 0
        this.deltaY = 0
        this.startX = 0
        this.startY = 0
        this.parentX = 0
        this.parentY = 0

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

    onDragStart(e) {
        parent = this.parent

        this.parentX = this.parent.x
        this.parentY = this.isCardFromReel()
            ? this.parent.y + (this.parent.children.length - 2) * 35
            : game.deckOpen.y

       this.isSingleCard() ? this.startSingleCard(): this.startCortage()

        this.data = e.data;
        this.dragging = true;

        const newPosition = this.data.getLocalPosition(this.parent);

        this.startX = this.x
        this.startY = this.y
        this.deltaX = this.x - newPosition.x
        this.deltaY = this.y - newPosition.y

        clickSound.play()

    }

    startSingleCard(){
        game.memory.add(this, this.parent)
        this.position.set(this.parentX, this.parentY)
        app.stage.addChild(this)
        this.zIndex = 10
    }

    startCortage(){
        this.cortaging = true
        let cortageSize = this.parent.children.indexOf(this) - this.parent.children.length

        this.parentY = this.parent.children[this.parent.children.indexOf(this)].y
        this.cortage = [...this.parent.children.slice(cortageSize)]

        game.memory.add(this.cortage, this.parent)// memory.........

        app.stage.addChild(...this.cortage)

        this.cortage.forEach((card, i) => {
            card.x = this.parentX
            card.y = this.parentY + 170 + i * 35
            card.zIndex = 10
        })
    }

    onDragMove() {
        if (this.dragging) {
            const newPosition = this.data.getLocalPosition(this.parent);
            if (this.cortaging) {
                this.cortage.forEach((card, i) => {
                    card.position.set(newPosition.x + this.deltaX, newPosition.y + this.deltaY + i * 35)
                })
            } else {
                this.position.set(newPosition.x + this.deltaX, newPosition.y + this.deltaY)
            }
        }
    }

    onDragEnd() {
        if (this.dragging) {
            this.cortaging ? endCortage(this, parent) : endSingleCard(this, parent)
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








