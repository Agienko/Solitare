let app = new PIXI.Application({width: 500, heigh: 500})


let loader =  PIXI.Loader.shared
loader
    .add('atlas', 'img/atlas.json')
    .load((i, res) =>{
        let id = res.atlas.textures
        let sprite = new PIXI.Sprite(id['2c'])
    console.log(i)
        app.stage.addChild(sprite)
    });



document.body.appendChild(app.view)

