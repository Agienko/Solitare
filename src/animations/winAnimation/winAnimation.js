import {app, game} from "../../app.js";
import { winMusic} from "../../sounds/sounds.js";
import {randomMinMax} from "../../common/randMinMax.js";
import {dropCardsAnim} from "./dropCardsAnim.js";
import {rotateCardAnim} from "./rotateCardAnim.js";
import {winTextAnim} from "./winTextAnim.js";
import {blurScene} from "./blurScene.js";
import {animationData} from "../../../data/animationData.js";

let data = animationData.winAnimation.winAnimation

let winSceneAnimation = new PIXI.Container()

export const winAnimation =(demo = false) =>{

   winSceneAnimation = new PIXI.Container()

   let dropCardsContainer = new PIXI.Container()
   let rotateCardContainer = new PIXI.Container()
   let finalTextContainer = new PIXI.Container()

   winSceneAnimation.addChild(dropCardsContainer, rotateCardContainer, finalTextContainer)
   winSceneAnimation.zIndex = data.zIndex

   app.stage.addChild(winSceneAnimation)

   const timePoints = data.timePoints

   if(game.checkWin() || demo){
      winMusic.currentTime = 0
      winMusic.play()

      timePoints.forEach((delay,i)=>
          dropCardsAnim(
              dropCardsContainer,
              delay,
              randomMinMax(...data.minMaxX),
              randomMinMax(...data.minMaxY)
          ))

      let delay = data.rotatedCards.delay
      let interval = data.rotatedCards.interval
      let y = data.rotatedCards.y
      for(let i = 0; i < data.rotatedCards.count; i++){
         rotateCardAnim(rotateCardContainer, delay + i*interval, y[0])
         rotateCardAnim(rotateCardContainer, delay + i*interval, y[1], false)
         rotateCardAnim(rotateCardContainer,delay + i*interval, y[2])
         rotateCardAnim(rotateCardContainer,delay + i*interval, y[3], false)
      }
      winTextAnim(finalTextContainer, data.winTextAnimationDelay)
      blurScene(dropCardsContainer,rotateCardContainer , data.blurSceneDelay)
   }

}

export function removeWinAnimation(){
   winSceneAnimation.removeChildren()
   winMusic.pause()
}

//run demo
window.demo = winAnimation
