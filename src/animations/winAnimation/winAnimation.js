import {app, game} from "../../app.js";
import { winMusic} from "../../sounds/sounds.js";
import {randomMinMax} from "../../common/randMinMax.js";
import {dropCardsAnim} from "./dropCardsAnim.js";
import {rotateCardAnim} from "./rotateCardAnim.js";
import {winTextAnim} from "./winTextAnim.js";
import {blurScene} from "./blurScene.js";

let winSceneAnimation = new PIXI.Container()

export const winAnimation =(demo = false) =>{

   winSceneAnimation = new PIXI.Container()

   let dropCardsContainer = new PIXI.Container()
   let rotateCardContainer = new PIXI.Container()
   let finalTextContainer = new PIXI.Container()

   winSceneAnimation.addChild(dropCardsContainer, rotateCardContainer, finalTextContainer)
   winSceneAnimation.zIndex = 200

   app.stage.addChild(winSceneAnimation)

   const timePoints = [
      0.153, 0.582, 0.796, 1.225, 1.659, 1.867, 2.494, 2.939, 3.365,
      3.582, 4.208, 4.653, 5.088, 5.296, 5.918, 6.346, 6.579, 6.802, 7.010,
      7.439, 7.653, 8.082, 8.516, 8.725, 9.351, 9.796, 10.222, 10.439, 11.065,
      11.510, 11.945, 12.153, 12.775, 13.203, 13.436, 13.659, 13.867, 14.296,
      14.510, 14.939, 15.373, 15.582
   ]

   if(game.checkWin() || demo){
      winMusic.currentTime = 0
      winMusic.play()

      timePoints.forEach((delay,i)=>
          dropCardsAnim(
              dropCardsContainer,
              delay,
              randomMinMax(180, 1050),
              randomMinMax(180, 540)
          ))

      for(let i = 0; i < 150; i++){
         rotateCardAnim(rotateCardContainer, 17 + i*0.23)
         rotateCardAnim(rotateCardContainer, 17 + i*0.23, 250, false)
         rotateCardAnim(rotateCardContainer,17 + i*0.23, 400)
         rotateCardAnim(rotateCardContainer,17 + i*0.23, 550, false)
      }
      winTextAnim(finalTextContainer, 17)
      blurScene(dropCardsContainer,rotateCardContainer , 32)
   }

}

export function removeWinAnimation(){
   winSceneAnimation.removeChildren()
   winMusic.pause()

}

//run demo
window.demo = winAnimation
