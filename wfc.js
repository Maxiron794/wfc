class Grid{
    constructor(height, width, seed=Math.random()){
        this.height = height;
        this.width = width;
        
        this.blocks = []

        for(let y = 0; y < width; y++){
            this.blocks[y] = [y]
        }
    }

    static from_list(width, list){
        let newgrid = new Grid(Math.floor(list.length / width), width)
        for(i = 0; i < list.length; i++){
            newgrid.blocks[Math.floor(i / width)][i % width] = list[i];
        }
        return newgrid
    }
}

class Piece{
    constructor(data, log=undefined){
        this.data = data
        this.log = log
    }
}

class Rules{
    constructor(){
        this.rules
    }

    add(id, connections){

    }   
    
    static from_object(rules){
        this.rules = rules;
    }
}

// const pieces = []

blocks =  [
    "0","0", "0", "0", "0", "0", "0",
    "0", "0", "2", "6", "4", "0", "0",
    "0", "2", "7", "5", "8", "4", "0",
    "2", "7", "1", "0", "3", "8", "4",
    "7", "1", "0", "0", "0","3", "8",
    "1", "0", "0", "0", "0", "0", "3"
]

learngrid = Grid.from_list(7, blocks)

console.log(learngrid)