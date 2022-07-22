
export const createCard = name => {
    const card = new PIXI.Sprite(name)
    card.anchor.set(0.5)
    card.interactive = true;
    card.buttonMode = true;
    card.scale.set(0.6)
    // card.x = 200
    // card.y = 300
    card
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove)
    .on('pointerover', onOver)
    .on('pointerout', onOut);

    let deltaX, deltaY

    function onDragStart(event) {
        this.data = event.data;
        this.dragging = true;
        const newPosition = this.data.getLocalPosition(this.parent);
        deltaX = card.x - newPosition.x
        deltaY = card.y - newPosition.y
    }
    function onDragEnd() {
        this.dragging = false;
        this.data = null;
    }

    function onDragMove() {
        if (this.dragging) {
            const newPosition = this.data.getLocalPosition(this.parent);
            this.x = newPosition.x + deltaX
            this.y = newPosition.y + deltaY
        }
    }
    function onOver() {
       console.log('over')
    }
    function onOut() {
        console.log('out')
    }

    return card
}

document.addEventListener('pointermove', () =>{

})