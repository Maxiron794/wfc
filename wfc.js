class Grid{
    constructor(height, width, seed=Math.seed()){
        this.height = height;
        this.width = width;
        
        this.blocks = []

        for(x = 0; x < width; x++){
            this.blocks[x] = [x]
        }
    }

    from_list(width, list){
        for(i = 0; i < list.length; i++){
            this.blocks[Math.floor(i / width)][i % width]
        }
    }
}

class Piece{

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

const pieces = []

blocks =  [
    "0","0", "0", "0", "0", "0", "0",
    "0", "0", "2", "6", "4", "0", "0",
    "0", "2", "7", "5", "8", "4", "0",
    "2", "7", "1", "0", "3", "8", "4",
    "7", "1", "0", "0", "0","3", "8",
    "1", "0", "0", "0", "0", "0", "3"
]

learngrid = Grid.fromlist(7, blocks)

console.log(learngrid)