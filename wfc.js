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