import {app} from "../app.js";
import {data} from "../../data/data.js";
import {BACK_BTN, INGO_BTN, NEW_GAME_BTN, REPLAY_BTN, SOUND_BTN} from "../constants/btns.js";
import {Deck} from "../components/Deck.js";
import {MaskCard} from "../components/MaskCard.js";
import {Btn} from "../components/Btn.js";
import {DeckClose} from "../components/DeckClose.js";
import {DeckOpen} from "../components/DeckOpen.js";
import {Home} from "../components/Home.js";
import {Reel} from "../components/Reel.js";


export class Game {
    constructor() {
        this._deck = new Deck()
        this.layout = []
        this.maskCard = new MaskCard()
        this.btns = [
        new Btn(NEW_GAME_BTN, data.btns.newGameBtn.x, () => this.newGame()),
        new Btn(REPLAY_BTN, data.btns.replayBtn.x, () => this.replayGame()),
        new Btn(BACK_BTN, data.btns.backBtn.x),
        new Btn(SOUND_BTN, data.btns.soundBtn.x),
        new Btn(INGO_BTN, data.btns.infoBtn.x)
    ]
        this.deckClose = new DeckClose()
        this.deckOpen = new DeckOpen()
        this.homes = [
        new Home(1),
        new Home(2),
        new Home(3),
        new Home(4),
    ]
        this.reels = [
        new Reel(1),
        new Reel(2),
        new Reel(3),
        new Reel(4),
        new Reel(5),
        new Reel(6),
        new Reel(7),
    ]
    }
    init() {
        console.log('12131')
        this.btns.forEach(btn => app.stage.addChild(btn))
        this.homes.forEach(home=> app.stage.addChild(home))
        this.reels.forEach(reel => app.stage.addChild(reel))
        app.stage.addChild(this.deckClose, this.deckOpen, this.maskCard)
        this.newGame()
    }
    newGame() {
        this._deck.destroyCards()
        this._deck = new Deck()
        this.layout = this._deck.newLayout()
        this.deal()

    }
    replayGame(){
        if(this._deck.saveTextures.length > 0){
            this._deck.destroyCards()
            this.layout = this._deck.replayLayout()
            this.deal()
        }
    }
    deal() {
        this._addCardsToReel()
        this._addCardsToCloseDeck()
        const reelDelayArr = [0.1, 0.3, 0.4, 0.7, 1.1, 1.6, 2.2]
        reelDelayArr.forEach((delay, i) => this.reels[i].animate(delay))
        this.deckClose.animate(2.8, this._unblockBtns.bind(this))
        this.maskCard.hide(2.9)
        this._blockBtns()
    }
    _blockBtns(){
        this.btns[0].interactive = false
        this.btns[1].interactive = false
    }
    _unblockBtns(){
        this.btns[0].interactive = true
        this.btns[1].interactive = true
    }
    _addCardsToReel() {
        this.reels.forEach((reel, index) => {
            for (let i = 0; i <= index; i++) reel.addChild(this.layout.pop())
            reel.verticalAlignCards()
            reel.last().open()
        })
    }
    _addCardsToCloseDeck() {
        this.layout.forEach(card => this.deckClose.addChild(card))
    }
}
