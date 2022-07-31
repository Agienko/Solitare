export const animationData = {
        dealCardAnimation: {
            reelDelayArr: [0, 0.1, 0.2, 0.4, 0.7, 1.1, 1.4],
            deckCloseAnimationDelay: 1.6,
            maskCardDelay: 2.0
        },
        winAnimation: {
            blurScene: {
                blurFilter1: {
                        blur: 5,
                        duration: 6,
                        ease: 'Sine.easeInOut',
                        repeat: -1,
                        yoyo: true,
                },
                blurFilter2: {
                    blur: 5,
                    duration: 4,
                    ease: 'Sine.easeInOut',
                    repeat: -1,
                    yoyo: true,
                },
            },
            dropCardsAnim: {
                zIndex: 200,
                cardsCount: 12,
                duration: 1.16,
                ease:'Power4.easeOut',
                minMaxX: [-140, 140],
                minMaxY: [-100, 100]
            },
            rotateCardAnim: {
                zIndex: 201,
                rotation: {
                    duration: 2.33,
                    ease:'Linear.easeInOut',
                    repeat: -1
                },
                move:{
                    pixi:{x:1400},
                    duration: 3.5,
                    ease:'Linear.easeInOut',
                }
            },
            winAnimation: {
                timePoints : [
                    0.153, 0.582, 0.796, 1.225, 1.659, 1.867, 2.494, 2.939, 3.365,
                    3.582, 4.208, 4.653, 5.088, 5.296, 5.918, 6.346, 6.579, 6.802, 7.010,
                    7.439, 7.653, 8.082, 8.516, 8.725, 9.351, 9.796, 10.222, 10.439, 11.065,
                    11.510, 11.945, 12.153, 12.775, 13.203, 13.436, 13.659, 13.867, 14.296,
                    14.510, 14.939, 15.373, 15.582
                ],
                zIndex: 200,
                minMaxX: [180, 1050],
                minMaxY: [180, 540],
                rotatedCards: {
                    count: 150,
                    delay: 17,
                    interval: 0.23,
                    y: [100, 250, 400, 550],
                },
                winTextAnimationDelay: 17,
                blurSceneDelay: 32,

            },
            winTextAnim: {
                style: {
                    fontFamily: 'serif',
                    fontSize: 200,
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
                },
                zIndex: 500,
                beginAnimation: {
                    pixi:{scale: 0, alpha: 0},
                    duration: 1.67,
                    ease:'Back.easeOut',
                },
                onCompleteAnimation: {
                    pixi: {scale: 1.1},
                    duration: 0.57,
                    yoyo: true,
                    repeat: -1,
                    ease:'Sine.easeInOut'
                }
            }
        }
}
