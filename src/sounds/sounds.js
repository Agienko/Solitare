import {game} from "../app.js";

export const cardTake = new Audio('../res/sounds/card_take.mp3');
cardTake.volume = 0.5;

export const reloadDeck = new Audio('../res/sounds/reloadDeck.mp3');
reloadDeck.volume = 1;

export const winMusic = new Audio('../res/sounds/winMusic.mp3');
winMusic.volume = 1;

export const clickSound = new Audio('../res/sounds/click.mp3');
clickSound.volume = 0.9;

export const backCardSound = new Audio('../res/sounds/backCard.mp3');
backCardSound.volume = 0.3;

export function toggleSounds(){
   let toggler = game.btns[3].point.visible ? 1 : 0

    cardTake.volume = 0.5 * toggler;
    reloadDeck.volume = 1 * toggler;
    winMusic.volume = 1 * toggler;
    clickSound.volume = 0.9 * toggler;
    backCardSound.volume = 0.3 * toggler;

    game.btns[3].togglePoint()
}
