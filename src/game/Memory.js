import {Reel} from "../components/Reel.js";

import {DeckClose} from "../components/DeckClose.js";
import {DeckOpen} from "../components/DeckOpen.js";
import {Home} from "../components/Home.js";
import {backCardSound, reloadDeck} from "../sounds/sounds.js";
import {app} from "../app.js";

export class Memory {
    constructor() {
        this.store = []
    }

    clear() {
        this.store = []
    }

    add(card, parent) {
        this.store.push([card, parent])
        console.log(this.store)
    }

    remove() {
        this.store.pop()
        console.log(this.store)
    }

    back() {
        if (this.store.length > 0) {
            this.memorize()
            console.log(this.store)

        } else {
            console.log('nothing to back')
        }
    }

    memorize() {

        const [current, currentParent] = this.store.pop()

        if (Array.isArray(current)) {// cortage

            if(currentParent instanceof DeckOpen) {

                gsap.to(current, {
                    pixi:{x:115},
                    ease: 'Power4.easeOut',
                    stagger: 0.025,
                    duration: 0.2,
                    onStart(){
                        reloadDeck.currentTime = 1
                        reloadDeck.play()
                    },
                    onComplete(){
                        reloadDeck.pause()
                        currentParent.addChild(...current)
                        current.forEach(card => {card.x = 0, card.open()})
                    }
                })
            }
            if(currentParent instanceof Reel) {
                !currentParent.isEmpty() ? currentParent.last().close() : null
                current.forEach((card, i) => {
                    current.x = 0
                    current.y = 0
                    currentParent.addChild(card)
                })
                currentParent.verticalAlignCards()
            }

        } else { // single



            if (currentParent instanceof Reel ) {
                current.position.set(0, 35 * (currentParent.children.length - 1))
                !currentParent.isEmpty() ? currentParent.last().close() : null
                currentParent.addChild(current)
            }
            if (currentParent instanceof DeckClose) {

                current.close()
                currentParent.addChild(current)

                gsap.from(current,{
                    pixi:{x: 115},
                    duration: 0.12,
                    ease: 'Power1.easeOut',
                    onStart(){
                        backCardSound.currentTime = 0
                        backCardSound.play()
                    },
                })
            }
            if (currentParent instanceof Home) {
                current.position.set(0, 0)
                currentParent.addChild(current)
                console.log('home')
            }
            if (currentParent instanceof DeckOpen) {



                current.position.set(0, 0)
                currentParent.addChild(current)
                console.log('deckClose')
            }

        }
    }
}
