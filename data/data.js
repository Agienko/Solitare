export const data = {
    canvas:{
        backgroundColor: '0x0a9033',
        width: 1280,
        height: 720,
        antialias: true
    },
    btns:{
        x:0,
        y: 30,
        startAlpha: 0.9,
        maskRadius: 42,
        alpha: 0.9,
        scale: 0.45,
        onOver:{
            pixi:{scale:0.48, alpha: 1},
            duration: 0.15,
            ease: 'Power1.easeIn'
        } ,
        onOut:{
            pixi:{scale:0.45, alpha: 0.9},
            duration: 0.15,
            ease: 'Power1.easeOut'
        },

        newGameBtn:{
            x:50
        },
        replayBtn:{
            x:110
        },
        backBtn:{
            x:170
        },
        soundBtn:{
            x:1160
        },
        infoBtn:{
            x:1230
        },
    },
    deckClose:{
        zIndex: 2,
        position:{
          x:260,
          y:10,
        },
        glow:{
            x:-2,
            y:-2
        }
    },
    deckOpen:{
        position: {
            x: 375,
            y:10,
        }
    },
    glow:{
        alpha: 0.5,
        position:{
            x:-5,
            y:-5
        }
    },
    maskCard:{
        zIndex: 200
    },
    homes:{
        startX: 605,
        step: 115,
        y: 10
    },
    reels:{
        startX: 375,
        step: 115,
        y: 170
    },

    cards: {
        startPositionX: 490,
        startPositionY: 10,
        scale: 0.6,
        deltaY: 32

    },

}
