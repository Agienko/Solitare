import {app, game, textures} from "../app.js";
import {mainMusic, winMusic} from "../sounds/sounds.js";
import {randomMinMax} from "../common/randMinMax.js";


export let winSceneAnimation = new PIXI.Container()

let dropCardsContainer
let rotateCardContainer
let finalTextContainer


export const winAnimation =() =>{

   winSceneAnimation = new PIXI.Container()

   dropCardsContainer = new PIXI.Container()
   rotateCardContainer = new PIXI.Container()
   finalTextContainer = new PIXI.Container()

   winSceneAnimation.addChild(dropCardsContainer, rotateCardContainer, finalTextContainer)
   winSceneAnimation.zIndex = 200

   app.stage.addChild(winSceneAnimation)

   if(!game.checkWin()){
      mainMusic.pause()
      winMusic.currentTime = 0
      winMusic.play()
      const timeline = [
         0.153, 0.582, 0.796, 1.225, 1.659, 1.867, 2.494, 2.939, 3.365,
         3.582, 4.208, 4.653, 5.088, 5.296, 5.918, 6.346, 6.579, 6.802, 7.010,
         7.439, 7.653, 8.082, 8.516, 8.725, 9.351, 9.796, 10.222, 10.439, 11.065,
         11.510, 11.945, 12.153, 12.775, 13.203, 13.436, 13.659, 13.867, 14.296,
         14.510, 14.939, 15.373, 15.582
      ]

      timeline.forEach((delay,i)=> dropCards(delay, randomMinMax(180, 1050), randomMinMax(180, 540)))

      for(let i = 0; i < 150; i++){
         rotateCard(17 + i*0.23)
         rotateCard(17 + i*0.23, 250, false)
         rotateCard(17 + i*0.23, 400)
         rotateCard(17 + i*0.23, 550, false)
      }
      finalText(17)
      blurScene(32)
   }

}


function dropCards(delay = 0, x = 500, y = 200 ){

      dropCardsContainer.zIndex = 200
      let cardNames = game.deck.saveTextures
      for(let i = 0; i < 12; i++){
      let randomTexture = cardNames[Math.floor(Math.random()*52)]
      let card = new PIXI.Sprite(textures[randomTexture])
      card.visible = false
      card.anchor.set(0.5)
      card.scale.set(0.6)
      card.position.set(x, y)
      dropCardsContainer.addChild(card)
   }

   dropCardsContainer.children.forEach(card =>{
      gsap.to(card,{
         pixi:{x: card.x + randomMinMax(-140, 140), y: card.y + randomMinMax(-100, 100), angle: 180*Math.random()},
         delay: delay,
         duration: 1.16,
         ease:'Power4.easeOut',
         onStart(){
            card.visible = true
         }
      })
   })

}

function rotateCard(delay = 0, y = 100 , toRight = true){

   rotateCardContainer.zIndex = 201
   let cardNames = game.deck.saveTextures
   let randomTexture = cardNames[Math.floor(Math.random()*52)]
   let card = new PIXI.Sprite(textures[randomTexture])
   card.anchor.set(0.5)
   card.scale.set(0.6)
   card.position.set(-100, y)
   rotateCardContainer.addChild(card)

    let rotation = gsap.to(card,{
         pixi:{angle: toRight ? 360 : -360},
         duration: 2.33,
         ease:'Linear.easeInOut',
         repeat: -1
      })

if(toRight){
   gsap.to(card,{pixi:{x:1400}, delay: delay, duration: 3.5, ease:'Linear.easeInOut',
      onComplete(){
         rotation.pause()
         card.destroy()
      }
   })
} else {
   gsap.from(card,{pixi:{x:1400}, delay: delay, duration: 3.5, ease:'Linear.easeInOut',
      onComplete(){
         rotation.pause()
         card.destroy()
      }
   })
}

}

function finalText(delay) {

   let style = new PIXI.TextStyle({
      fontFamily: 'serif',
      fontSize: 200,
      // fontStyle: 'italic',
      fontWeight: 'bold',
      fill: ['#eae108', '#01ab1d'], // gradient
      stroke: '#2d2902',
      strokeThickness: 8,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 8,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 12,
      wordWrap: true,
      wordWrapWidth: 540,
      lineJoin: 'round',
   });


   const text = new PIXI.Text('YOU WIN!', style);
   text.anchor.set(0.5)


   finalTextContainer.x = app.screen.width / 2;
   finalTextContainer.y = app.screen.height / 2;
   finalTextContainer.addChild(text)
   finalTextContainer.zIndex = 500
   finalTextContainer.interactive = true
   finalTextContainer.buttonMode = true
   finalTextContainer.on('pointerdown', game.newGame.bind(game))


   gsap.from(finalTextContainer,{pixi:{scale: 0, alpha: 0}, delay: delay, duration: 1.67, ease:'Back.easeOut', onComplete(){
      gsap.to(finalTextContainer, {pixi: {scale: 1.1}, duration: 0.57, yoyo: true, repeat: -1, ease:'Sine.easeInOut'})
      }})
}

function blurScene(delay = 0) {
   const blurFilter1 = new PIXI.filters.BlurFilter();
   const blurFilter2 = new PIXI.filters.BlurFilter();

   dropCardsContainer.filters = [blurFilter1];
   rotateCardContainer.filters = [blurFilter2];

      blurFilter1.blur = 0
      blurFilter2.blur = 0

   gsap.to(blurFilter1, {blur: 5, duration: 6, delay: delay - 1, repeat: -1, yoyo: true, ease:'Sine.easeInOut'})
   gsap.to(blurFilter2, {blur: 5, duration: 4, delay: delay + 2, repeat: -1, yoyo: true, ease:'Sine.easeInOut'})

}


export function removeWinAnimation(){
   winSceneAnimation.removeChildren()
   winMusic.pause()

}
