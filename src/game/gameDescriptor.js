import {app} from "../app.js";
import {data} from "../../data/data.js";
import {BACK_BTN, INGO_BTN, NEW_GAME_BTN, REPLAY_BTN, SOUND_BTN} from "../constants/btns.js";
import {gameBegin} from "./gameBegin.js";
import {Deck} from "../components/Deck.js";
import {MaskCard} from "../components/MaskCard.js";
import {Btn} from "../components/Btn.js";
import {DeckClose} from "../components/DeckClose.js";
import {DeckOpen} from "../components/DeckOpen.js";
import {Home} from "../components/Home.js";
import {Reel} from "../components/Reel.js";

export function gameCreator() {

    const gameDescriptor = {
        _deck: new Deck(),
        _layoutSave: [],
        layout: [],
        maskCard: new MaskCard(),
        btns: [
            new Btn(NEW_GAME_BTN, data.btns.newGameBtn.x, () => gameBegin(true)),
            new Btn(REPLAY_BTN, data.btns.replayBtn.x, () => gameBegin(false)),
            new Btn(BACK_BTN, data.btns.backBtn.x),
            new Btn(SOUND_BTN, data.btns.soundBtn.x),
            new Btn(INGO_BTN, data.btns.infoBtn.x)
        ],
        deckClose: new DeckClose(),
        deckOpen: new DeckOpen(),
        homes: [
            new Home(1),
            new Home(2),
            new Home(3),
            new Home(4),
        ],
        reels: [
            new Reel(1),
            new Reel(2),
            new Reel(3),
            new Reel(4),
            new Reel(5),
            new Reel(6),
            new Reel(7),
        ],

        init() {
            this.newLayout()
            app.stage.addChild(
                this.deckClose, this.deckOpen,
                this.homes[0], this.homes[1], this.homes[2], this.homes[3],
            )
            this.reels.forEach(reel => app.stage.addChild(reel))
            this.deal()
        },

        _clear() {
            this.deckClose = new DeckClose()
            this.deckOpen = new DeckOpen()
            this.maskCard = new MaskCard()
            this.homes.map((name, i) => name = new Home(i + 1))
            this.reels.map((name, i) => name = new Reel(i + 1))
        },

        newLayout() {
            this.layout = this._deck.newLayout()
            this._layoutSave = [...this.layout]
        },
        _addCardsToReel() {
            this.reels.forEach((reel, index) => {
                for (let i = 0; i <= index; i++) reel.addChild(this.layout.pop())
                reel.verticalAlignCards()
                reel.last().open()
            })

        },
        _addCardsToCloseDeck() {
            this.layout.forEach(card => this.deckClose.addChild(card))
        },

        deal() {
            this._addCardsToReel()
            this._addCardsToCloseDeck()

            let reelDelayArr = [0.1, 0.3, 0.4, 0.7, 1.1, 1.6, 2.2]
            reelDelayArr.forEach((delay, i) => this.reels[i].animate(delay))
            this.deckClose.animate(2.8)
            this.maskCard.hide(2.9)

        }

    }
    return gameDescriptor

}

