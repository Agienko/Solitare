import {data} from "../data/data.js"

document.body.style.backgroundColor = `${data.canvas.backgroundColor.replace(/0x/, '#')}`

root.style.transform = `scale(${
    Math.min(window.innerWidth/data.canvas.width, window.innerHeight/data.canvas.height, 1)
})`

window.addEventListener('resize', function () {
    root.style.transform = `scale(${
        Math.min(window.innerWidth/data.canvas.width, window.innerHeight/data.canvas.height, 1)
    })`

})
