class Grid{
    constructor(height, width, seed=Math.seed()){
        this.height = height;
        this.width = width;
        
        this.blocks = []

        for(x = 0; x < width; x++){
            this.blocks[x] = [x]
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

learngrid = Grid.fromlist()