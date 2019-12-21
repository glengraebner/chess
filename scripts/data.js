//  game[0] is array of 32 chess pieces with listeners
/*
    game[0][0] = ''
    
*/

//  game[1] is array of 64 squares on chess board
/*

*/

//  game[2] is set of game variables
/* 
    game[2][0] - playermove
    game[2][1] - computermove
    game[2][2] - validcompmoves
    game[2][3] - numcompmoves
    game[2][4] - computerscore
    game[2][5] - playerscore
    game[2][6] - player
    game[2][7] - compskilllvl       
*/

//  game[3] is game board
/*

*/

//  game[4] is 
/*
    game[4][0] - 
*/

var game;

// Update 12/20/2019
function GetGame() {
    return game;
}

// Updated 12/20/2019
function SetGame(gameobj) {
    game = gameobj;
}