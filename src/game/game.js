
export const gameDescriptor = {
    layout: [],
    _layoutSafe: [],
    scopeClose:[],
    scopeOpen: [],
    homes: {
        1: [],
        2: [],
        3: [],
        4: [],
    },
    reels:{
        1:[],
        2:[],
        3:[],
        4:[],
        5:[],
        6:[],
        7:[],
   },
    newLayout(){
        const deck = []
        for(let i = 1;i <= 13; i++){
            deck.push(i + 'c', i + 'd',  i + 'h', i + 's')
        }
        this.layout = deck.sort(() => Math.random() - 0.5)
            .map(i => [i, false])//visible
        this._layoutSafe = [...this.layout]
    },
    deal(){
        for(let i = 1; i <= 7; i++){
           if (this.reels[1].length < 1) {
               this.reels[1] = [...this.reels[1], this.layout.pop()]
           }
            if (this.reels[2].length < 2) {
                this.reels[2] = [...this.reels[2], this.layout.pop()]
            }
            if (this.reels[3].length < 3) {
                this.reels[3] = [...this.reels[3], this.layout.pop()]
            }
            if (this.reels[4].length < 4) {
                this.reels[4] = [...this.reels[4], this.layout.pop()]
            }
            if (this.reels[5].length < 5) {
                this.reels[5] = [...this.reels[5], this.layout.pop()]
            }
            if (this.reels[6].length < 6) {
                this.reels[6] = [...this.reels[6], this.layout.pop()]
            }
            this.reels[7] = [...this.reels[7], this.layout.pop()]
        }

    }
}
