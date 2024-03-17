rows = 6
columns = 7

grid = {
    blocks:[],
    push(block){
        this.blocks.push(block);
    },
    get(x, y){
        return this.blocks[x*rows + y]
    },
    set(x, y, arg, value){
        this.blocks[x*rows + y][arg] = value
    },
    neighbours(x, y){
        n=[]
        
        //y - 1 > -1 ? n.push(this.get(x, y-1)) : n.push(this.get(x, rows - 1));
        //x + 1 < columns ? n.push(this.get(x+1, y)) : n.push(this.get(0, y));
        //y + 1 < rows ? n.push(this.get(x, y+1)) : n.push(this.get(x, 0));
        //x - 1 > -1 ? n.push(this.get(x-1, y)) : n.push(this.get(columns - 1, y));

        y - 1 > -1 ? n.push(this.get(x, y-1)) : n.push(undefined);
        x + 1 < columns ? n.push(this.get(x+1, y)) : n.push(undefined);
        y + 1 < rows ? n.push(this.get(x, y+1)) : n.push(undefined);
        x - 1 > -1 ? n.push(this.get(x-1, y)) : n.push(undefined);

        return n
    },log(){
        
        text=""
        for(let y = 0; y < rows; y++){
            for(let x = 0; x < columns; x++){
                //debugger
                t = this.get(x, y);
                text += t;
            }
            text += "\n"
        }
        console.log(text)
    }
}

blocks =  [
    "0","0", "0", "0", "0", "0", "0",
    "0", "0", "2", "6", "4", "0", "0",
    "0", "2", "7", "5", "8", "4", "0",
    "2", "7", "1", "0", "3", "8", "4",
    "7", "1", "0", "0", "0","3", "8",
    "1", "0", "0", "0", "0", "0", "3"
]

nblocks = [
    "0", "0", "0", "2", "7", "1",
    "0", "0", "2", "7", "1", "0",
    "0", "2", "7", "1", "0", "0",
    "0", "6", "5", "0", "0", "0",
    "0", "4", "8", "3", "0", "0",
    "0", "0", "4", "8", "3", "0",
    "0", "0", "0", "4", "8", "3"
]

grid.blocks = nblocks

grid.log()

rules = {}

for(let y = 0; y < rows; y++){
    for(let x = 0; x < columns; x++){
        type = grid.get(x, y)
        if(!Object.keys(rules).includes(type)){
            rules[type] = []
            for(let t = 0; t < 4; t++){
                rules[type][t] = []
            }
        }
    }
}

for(let y = 0; y < rows; y++){
    for(let x = 0; x < columns; x++){
        type = grid.get(x, y)
        ns = grid.neighbours(x, y)
        for(let t = 0; t < 4; t++){
            n = ns[t]
            if(n != undefined){
                if(rules[type][t] == undefined){
                    rules[type][t] = []
                }
                if(rules[n][(t+2)%4] == undefined){
                    rules[n][(t+2)%4] = []
                }
                if(type == n){console.log(x, y, type, n, t)}
                rules[type][t].push(n)
                rules[n][(t+2)%4].push(type)
            }
        }
    }
}

function same(array1, array2){
    let array = []
    array1.forEach(el => {
        if(array2.includes(el) && !array.includes(el)){array.push(el)};
    })
    return array
}

Object.keys(rules).forEach(type => {
    for(let t = 0; t < 4; t++){
        rules[type][t] = same(rules[type][t], rules[type][t]).sort((a, b) => a - b);
    }
})
