import {app} from "../app.js";
import {data} from "../../data/data.js";
import {BACK_BTN, INGO_BTN, NEW_GAME_BTN, REPLAY_BTN, SOUND_BTN} from "../constants/constants.js";
import {ClockMoves} from "../components/Clock&Moves.js";
import {Deck} from "../components/Deck.js";
import {MaskCard} from "../components/MaskCard.js";
import {Btn} from "../components/Btn.js";
import {DeckClose} from "../components/DeckClose.js";
import {DeckOpen} from "../components/DeckOpen.js";
import {Home} from "../components/Home.js";
import {Reel} from "../components/Reel.js";
import {openPopap} from "../popap/popap.js";
import {removeWinAnimation} from "../animations/winAnimation/winAnimation.js";
import {dealCardAnimation} from "../animations/dealCardAnimation/dealCardAnimation.js";
import {toggleSounds} from "../sounds/sounds.js";
import {Memory} from "./Memory.js"


export class Game {

    constructor() {
        this.memory = new Memory()
        this.layout = []
        this.deck = new Deck()
        this.deckClose = new DeckClose()
        this.deckOpen = new DeckOpen()
        this.maskCard = new MaskCard()
        this.clockMoves = new ClockMoves()

        this.btns = [
        new Btn(NEW_GAME_BTN, data.btns.newGameBtn.x, data.btns.newGameBtn.y, () => this.newGame()),
        new Btn(REPLAY_BTN, data.btns.replayBtn.x, data.btns.replayBtn.y, () => this.replayGame()),
        new Btn(BACK_BTN, data.btns.backBtn.x,data.btns.backBtn.y, () => this.memory.back()),
        new Btn(SOUND_BTN, data.btns.soundBtn.x, data.btns.soundBtn.y,() => toggleSounds()),
        new Btn(INGO_BTN, data.btns.infoBtn.x, data.btns.infoBtn.y,() => openPopap())
    ]
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
        this.btns.forEach(btn => app.stage.addChild(btn))
        this.homes.forEach(home=> app.stage.addChild(home))
        this.reels.forEach(reel => app.stage.addChild(reel))
        app.stage.addChild(this.deckClose, this.deckOpen, this.maskCard, this.clockMoves)
    }

    newGame() {
        this.memory.clear()
        this.deck.destroyCards()
        this.deck = new Deck()
        this.layout = this.deck.newLayout()
        removeWinAnimation()
        this.deal()
        this.clockMoves.go()
        this.clockMoves.reload()
    }

    replayGame(){
        if(this.hasSaveLayout()){
            this.memory.clear()
            this.deck.destroyCards()
            this.layout = this.deck.replayLayout()
            removeWinAnimation()
            this.deal()
        }
    }

    deal() {
        this.addCardsToReel()
        this.addCardsToCloseDeck()
        dealCardAnimation()
    }

    addCardsToReel() {
        this.reels.forEach((reel, index) => {
            for (let i = 0; i <= index; i++) reel.addChild(this.layout.pop())
            reel.verticalAlignCards()
            reel.last().open()
        })
    }

    addCardsToCloseDeck() {
        this.layout.forEach(card => this.deckClose.addChild(card))
    }

    checkWin(){
        const homes = this.homes.map(home => home.isFool()).filter(i => i)
        return homes.length === 4
    }

    hasSaveLayout(){
        return this.deck.saveTextures.length > 0
    }

}
