export const data = {
    canvas:{
        backgroundColor: 0x0b9038,
        width: 1280,
        height: 720,
        antialias: true
    },
    menu:{
        defaultY: 40,
        btns:{
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
            }
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
    }
}