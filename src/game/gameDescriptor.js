
export const gameDescriptor = {
    layout: [],
    layoutOpen: [],
    _layoutSafe: [],
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
    _createDeck(){
        const deck = []
        for(let i = 1;i <= 13; i++){
            deck.push(i + 'c', i + 'd',  i + 'h', i + 's')
        }
        return deck
    },
    _clear(){
        this.layoutOpen = []
        this.homes = {
            1: [],
            2: [],
            3: [],
            4: [],
        }
        this.reels = {
            1:[],
            2:[],
            3:[],
            4:[],
            5:[],
            6:[],
            7:[],
        }
    },
    newGame(){
        const deck = this._createDeck()
        this._clear()
        this.layout = deck.sort(() => Math.random() - 0.5)
            .map(i => [i, false])//visible
        this._layoutSafe = [...this.layout]
    },
    replayGame(){
        this._clear()
        this.layout = this._layoutSafe
            .map(i => [i[0], false])//visible
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
        //open last card in reel
        for(let i = 1; i <= 7; i++){
          this.reels[i][this.reels[i].length - 1][1] = true
        }
    },
    translateInOpen(el){
       let index = this.layout.indexOf(el)
        this.layoutOpen.push(this.layout.splice(index, 1))
    },
    translateFromOpen(){
        this.layout = [...this.layoutOpen]
        this.layoutOpen = []
    },
    isLayoutEmpty(){
        return this.layout.length === 0
    }
}
