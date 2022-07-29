import {game, textures} from "../app.js";
import {EMPTY} from "../constants/background.js";
import {Glow} from "./Glow.js";
import {data} from "../../data/data.js";
import {backCardSound, reloadDeck} from "../sounds/sounds.js";

export class DeckClose extends PIXI.Container{
    constructor() {
        super()
        this.position.set(data.deckClose.position.x,data.deckClose.position.y)
        this.empty = new PIXI.Sprite(textures[EMPTY])
        this.empty.scale.set(data.cards.scale)
        this.empty.tint = 0x22bbff
        this.addChild(this.empty)

        this.glow = new Glow()
        this.glow.scale.set(data.cards.scale)
        this.glow.position.set(data.deckClose.glow.x, data.deckClose.glow.x)
        this.addChild(this.glow)

        this.zIndex = data.deckClose.zIndex
        this.interactive = true
        this.buttonMode = true
        this
            .on('pointerdown', this.onDown)
            .on('pointerover', this.onOver)
            .on('pointerout', this.onOut)
    }
    animate(delay, callback = function (){}){

        gsap.from(this.children.slice(1), {
            pixi:{x: 230},
            delay: delay,
            stagger: 0.025 ,
            ease:'Expo.easeOut',
            duration: 0.5,
            onStart(){
                reloadDeck.currentTime = 1
                reloadDeck.play()
            },
            onComplete(){
                callback()
            }
        })
    }
    onDown(){
        const interactiveOn = () => this.interactive = true
        this.interactive = false
        if(this.children.length > 2){

            const upperCard = this.children[this.children.length - 1]
            upperCard.open()
            gsap.to(upperCard, {
                pixi: {x: 115},
                ease: 'Power2.easeOut',
                duration: 0.12,
                onStart(){
                    backCardSound.currentTime = 0
                    backCardSound.play()
                },
                onComplete(){
                    upperCard.x = 0
                    game.deckOpen.addChild(upperCard)
                    backCardSound.pause()
                    interactiveOn()
                }
            })
        } else if (game.deckOpen.children.length > 0) {

               game.deckOpen.children.forEach(card => card.close())

               while (game.deckOpen.children.length > 0) {
                   game.deckClose.addChild(game.deckOpen.children.pop())
               }

               gsap.from(game.deckClose.children.slice(2).reverse(), {
                   pixi: {x: 115},
                   ease: 'Power2.easeOut',
                   stagger: 0.025,
                   duration: 0.2,
                   onStart(){
                       reloadDeck.currentTime = 1
                       reloadDeck.play()
                   },
                   onComplete() {
                       reloadDeck.pause()
                       interactiveOn()
                   }
               })

        } else {
            interactiveOn()
        }
    }
    onOver(){
        this.glow.visible = true
        this.glow.alpha = 0.5
    }
    onOut(){
        this.glow.visible = false
        this.glow.alpha = 0
    }

}
