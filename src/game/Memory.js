import {Reel} from "../components/Reel.js";


import {DeckClose} from "../components/DeckClose.js";
import {DeckOpen} from "../components/DeckOpen.js";


export  class Memory{
    constructor() {
        this.store = []
    }
    add(card, parent){
        this.store.push([card, parent])
        console.log(this.store)
    }

    remove(){
        this.store.pop()
        console.log(this.store)
    }

    back(){
        if(this.store.length > 0) {
            this.memorize()
            console.log(this.store)

        } else {
            console.log('nothing to back')
        }
    }
    memorize(){

        const [current, currentParent] = this.store.pop()

        if(Array.isArray(current)){// cortage

            if (currentParent instanceof Reel && !currentParent.isEmpty()) currentParent.last().close()
            current.forEach((card, i) => {
                current.x = 0
                current.y = (currentParent instanceof Reel) ? 35 * (currentParent.children.length - 1*i) : 0
                if(currentParent instanceof DeckOpen) card.open()
                currentParent.addChild(card)

            })
        } else { // single
                    current.x = 0
                    current.y = (currentParent instanceof Reel) ? 35 * (currentParent.children.length - 1) : 0
                    if (currentParent instanceof Reel && !currentParent.isEmpty()) currentParent.last().close()
                    if (currentParent instanceof DeckClose ) current.close()
                    currentParent.addChild(current)

        }
    }
}
