import {data} from "../data/data.js"

root.style.transform = `scale(${window.innerWidth/data.canvas.width < 1 
    ? window.innerWidth/data.canvas.width 
    : 1})`

window.addEventListener('resize', function () {
    root.style.transform = `scale(${window.innerWidth/data.canvas.width < 1 
        ? window.innerWidth/data.canvas.width 
        : 1
    })`
})
