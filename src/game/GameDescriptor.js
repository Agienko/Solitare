import {app} from "../app.js";
import {data} from "../../data/data.js";
import {BACK_BTN, INGO_BTN, NEW_GAME_BTN, REPLAY_BTN, SOUND_BTN} from "../constants/constants.js";
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
import {Memory} from "./MemoryDescriptor.js";
import {Clock} from "../components/Clock.js";

export class Game {

    constructor() {
        this.memory = new Memory()
        this.layout = []
        this.deck = new Deck()
        this.deckClose = new DeckClose()
        this.deckOpen = new DeckOpen()
        this.maskCard = new MaskCard()
        this.clock = new Clock()
        this.btns = [
        new Btn(NEW_GAME_BTN, data.btns.newGameBtn.x, () => this.newGame()),
        new Btn(REPLAY_BTN, data.btns.replayBtn.x, () => this.replayGame()),
        new Btn(BACK_BTN, data.btns.backBtn.x, () => this.memory.backMove()),
        new Btn(SOUND_BTN, data.btns.soundBtn.x, () => toggleSounds()),
        new Btn(INGO_BTN, data.btns.infoBtn.x, () => openPopap())
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
        app.stage.addChild(this.deckClose, this.deckOpen, this.maskCard, this.clock)
    }

    newGame() {
        this.deck.destroyCards()
        this.deck = new Deck()
        this.layout = this.deck.newLayout()
        removeWinAnimation()
        this.deal()
        this.clock.reload()
    }

    replayGame(){
        if(this.hasSaveLayout()){
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
