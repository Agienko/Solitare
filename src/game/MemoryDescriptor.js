import {backCardSound} from "../sounds/sounds.js";
import {Home} from "../components/Home.js";
import {DeckOpen} from "../components/DeckOpen.js";
import {app} from "../app.js";
import {DeckClose} from "../components/DeckClose.js";
import {Reel} from "../components/Reel.js";


export class Memory {
    constructor() {
        this.memory = []
    }

    addMove(card, parent) {

        this.memory.push([card, parent])
        console.log(this.memory.map(i => [i[0].texture.textureCacheIds[0], i[1].children]))
    }

    removeMove() {
        this.memory.pop()
    }

    backMove() {
        if (this.memory.length > 0) {
            backCardSound.currentTime = 0
            backCardSound.play()

            let card = this.memory[this.memory.length - 1][0]
            let parent = this.memory[this.memory.length - 1][1]


            if (parent instanceof Reel && !parent.isEmpty()) parent.last().close()
            card.x = 0
            if (parent instanceof Home || parent instanceof DeckOpen) {
                card.y = 0
            } else {
                card.y = 35 * (parent.children.length - 1);
            }
            parent.addChild(card)
            this.removeMove()
        }


    }
}
