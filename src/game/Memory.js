import {Reel} from "../components/Reel.js";
import {DeckClose} from "../components/DeckClose.js";
import {DeckOpen} from "../components/DeckOpen.js";
import {backCardSound, reloadDeck} from "../sounds/sounds.js";
import {app, game} from "../app.js";

export class Memory {
    constructor() {
        this.store = []
    }
    getMovesCount(){
      return this.store.length
    }

    clear() {
        this.store = []
    }

    add(card, parent) {
        this.store.push([card, parent])
    }

    remove() {
        this.store.pop()
    }

    back() {
        (this.store.length > 0)
        ?    this.runBackMove()
        :    console.log('nothing to back')
    }

    runBackMove() {

        const [current, currentParent] = this.store.pop()

        if (Array.isArray(current)) {
            // cortage
            (currentParent instanceof DeckOpen)
            ?    this.animateDeckCortageBacking(current, currentParent)
            :    current.forEach((card, i ) => this.animateCardBacking(card, currentParent, i))
        } else {
            // single
           (currentParent instanceof DeckClose)
             ?  this.animateDeckCardBacking(current, currentParent)
             :  this.animateCardBacking(current, currentParent)
        }
    }

    animateCardBacking(current, currentParent, cortageIndex = 0){

        let global = current.getGlobalPosition()
        let globalParent = currentParent.getGlobalPosition()

        let correctY = (currentParent instanceof Reel)
            ? 35 * (currentParent.children.length - 1 + cortageIndex)
            : cortageIndex * 35

        if(currentParent instanceof Reel && !currentParent.isEmpty()) currentParent.last().close()

        app.stage.addChild(current)
        current.position.set(global.x, global.y)

        gsap.to(current,{
            pixi:{x: globalParent.x, y: globalParent.y +correctY},
            duration: 0.2,
            onStart(){
                game.btns[2].interactive = false
                backCardSound.currentTime = 0
                backCardSound.play()
            },
            onComplete(){
                current.position.set(0, correctY)
                currentParent.addChild(current)
                game.btns[2].interactive = true
                backCardSound.pause()
            }
        })
    }

    animateDeckCardBacking(current, currentParent) {
        current.close()
        currentParent.addChild(current)

        gsap.from(current,{
            pixi:{x: 115},
            duration: 0.12,
            ease: 'Power1.easeOut',
            onStart(){
                game.btns[2].interactive = false
                backCardSound.currentTime = 0
                backCardSound.play()
            },
            onComplete(){
                game.btns[2].interactive = true
                backCardSound.pause()
            }
        })
    }

    animateDeckCortageBacking(current, currentParent){

        gsap.to(current, {
            pixi:{x:115}, ease: 'Power4.easeOut', stagger: 0.025, duration: 0.2,
            onStart(){
                game.btns[2].interactive = false
                reloadDeck.currentTime = 1
                reloadDeck.play()
            },
            onComplete(){
                reloadDeck.pause()
                currentParent.addChild(...current)
                current.forEach(card => {card.x = 0, card.open()})
                game.btns[2].interactive = true
            }
        })
    }
}


