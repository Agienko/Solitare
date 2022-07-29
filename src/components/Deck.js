import {textures} from "../app.js";
import {Card} from "./Card.js";

export class Deck {

    constructor() {
        this.deck = []
        this.saveTextures = []

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
        let newLayout = [...this.deck].sort(() => Math.random() - 0.5)
        this.saveTextures = newLayout.map(card => card.openTexture.textureCacheIds[0])
        return newLayout
    }

    replayLayout(){
        let oldLayout = []
        this.saveTextures.forEach(i => oldLayout.push(new Card(textures[i])))
        this.deck = [...oldLayout]
        return oldLayout
    }

    close(){
        this.deck.map(card => card.close())
    }

    destroyCards(){
        this.deck.forEach(card => card.destroy())
        this.deck = []
    }

}
