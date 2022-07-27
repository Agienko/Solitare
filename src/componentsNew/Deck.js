import {textures} from "../app.js";
import {Card} from "./Card.js";

export class Deck {
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
