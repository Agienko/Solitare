export const blurScene = (cont1, cont2, delay = 0) => {
    const blurFilter1 = new PIXI.filters.BlurFilter();
    const blurFilter2 = new PIXI.filters.BlurFilter();

    cont1.filters = [blurFilter1];
    cont2.filters = [blurFilter2];

    blurFilter1.blur = 0
    blurFilter2.blur = 0

    gsap.to(blurFilter1, {blur: 5, duration: 6, delay: delay - 1, repeat: -1, yoyo: true, ease:'Sine.easeInOut'})
    gsap.to(blurFilter2, {blur: 5, duration: 4, delay: delay + 2, repeat: -1, yoyo: true, ease:'Sine.easeInOut'})

}
