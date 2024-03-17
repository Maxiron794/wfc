/*const canvas = document.getElementById("canvas");
const canvas1 = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
const canvas3 = document.getElementById("canvas3");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "red"
ctx.fillRect(0, 0, 100, 100);

height = 320;
width = 320;

rows = 16;
columns = 16;

rules = {"red":["red","yellow"], "yellow":["red", "green", "yellow"], "green":["green", "yellow"], "gray":["yellow", "red", "green"]}

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
        
        y - 1 > -1 ? n.push(this.get(x, y-1)) : n.push(this.get(x, rows - 1));
        x + 1 < columns ? n.push(this.get(x+1, y)) : n.push(this.get(0, y));
        y + 1 < rows ? n.push(this.get(x, y+1)) : n.push(this.get(x, 0));
        x - 1 > -1 ? n.push(this.get(x-1, y)) : n.push(this.get(columns - 1, y));

        //y - 1 > -1 ? n.push(this.get(x, y-1)) : n.push(undefined);
        //x + 1 < columns ? n.push(this.get(x+1, y)) : n.push(undefined);
        //y + 1 < rows ? n.push(this.get(x, y+1)) : n.push(undefined);
        //x - 1 > -1 ? n.push(this.get(x-1, y)) : n.push(undefined);

        return n
    },
    count_entropy(){
        this.blocks.forEach(block => {
            this.neighbours(block.x, block.y).forEach(n => {
                if(n != undefined && n.color == "gray"){
                    n.possible = n.possible.filter( (el) => rules[block["color"]].includes(el));
                    n.entropy = n.possible.length;
                }
            });
        });
    },try(){
        copy = [...this.blocks];
        copy.sort((a, b) => a.entropy - b.entropy);
        //console.log(copy)
        for(i = 0; i < copy.length; i++){
            if(copy[i].color != "gray"){continue;}
            copy[i].color = copy[i].possible[Math.floor(Math.random()*copy[i].entropy)]
            copy[i].entropy = 0;
            copy[i].possible = [];
            return true;
        }
        return false;
    },draw(){
        for(let x = 0; x < columns; x++){
            for(let y = 0; y < rows; y++){
                //console.log(this.get(x, y))
                ctx.fillStyle = this.get(x, y).color;
                ctx.fillRect(x*width/columns, y*height/rows, width/columns, width/columns);
                ctx.fillStyle = "black"
                ctx.fillText(this.get(x, y).entropy, x*width/columns, (y+1)*height/rows)
            }
        }
    }


}

for(let x = 0; x < columns; x++){
    for(let y = 0; y < rows; y++){
        grid.push({"x": x, "y":y, "color":"gray", entropy:0, possible:[...rules["gray"]]});
    }
}

unsolved = true;

function cycle(){
    grid.count_entropy();
    unsolved = grid.try();
    grid.draw();
    canvas1.getContext("2d").drawImage(canvas, 0, 0)
        canvas2.getContext("2d").drawImage(canvas, 0, 0)
        canvas3.getContext("2d").drawImage(canvas, 0, 0)
    if(unsolved){
        setTimeout(cycle, 1)
    }
}

cycle() */



