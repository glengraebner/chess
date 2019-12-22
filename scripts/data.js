//  game[0] is array of 32 chess pieces with listeners
/*
    game[0][0] = ''
    
*/

//  game[1] is array of 64 squares on chess board
/*

*/

//  game[2] is set of game variables
/* 
    game[2][0] - player move
    game[2][1] - computer move
    game[2][2] - valid computer moves
    game[2][3] - number of possible computer moves
    game[2][4] - computer score
    game[2][5] - player score
    game[2][6] - player color
    game[2][7] - computer skill level
    game[2][8] - selected piece
    game[2][9] - from square
    game[2][10] - to square
*/

//  game[3] is game board
/*

*/

//  game[4] is HTML elements
/*
    game[4][0] - 
*/

//  game[5] is all moves
/*
    
*/

//  game[6] is tempboard
/*
    
*/

var game = new Object();

// Update 12/20/2019
function GetGame() {
    return game;
}

// Updated 12/20/2019
function SetGame(gameobj) {
    game = gameobj;
}