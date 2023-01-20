const grid = [[2, 5, 0, 0, 3, 0, 9, 0, 1],
                [0, 1, 0, 0, 0, 4, 0, 0, 0],
                [4, 0, 7, 0, 0, 0, 2, 0, 8],
                [0, 0, 5, 2, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 9, 8, 1, 0, 0],
                [0, 4, 0, 0, 0, 3, 0, 0, 0],
                [0, 0, 0, 3, 6, 0, 0, 7, 2],
                [0, 7, 0, 0, 0, 0, 0, 0, 3],
                [9, 0, 3, 0, 0, 0, 6, 0, 4]];

function findSpace(grid){
    for(let r =0; r<9; r++ ){
        for(let c =0; c<9; c++ ){
            if(grid[r][c] == 0){
                return {row : r, col: c};
            }
        }
    }
    return -1;
}  

function posibileValues(grid, row, col){
    const map1 = new Map([
        [1,''],[2,''],[3,''],[4,''],[5,''],[6,''],[7,''],[8,''],[9,''],
    ])
    const ro = Math.floor(row/3)*3;
    const co = Math.floor(col/3)*3;
    for(let r =0; r<9; r++ ){
        map1.delete(grid[row][r]);
        map1.delete(grid[r][col]);
    }
    for(let i=ro; i<ro+3; i++){
        for(let j=co; j<co+3; j++){
            map1.delete(grid[i][j]);
        }
    }
    return map1
}

function check(grid){
    const nextSpace = findSpace(grid);
    if(nextSpace == -1){
        printGrid(grid)
        return true;
    }
    const posibile = posibileValues(grid, nextSpace.row, nextSpace.col);
    for(let pos of posibile){
        grid[nextSpace.row][nextSpace.col] = pos[0];
        if(check(grid)){
            return true;
        }
    }
    grid[nextSpace.row][nextSpace.col] = 0;
}

function printGrid(grid){
    
    for(let i=0; i<9; i++){
        if(i%3 === 0 && i != 0){
            console.log("-".repeat(22));
        }
        console.log(' '+grid[i][0]+" "+grid[i][1]+" "+grid[i][2]+" | "+grid[i][3]+" "+grid[i][4]+" "+grid[i][5]+" | "+grid[i][6]+" "+grid[i][7]+" "+grid[i][8]);
    }
}
const t1 = new Date().getTime();
check(grid);
const t2 = new Date().getTime();
console.log("time ",(t2-t1)/1000)