import {app, game} from "../app.js";

export class ClockMoves extends PIXI.Container{
    constructor() {
        super()
        this.startDate = new Date()
        this.style = new PIXI.TextStyle({
            fontFamily: 'serif',
            fontSize: 18,
            fontWeight: 'normal',
            fill: ['#fdf8da', '#94e577'], // gradient
            stroke: '#071c02',
            strokeThickness: 2,
            dropShadow: true,
            dropShadowColor: 'rgba(2,33,9,0.4)',
            dropShadowBlur: 3,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 1.5,
            wordWrap: true,
            wordWrapWidth: 540,
            lineJoin: 'round',
        });

        this.timeText = new PIXI.Text('00:00', this.style);
        this.timeText.position.set(1200, 0)

        this.countText = new PIXI.Text('0 ход', this.style);
        this.countText.position.set(1132, 0)

        this.addChild(this.countText, this.timeText)

        app.ticker.add((delta)=>{

        let gameTime = new Date() - this.startDate
        let min = Math.floor(gameTime / 1000 / 60 );
        let sec = Math.floor((gameTime / 1000) % 60);
        min = min < 10 ? '0' + min : min
        sec = sec < 10 ? '0' + sec : sec

        this.timeText.text = ` ${min}:${sec}`
        this.countText.text = ` ${game.memory.getMovesCount()} move`
       })
    }
    reload(){
        this.startDate = new Date()
    }

}
