import {data} from "../data/data.js"

document.body.style.backgroundColor = `${data.canvas.backgroundColor.replace(/0x/, '#')}`

root.style.transform = `scale(${window.innerWidth/data.canvas.width < 1 
    ? window.innerWidth/data.canvas.width 
    : 1})`

window.addEventListener('resize', function () {
    root.style.transform = `scale(${window.innerWidth/data.canvas.width < 1 
        ? window.innerWidth/data.canvas.width 
        : 1
    })`
})
