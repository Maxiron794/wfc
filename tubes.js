const p = document.getElementById("tubes");

rows = 8;
columns = 16;

const pieces = []

class Piece{
    constructor(output, connections){
        this.output = output;
        this.connections = connections;
    }
}

box = ['░', "▒", '▓']

debugger;

/*
pieces.push(new Piece("a",[[1, 11], [7, 13], [7], [8, 12]]))
pieces.push(new Piece("l",[[2], [12], [11], [2]]))
pieces.push(new Piece("lu",[[7], [5, 1], [1], [7]]))
pieces.push(new Piece("r",[[4], [4], [11], [13]]))
pieces.push(new Piece("ru",[[8], [8], [3], [3, 6]]))
pieces.push(new Piece("x",[[10], [4], [11], [2]]))
pieces.push(new Piece("X",[[9], [6], [10], [5]]))
pieces.push(new Piece("L",[[1], [2], [2], [1]]))
pieces.push(new Piece("R",[[3], [3], [4], [4]]))*/



pieces.push(new Piece("░",[[1, 11], [7, 13], [7, 8, 9], [8, 12]]))
pieces.push(new Piece("▒",[[2], [12], [11], [2]]))
pieces.push(new Piece("▒",[[7], [5, 1], [1], [7]]))
pieces.push(new Piece("▒",[[4], [4], [11], [13]]))
pieces.push(new Piece("▒",[[8], [8], [3], [3, 6]]))
pieces.push(new Piece("▒",[[10], [4], [11], [2]]))
pieces.push(new Piece("▓",[[9], [6], [10], [5]]))
pieces.push(new Piece("▓",[[1], [2], [2], [1]]))
pieces.push(new Piece("▓",[[3], [3], [4], [4]]))


/*connections = {
    "═":[[0], [1], [0], [1]],
    "╠":[[1], [1], [1], [0]],
    "║":[[1], [0], [1], [0]],
    "╣":[[1], [0], [1], [1]],
    "╔":[[0], [1], [1], [0]],
    "╗":[[0], [0], [1], [1]],
    "╚":[[1], [1], [0], [0]],
    "╝":[[1], [0], [0], [1]],
    "╬":[[1], [1], [1], [1]],
    "╦":[[0], [1], [1], [1]],
    "╩":[[1], [1], [0], [1]]
}*/

/*
Object.keys(connections).forEach(piece => {
    pieces.push(new Piece(piece, connections[piece]))
})*/

possible = []

for(let i = 0; i < pieces.length; i++){
    possible.push("" + i)
}

/*
connections = {
    "╭":[[0], [1], [1], [0]],
    "╮":[[0], [0], [1], [1]],
    "╯":[[1], [0], [0], [1]],
    "╰":[[1], [1], [0], [0]]
}*/

rules = {}

/*for(let i = 0; i < pieces.length; i++){
    let piece = pieces[i]
    rules[i] = []
    for(let k = 0; k < 4; k++){
        rules[i][k] = []
        pieces.forEach(piece2 => {
            if(same(piece.connections[k],piece2.connections[(k+2)%4]).length){
                rules[i][k].push(pieces.indexOf(piece2))
            }
        }) 
    }
}*/

rules = {
    "0":[["0","1","3","5"],["0","2","3"],["0","2","4","6"],["0","1","4"]],
    "1":[["7"],["0"],["0"],["7"]],
    "2":[["0"],["6","7"],["7"],["0"]],
    "3":[["8"],["8"],["0"],["0"]],
    "4":[["0"],["0"],["8"],["6","8"]],
    "5":[["6"],["8"],["0"],["7"]],
    "6":[["0"],["4"],["5"],["2"]],
    "7":[["2"],["1","5"],["1"],["2"]],
    "8":[["4"],["4"],["3"],["3","5"]]
}

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
        
        /*
        y - 1 > -1 ? n.push(this.get(x, y-1)) : n.push(this.get(x, rows - 1));
        x + 1 < columns ? n.push(this.get(x+1, y)) : n.push(this.get(0, y));
        y + 1 < rows ? n.push(this.get(x, y+1)) : n.push(this.get(x, 0));
        x - 1 > -1 ? n.push(this.get(x-1, y)) : n.push(this.get(columns - 1, y));
        */

        y - 1 > -1 ? n.push(this.get(x, y-1)) : n.push(undefined);
        x + 1 < columns ? n.push(this.get(x+1, y)) : n.push(undefined);
        y + 1 < rows ? n.push(this.get(x, y+1)) : n.push(undefined);
        x - 1 > -1 ? n.push(this.get(x-1, y)) : n.push(undefined);

        return n
    },
    count_entropy(){
        this.blocks.forEach(block => {
            //if(block.type != "#"){
                ns = this.neighbours(block.x, block.y)
                for(let i = 0; i < ns.length; i++){
                    n=ns[i]
                    if(n != undefined && n.type == "#"){
                        //console.log(block.x, block.y, block)
                        sumRule = []
                        block.possible.forEach(type => {
                            rules[type][i].forEach(el => {
                                if(!sumRule.includes(el)){sumRule.push(el)}
                            })
                        })
                        //console.log(n.possible, sumRule)
                        n.possible = same(n.possible, sumRule)
                        //console.log(n.possible)
                        n.entropy = n.possible.length;
                    }
                };
            //}
        });
    },try(){
        copy = [...this.blocks];
        //copy = shuffle(copy)
        copy.sort((a, b) => a.entropy - b.entropy);
        //console.log(copy)
        for(i = 0; i < copy.length; i++){
            if(copy[i].type != "#"){continue;}

            copy[i].type = copy[i].possible[Math.floor(Math.random()*copy[i].entropy)]

            copy[i].entropy = 0;
            copy[i].possible = [copy[i].type];
            return true;
        }
        return false;
    },draw(){
        p.innerHTML = "";
        for(let y = 0; y < rows; y++){
            for(let x = 0; x < columns; x++){
                type = this.get(x, y).type
                if(type == "#"){
                    p.innerText += "#"
                }else{
                    p.innerText += type == undefined ? "E" : pieces[type].output
                }
                
            }
            p.innerHTML += "<br>"
        }
    },log(){
        text=""
        for(let y = 0; y < rows; y++){
            for(let x = 0; x < columns; x++){
                text += this.get(x, y).type == "#" ? this.get(x, y).entropy : this.get(x, y).type
            }
            text += "\n"
        }
        console.log(text)
    },console(){
        text=""
        for(let y = 0; y < rows; y++){
            for(let x = 0; x < columns; x++){
                text += this.get(x, y).type == "#" ? this.get(x, y).entropy : pieces[this.get(x, y).type].output
            }
            text += "\n"
        }
        console.log(text)
    }


}

for(let x = 0; x < columns; x++){
    for(let y = 0; y < rows; y++){
        grid.push({"x": x, "y":y, "type":"#", entropy:pieces.length, possible:possible});
    }
}

//grid.log()

grid.set(columns/2, 1, "type", 8)
grid.set(columns/2, 1, "possible", [8])

function cycle(){
    grid.count_entropy();
    grid.log()
    unsolved = grid.try();
    grid.draw();
    if(unsolved){
        setTimeout(cycle, 10)
    }else{
        grid.log()
    }
}

function start(){
    unsolved = true;
    cycle()
    grid.draw();
}



start()


function same(array1, array2){
    let array = []
    array1.forEach(el => {
        if(array2.includes(el) && !array.includes(el)){array.push(el)};
    })
    return array
}

function sum(...arrays){
    let newArray = []
    arrays.forEach(array => {
        array.forEach(el => {
            if(!newArray.includes(el)){newArray.push(el)}
        })
    })
    
    return newArray
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}