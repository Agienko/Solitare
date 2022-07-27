import {app, textures} from "../app.js";

import {BASE_FOUNDATION, BASE_GRADIENT, EMPTY} from "../constants/background.js";
import {BACK_CARD} from "../constants/cards.js";
import {data} from "../../data/data.js";
import {BACK_BTN, INGO_BTN, NEW_GAME_BTN, REPLAY_BTN, SOUND_BTN} from "../constants/btns.js";
import {gameBegin} from "./gameBegin.js";


class DeckClose extends PIXI.Container{
    constructor() {
        super()
    this.position.set(260, 10)
        this.sprite = new PIXI.Sprite(textures[EMPTY])
        this.sprite.scale.set(0.6)
        this.addChild(this.sprite)
    }
    animate(delay){
        gsap.from(this.children.slice(1), {
            pixi:{x: 230},
            delay: delay,
            stagger: 0.05 ,
            ease:'Expo.easeOut',
            duration: 0.5,
        })
    }
}
class DeckOpen extends PIXI.Container{
    constructor() {
        super()

    }
}

class Deck {
    constructor() {
        this.deck = []
        for(let i = 1;i <= 13; i++){
            this.deck.push(
                new Card(textures[i + 'c']),
                new Card(textures[i + 'd']),
                new Card(textures[i + 'h']),
                new Card(textures[i + 's'])
             )
        }
    }
    newLayout(){
        return [...this.deck].sort(() => Math.random() - 0.5)
    }
}

class Btn extends PIXI.Container{

    constructor(name, x = 0, callback = () =>{console.log('no func')}) {
        super()
        this.sprite = new PIXI.Sprite(textures[name])
        this.sprite.anchor.set(0.5)

        this.mask = new PIXI.Graphics()
        this.mask.beginFill(0x000000)
        this.mask.drawCircle(0, 0, data.btns.maskRadius)
        this.mask.endFill()

        this.sprite.mask = this.mask
        this.addChild(this.sprite, this.mask)
        this.x = x
        this.y = data.btns.y
        this.alpha = 0.9
        this.interactive = true;
        this.buttonMode = true;

        this.on('pointerover', () => gsap.to(this, data.btns.onOver));
        this.on('pointerout', () => gsap.to(this, data.btns.onOut));
        this.on('pointerdown', callback);
        this.scale.set(data.btns.scale)
    }
    addToStage(){
        app.stage.addChild(this)
    }

}


class Card extends PIXI.Sprite{
    constructor(params) {
        super(params)
        this.openTexture = this.texture
        this.scale.set(0.6)
        this.close()
    }
    open(){
        this.texture = this.openTexture
    }
    close(){
        this.texture = textures[BACK_CARD]
    }
}

class Home extends PIXI.Container{

    constructor(number) {
        super()
        this.x = data.homes.startX + (number - 1) * data.homes.step
        this.y = data.homes.y
        this.emptyImage = new PIXI.Sprite(textures[BASE_FOUNDATION])
        this.emptyImage.scale.set(0.6)
        this.addChild(this.emptyImage)
    }

}



class Reel extends PIXI.Container{

    constructor(number) {
        super()
        this.number = number
        this.x = data.reels.startX + (number - 2) * data.reels.step
        this.y = data.reels.y
        this.emptyImage = new PIXI.Sprite(textures[BASE_GRADIENT])
        this.emptyImage.scale.set(0.6)
        this.emptyImage.avi
        this.addChild(this.emptyImage)
    }
    animate(delay = 0){
        return gsap.from(this.children.slice(1), {
            pixi:{
                x: this.x + 200 - 230*this.number,
                y:  this.y - 330
            },
            delay: delay,
            stagger: 0.1 ,
            ease:'Expo.easeOut',
            duration: this.children.slice(1).length/7,
        })
    }
    verticalAlignCards(){
        this.children.forEach((card, i) => card.y = i >0 ? (i-1)*35 : 0)
    }
}




class MaskCard extends PIXI.Sprite{
    constructor(params) {
        super(params)
        this.texture = textures[BACK_CARD]
        this.scale.set(0.6)
        this.position.set(data.cards.startPositionX, data.cards.startPositionY)
        app.stage.addChild(this)
        app.stage.sortableChildren = true
        this.zIndex = 200
    }
    hide(delay){
        setTimeout(() => this.visible = false, delay*1000)
    }
}







export function gameCreator() {

const gameDescriptor2 = {
        _deck: new Deck(),
        layout: [],
        _layoutSave: [],
        maskCard: new MaskCard(),
        btns: [
           new Btn(NEW_GAME_BTN, data.btns.newGameBtn.x, () => gameBegin(true)),
           new Btn(REPLAY_BTN, data.btns.replayBtn.x, () => gameBegin(false)),
           new Btn (BACK_BTN, data.btns.backBtn.x),
           new Btn(SOUND_BTN, data.btns.soundBtn.x),
           new Btn(INGO_BTN, data.btns.infoBtn.x)
        ],
        deckClose: new DeckClose(),
        deckOpen: new DeckOpen(),
        home1: new Home(1),
        home2: new Home(2),
        home3: new Home(3),
        home4: new Home(4),
        reel1: new Reel(1),
        reel2: new Reel(2),
        reel3: new Reel(3),
        reel4: new Reel(4),
        reel5: new Reel(5),
        reel6: new Reel(6),
        reel7: new Reel(7),
        init(){
          app.stage.addChild(
              this.deckClose, this.deckOpen,
              this.home1, this.home2, this.home3, this.home4,
              this.reel1, this.reel2, this.reel3, this.reel4, this.reel5, this.reel6, this.reel7)
        },

        _clear(){
            this.deckClose = new DeckClose()
            this.deckOpen = new DeckOpen()
            this.maskCard = new MaskCard()
            this.home1 = new Home(1)
            this.home2 = new Home(2)
            this.home3 = new Home(3)
            this.home4 = new Home(4)
            this.reel1 = new Reel()
            this.reel2 = new Reel()
            this.reel3 = new Reel()
            this.reel4 = new Reel()
            this.reel5 = new Reel()
            this.reel6 = new Reel()
            this.reel7 = new Reel()
        },

        newLayout(){
            this.layout = this._deck.newLayout()
            this._layoutSave = [...this.layout]
        },
        _addCardsToReel(){
            for(let i =  1; i <=7; i++) this.reel7.addChild(this.layout.pop())
            for(let i =  1; i <=6; i++) this.reel6.addChild(this.layout.pop())
            for(let i =  1; i <=5; i++) this.reel5.addChild(this.layout.pop())
            for(let i =  1; i <=4; i++) this.reel4.addChild(this.layout.pop())
            for(let i =  1; i <=3; i++) this.reel3.addChild(this.layout.pop())
            for(let i =  1; i <=2; i++) this.reel2.addChild(this.layout.pop())
            this.reel1.addChild(this.layout.pop())

            this.reel7.verticalAlignCards()
            this.reel6.verticalAlignCards()
            this.reel5.verticalAlignCards()
            this.reel4.verticalAlignCards()
            this.reel3.verticalAlignCards()
            this.reel2.verticalAlignCards()

            this.reel7.children[this.reel7.children.length - 1].open()
            this.reel6.children[this.reel6.children.length - 1].open()
            this.reel5.children[this.reel5.children.length - 1].open()
            this.reel4.children[this.reel4.children.length - 1].open()
            this.reel3.children[this.reel3.children.length - 1].open()
            this.reel2.children[this.reel2.children.length - 1].open()
            this.reel1.children[this.reel1.children.length - 1].open()

    },
    _addCardsToCloseDeck(){
      this.layout.forEach(card => this.deckClose.addChild(card))
    },

        deal() {
            this._addCardsToReel()
            this._addCardsToCloseDeck()

            this.reel1.animate(0.1)
            this.reel2.animate(0.3)
            this.reel3.animate(0.4)
            this.reel4.animate(0.7)
            this.reel5.animate(1.1)
            this.reel6.animate(1.6)
            this.reel7.animate(2.2)
            this.deckClose.animate(2.8)
            this.maskCard.hide(2.9)

        }

}
    return gameDescriptor2

}

