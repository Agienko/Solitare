import {animationData} from "../../../data/animationData.js";


let data = animationData.winAnimation.blurScene

export const blurScene = (cont1, cont2, delay = 0) => {

    const blurFilter1 = new PIXI.filters.BlurFilter();
    const blurFilter2 = new PIXI.filters.BlurFilter();

    cont1.filters = [blurFilter1];
    cont2.filters = [blurFilter2];

    blurFilter1.blur = 0
    blurFilter2.blur = 0

    gsap.to(blurFilter1, {delay: delay - 1, ...data.blurFilter1})
    gsap.to(blurFilter2, {delay: delay + 2, ...data.blurFilter2})

}
