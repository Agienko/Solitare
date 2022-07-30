import {app} from "../app.js";

export class Clock extends PIXI.Container{
    constructor() {
        super()
        this.startDate = new Date()
        this.style = new PIXI.TextStyle({
            fontFamily: 'serif',
            fontSize: 30,
            fontWeight: 'normal',
            fill: ['#fdf8da', '#94e577'], // gradient
            stroke: '#071c02',
            strokeThickness: 3,
            dropShadow: true,
            dropShadowColor: 'rgba(2,33,9,0.4)',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 1.7,
            wordWrap: true,
            wordWrapWidth: 540,
            lineJoin: 'round',
        });

        this.timeText = new PIXI.Text('', this.style);
        this.timeText.text = '00:00'
        this.position.set(1160, 60)
        this.addChild(this.timeText)
        app.ticker.add((delta)=>{
        let gameTime = new Date() - this.startDate
        let min = Math.floor(gameTime / 1000 / 60 );
        let sec = Math.floor((gameTime / 1000) % 60);
        min = min < 10 ? '0' + min : min
        sec = sec < 10 ? '0' + sec : sec
        this.timeText.text = `${min}:${sec}`
       })
    }
    reload(){
        this.startDate = new Date()
    }

}
