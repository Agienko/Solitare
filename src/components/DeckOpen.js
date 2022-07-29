import {data} from "../../data/data.js";


export class DeckOpen extends PIXI.Container{

    constructor() {
        super()
        this.position.set(data.deckOpen.position.x, data.deckOpen.position.y)
    }

}
