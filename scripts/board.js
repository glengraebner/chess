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
    game[2][11] - all moves
    game[2][12] - captured pieces
    game[2][13] - processes
    game[2][14] - which player moved
*/

//  game[3] is game board
/*

*/

//  game[4] is HTML elements
/*
    game[4][0] - player
    game[4][1] - computer skill level
    game[4][2] - last player move
    game[4][3] - last computer move
    game[4][4] - score
    game[4][5] - moves
    game[4][6] - processing
    game[4][7] - pieces
*/

//  game[5] is ...
/*
    
*/

//  game[6] is ...
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

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// settings
//var datafont = 'blue';

// game variables
//var player = 'white';
//var compskilllvl = 0;  // 0 - random, 1 - beginner, 2 - intermediate, 3 - advanced
//var gameobj[0] = new Array();
//var selectedpiece;
//var fromquare;
//var tosquare;
//var playermove;
//var computermove;
//var validcompmoves;
//var playerscore = 0;
//var computerscore = 0;
//var moves = new Array();
//var board = new Array(); // pieces on board
//var squares = new Array(); // names of squares
//var processes = new Array();
//var capturedpieces = new Array();
//var fromsquare, tosquare;

function StartUp() {
    
    var gameobj = GetGame();
    
    InitializePieces();                // 32 chess pieces with listeners
    InitializeSquares();               // 64 squares on chess board  
    InitializeGameVariables();         // set of game variables
    InitializeGameBoard();             // gameboard
    InitializeHTMLElements();          // connect to HTML elements
    UpdateGameDataWindow();
    
    //LoadNewGame();
}

function LoadNewGame() {

    InitializeGameVariables();         // set of game variables
    InitializeGameBoard();             // gameboard
    InitializeHTMLElements();          // connect to HTML elements
       
    //ResetGameData();
    //UpdateAnalysisWindow();
    // ToDo:  Fix this to change pieces
    //if(color === 'black'){  // computer goes first if player is black
    //    RecordComputerMove(SelectComputerMove());
    //}
    
    //UpdateBoard();
    //SetGame(gameobj);
    
}

// Updated 12/22/2019
function InitializePieces() {
    
    var gameobj = GetGame();
    var pieces = new Array();
    
    for(var i=0;i<32;i++)
    {
        pieces[i] = document.createElement('img');
        pieces[i].setAttribute('class','piece');
        pieces[i].setAttribute('draggable',true);
        pieces[i].setAttribute('ondragstart','drag(this.id)');
    }
    pieces[0].src="graphics/rook_white.png";
    pieces[0].id = 'WR1';
    pieces[1].src="graphics/knight_white.png";
    pieces[1].id = 'WN1';
    pieces[2].src="graphics/bishop_white.png";
    pieces[2].id = 'WB1';
    pieces[3].src="graphics/king_white.png";
    pieces[3].id = 'WK';
    pieces[4].src="graphics/queen_white.png";
    pieces[4].id = 'WQ';
    pieces[5].src="graphics/bishop_white.png";
    pieces[5].id = 'WB2';
    pieces[6].src="graphics/knight_white.png";
    pieces[6].id = 'WN2';
    pieces[7].src="graphics/rook_white.png";
    pieces[7].id = 'WR2';
    pieces[8].src="graphics/pawn_white.png";
    pieces[8].id = 'WP1';
    pieces[9].src="graphics/pawn_white.png";
    pieces[9].id = 'WP2';
    pieces[10].src="graphics/pawn_white.png";
    pieces[10].id = 'WP3';
    pieces[11].src="graphics/pawn_white.png";
    pieces[11].id = 'WP4';
    pieces[12].src="graphics/pawn_white.png";
    pieces[12].id = 'WP5';
    pieces[13].src="graphics/pawn_white.png";
    pieces[13].id = 'WP6';
    pieces[14].src="graphics/pawn_white.png";
    pieces[14].id = 'WP7';
    pieces[15].src="graphics/pawn_white.png";
    pieces[15].id = 'WP8';

    pieces[16].src="graphics/rook_black.png";
    pieces[16].id = 'BR1';
    pieces[17].src="graphics/knight_black.png";
    pieces[17].id = 'BN1';
    pieces[18].src="graphics/bishop_black.png";
    pieces[18].id = 'BB1';
    pieces[19].src="graphics/king_black.png";
    pieces[19].id = 'BK';
    pieces[20].src="graphics/queen_black.png";
    pieces[20].id = 'BQ';
    pieces[21].src="graphics/bishop_black.png";
    pieces[21].id = 'BB2';
    pieces[22].src="graphics/knight_black.png";
    pieces[22].id = 'BN2';
    pieces[23].src="graphics/rook_black.png";
    pieces[23].id = 'BR2';
    pieces[24].src="graphics/pawn_black.png";
    pieces[24].id = 'BP1';
    pieces[25].src="graphics/pawn_black.png";
    pieces[25].id = 'BP2';
    pieces[26].src="graphics/pawn_black.png";
    pieces[26].id = 'BP3';
    pieces[27].src="graphics/pawn_black.png";
    pieces[27].id = 'BP4';
    pieces[28].src="graphics/pawn_black.png";
    pieces[28].id = 'BP5';
    pieces[29].src="graphics/pawn_black.png";
    pieces[29].id = 'BP6';
    pieces[30].src="graphics/pawn_black.png";
    pieces[30].id = 'BP7';
    pieces[31].src="graphics/pawn_black.png";
    pieces[31].id = 'BP8';
    
    gameobj[0] = pieces;
    SetGame(gameobj);
}

// Updated 12/22/2019
function InitializeSquares() {
    
    var gameobj = GetGame();
    var squares = new Array();
    
    for(var i=0;i<8;i++)
    {
        squares[i] = new Array();
    }
    squares[0][0] = 'A8';
    squares[0][1] = 'B8';
    squares[0][2] = 'C8';
    squares[0][3] = 'D8';
    squares[0][4] = 'E8';
    squares[0][5] = 'F8';
    squares[0][6] = 'G8';
    squares[0][7] = 'H8';
    squares[1][0] = 'A7';
    squares[1][1] = 'B7';
    squares[1][2] = 'C7';
    squares[1][3] = 'D7';
    squares[1][4] = 'E7';
    squares[1][5] = 'F7';
    squares[1][6] = 'G7';
    squares[1][7] = 'H7';
    squares[2][0] = 'A6';
    squares[2][1] = 'B6';
    squares[2][2] = 'C6';
    squares[2][3] = 'D6';
    squares[2][4] = 'E6';
    squares[2][5] = 'F6';
    squares[2][6] = 'G6';
    squares[2][7] = 'H6';
    squares[3][0] = 'A5';
    squares[3][1] = 'B5';
    squares[3][2] = 'C5';
    squares[3][3] = 'D5';
    squares[3][4] = 'E5';
    squares[3][5] = 'F5';
    squares[3][6] = 'G5';
    squares[3][7] = 'H5';
    squares[4][0] = 'A4';
    squares[4][1] = 'B4';
    squares[4][2] = 'C4';
    squares[4][3] = 'D4';
    squares[4][4] = 'E4';
    squares[4][5] = 'F4';
    squares[4][6] = 'G4';
    squares[4][7] = 'H4';
    squares[5][0] = 'A3';
    squares[5][1] = 'B3';
    squares[5][2] = 'C3';
    squares[5][3] = 'D3';
    squares[5][4] = 'E3';
    squares[5][5] = 'F3';
    squares[5][6] = 'G3';
    squares[5][7] = 'H3';
    squares[6][0] = 'A2';
    squares[6][1] = 'B2';
    squares[6][2] = 'C2';
    squares[6][3] = 'D2';
    squares[6][4] = 'E2';
    squares[6][5] = 'F2';
    squares[6][6] = 'G2';
    squares[6][7] = 'H2';
    squares[7][0] = 'A1';
    squares[7][1] = 'B1';
    squares[7][2] = 'C1';
    squares[7][3] = 'D1';
    squares[7][4] = 'E1';
    squares[7][5] = 'F1';
    squares[7][6] = 'G1';
    squares[7][7] = 'H1';
    
    gameobj[1] = squares;
    SetGame(gameobj);
}

// Updated 12/22/2019
function InitializeGameVariables() {
    
    var gameobj = GetGame();
    var gamevars = new Array();
    
    gamevars[0] = '---';            // player move
    gamevars[1] = '---';            // computer move
    gamevars[2] = '---';            // valid computer moves
    gamevars[3] = 0;                // number of computer moves
    gamevars[4] = 0;                // computer score
    gamevars[5] = 0;                // player score
    if(!gamevars[6]) {
        gamevars[6] = 'White';      // default player color    
    }
    gamevars[7] = 0;                // computer skill level
    gamevars[8] = '';               // selected piece
    gamevars[9] = '';               // from square
    gamevars[10] = '';              // to square
    gamevars[11] = [];              // moves  
    gamevars[12] = [];              // processes
    gamevars[13] = [];              // captured pieces
    
    gameobj[2] = gamevars;
    SetGame(gameobj);
}

// Updated 12/22/2019
function InitializeGameBoard() {
    
    var gameobj = GetGame();
    var player = gameobj[2][6];
    var board = new Array();

    for(var i=0;i<8;i++)
    {
        board[i] = new Array();
    }
    for(var i=2;i<6;i++)
    {
        for(var j=0;j<8;j++)
        {
            board[i][j] = '';
        }
    }
    if(player === 'Black')
    {
        board[0][0] = 'WR1';
        board[0][1] = 'WN1';
        board[0][2] = 'WB1';
        board[0][3] = 'WK';
        board[0][4] = 'WQ';
        board[0][5] = 'WB2';
        board[0][6] = 'WN2';
        board[0][7] = 'WR2';
        board[1][0] = 'WP1';
        board[1][1] = 'WP2';
        board[1][2] = 'WP3';
        board[1][3] = 'WP4';
        board[1][4] = 'WP5';
        board[1][5] = 'WP6';
        board[1][6] = 'WP7';
        board[1][7] = 'WP8';
        board[6][0] = 'BP1';
        board[6][1] = 'BP2';
        board[6][2] = 'BP3';
        board[6][3] = 'BP4';
        board[6][4] = 'BP5';
        board[6][5] = 'BP6';
        board[6][6] = 'BP7';
        board[6][7] = 'BP8';
        board[7][0] = 'BR1';
        board[7][1] = 'BN1';
        board[7][2] = 'BB1';
        board[7][3] = 'BK';
        board[7][4] = 'BQ';
        board[7][5] = 'BB2';
        board[7][6] = 'BN2';
        board[7][7] = 'BR2';        
    }
    if(player === 'White')
    {
        board[0][0] = 'BR1';
        board[0][1] = 'BN1';
        board[0][2] = 'BB1';
        board[0][3] = 'BQ';
        board[0][4] = 'BK';
        board[0][5] = 'BB2';
        board[0][6] = 'BN2';
        board[0][7] = 'BR2';
        board[1][0] = 'BP1';
        board[1][1] = 'BP2';
        board[1][2] = 'BP3';
        board[1][3] = 'BP4';
        board[1][4] = 'BP5';
        board[1][5] = 'BP6';
        board[1][6] = 'BP7';
        board[1][7] = 'BP8';
        board[6][0] = 'WP1';
        board[6][1] = 'WP2';
        board[6][2] = 'WP3';
        board[6][3] = 'WP4';
        board[6][4] = 'WP5';
        board[6][5] = 'WP6';
        board[6][6] = 'WP7';
        board[6][7] = 'WP8';
        board[7][0] = 'WR1';
        board[7][1] = 'WN1';
        board[7][2] = 'WB1';
        board[7][3] = 'WQ';
        board[7][4] = 'WK';
        board[7][5] = 'WB2';
        board[7][6] = 'WN2';
        board[7][7] = 'WR2';         
    }
    
    gameobj[3] = board;
    LoadGameBoard(gameobj);
    
    SetGame(gameobj);
}

// Updated 12/22/2019
function InitializeHTMLElements() {
    
    // player = dataelements[0]
    // compskilllvl = dataelements[1]
    // playermove = dataelements[2]
    // computermove = dataelements[3]
    // playerscore/computerscore = dataelements[4]
    // moves = dataelements[5]
    // processes = dataelements[6]
    // captured pieces = dataelements[7]
    
    var gameobj = GetGame();
    var dataelements = new Array();
    
    dataelements[0] = document.body.childNodes[1].childNodes[3].childNodes[1].childNodes[7].childNodes[1].childNodes[1].childNodes[1].childNodes[3];
    
    dataelements[1] = document.body.childNodes[1].childNodes[3].childNodes[1].childNodes[7].childNodes[1].childNodes[1].childNodes[3].childNodes[3];
 
    dataelements[2] = 
    document.body.childNodes[1].childNodes[3].childNodes[1].childNodes[7].childNodes[1].childNodes[1].childNodes[5].childNodes[3];
    
    dataelements[3] = document.body.childNodes[1].childNodes[3].childNodes[1].childNodes[7].childNodes[1].childNodes[1].childNodes[7].childNodes[3];

    dataelements[4] = document.body.childNodes[1].childNodes[3].childNodes[1].childNodes[7].childNodes[1].childNodes[1].childNodes[9].childNodes[3];
    
    dataelements[5] = document.body.childNodes[1].childNodes[3].childNodes[1].childNodes[3].childNodes[1].childNodes[1];
    
    dataelements[6] = document.body.childNodes[1].childNodes[3].childNodes[1].childNodes[11].childNodes[1].childNodes[1];
    
    dataelements[7] = document.body.childNodes[1].childNodes[3].childNodes[3].childNodes[3].childNodes[1].childNodes[1];
    
    gameobj[4] = dataelements;
    
    SetGame(gameobj);
}

// Event handler
function drag(id) {
    
    var gameobj = GetGame();

    gameobj[2][8] = id;
    gameobj[2][9] = document.getElementById(id).parentNode.id;  // fromsquare
    
    SetGame(gameobj);
}

// Event handler
function allowDrop(ev) {
    ev.preventDefault();
}

// Event handler
function drop(id) {
    
    var gameobj = GetGame();
    
    if(id)
    {
        gameobj[2][10] = id;
        gameobj = ProcessPlayerMove(gameobj);
    }
    
    SetGame(gameobj);
    
}

// Updated 12/22/2019
function UpdateGameDataWindow() {

    var gameobj = GetGame();
    
    var player = gameobj[2][6];
    var cskill = gameobj[2][7];
    var compskilllvl;
    var playermove = gameobj[2][0];
    var computermove = gameobj[2][1];
    var playerscore = gameobj[2][5];
    var computerscore = gameobj[2][4];
    
    if(cskill === 0) {
        compskilllvl = 'Random';
    }
    if(cskill === 1) {
        compskilllvl = 'Beginner';
    }
    if(cskill === 2) {
        compskilllvl = 'Novice';
    }
    if(cskill === 3) {
        compskilllvl = 'Intermediate';
    }
    
    gameobj[4][0].innerHTML = player;
    gameobj[4][1].innerHTML = compskilllvl;
    gameobj[4][2].innerHTML = playermove;
    gameobj[4][3].innerHTML = computermove;
    gameobj[4][4].innerHTML = playerscore + '/' + computerscore;

}

// Update 12/23/2019
function AddMove(move) {

    var gameobj = GetGame();
    
    var d = new Date();
    var moverow = document.createElement('tr');
    var movecell = document.createElement('td');
    
    // moves: gameobj[2][11]
    
    move = d.toLocaleDateString() + ' ' + d.toLocaleTimeString() + ': ' + move;
    gameobj[2][11][gameobj[2][11].length] = move;  // append move onto gameobj
    movecell.innerHTML = move;
    moverow.appendChild(movecell);
    gameobj[4][5].insertBefore(moverow, gameobj[4][5].childNodes[0]);
    
    SetGame(gameobj);
    
}

// Update 12/23/2019
function AddCapturedPiece(piece) {
    
    var gameobj = GetGame();
    
    var d = new Date();
    var piecerow = document.createElement('tr');
    var piececell = document.createElement('td');
    
    // pieces: gameobj[2][12]
    
    gameobj[2][12][gameobj[2][12].length] = piece;  // append captured piece onto gameobj
    piececell.innerHTML = piece;
    piecerow.appendChild(piececell);
    gameobj[4][6].insertBefore(piecerow, gameobj[4][6].childNodes[0]);
    
    SetGame(gameobj);
    
}

// Update 12/23/2019
function AddProcessItem(process) {
    
    var gameobj = GetGame();
    
    var d = new Date();
    var processrow = document.createElement('tr');
    var processcell = document.createElement('td');
    
    // processes: gameobj[2][13]
    
    process = d.toLocaleDateString() + ' ' + d.toLocaleTimeString() + ': ' + process;
    gameobj[2][13][gameobj[2][13].length] = process;  // append process onto gameobj
    processcell.innerHTML = process;
    processrow.appendChild(processcell);
    gameobj[4][7].insertBefore(processrow, gameobj[4][7].childNodes[0]);
    
    SetGame(gameobj);
    
}

// ToDo: Flip pieces for active game
function SwitchSides() {
    if(player === 'white') {
        player = 'black';
        AddProcessItem('player now black');
    }
    else {
        player = 'white';
        AddProcessItem('player now white');
    }
    UpdateAnalysisWindow();
}

function ToggleCompSkillLevel() {

    var gameobj = GetGame();
    var compskilllvl = gameobj[2][7];
    
    if(compskilllvl === 0){
        compskilllvl = 1;
        AddProcessItem('computer skill level: 1');        
    }
    else if(compskilllvl === 1){
        compskilllvl = 2;
        AddProcessItem('computer skill level: 2');        
    }
    else if(compskilllvl === 2){
        compskilllvl = 3;
        AddProcessItem('computer skill level: 3');
    }
    else {
        compskilllvl = 0;
        AddProcessItem('computer skill level: 0');        
    }
    
    gameobj[2][7] = compskilllvl;
    UpdateGameDataWindow();
    SetGame(gameobj);
}

function RecordComputerMove(gameobj) {
    
    var m,n,p,q;
    var computermove = gameobj[2][1];  // computer move
    var squares = gameobj[1];
    var board = gameobj[3];
    var selectedpiece;
    
    // If piece captured, record capture
    //alert(computermove.substring(computermove.length-1,computermove.length));
    if(computermove.substring(computermove.length-1,computermove.length) === 'X'){
        CapturePiece(computermove);
    }
    
    AddMove(computermove);
  
    for(m=0;m<8;m++){
        for(n=0;n<8;n++){
            if(squares[m][n]===computermove.substring(0,2)){
                selectedpiece = board[m][n];
                board[m][n] = '';
            }
        }       
    }
    for(p=0;p<8;p++){
        for(q=0;q<8;q++){
            if(squares[p][q]===computermove.substring(3,5)){
                board[p][q] = selectedpiece;
            }
        }
    }
    
    LoadGameBoard(gameobj);
    UpdateGameDataWindow();
    
}

function CapturePiece(move){
    
    var didcapture, wascapture;
    
    for(var i=0;i<8;i++){
        for(var j=0;j<8;j++){
            if(gameobj[1][i][j] === move.substring(3,5)){                
                capturedpieces[capturedpieces.length] = board[i][j];
                wascapture = board[i][j];
            }
            if(gameobj[1][i][j] === move.substring(0,2)){                
                didcapture = board[i][j];
            }
        }
    }
    
    // tally scores
    if(player === 'white'){
        if(wascapture.substring(0,2) === 'WP'){
            computerscore = computerscore + 1;
        }
        else if(wascapture.substring(0,2) === 'WN' || wascapture.substring(0,2) === 'WB'){
            computerscore = computerscore + 3;       
        }
        else if(wascapture.substring(0,2) === 'WR'){
            computerscore = computerscore + 5;
        }
        else if(wascapture.substring(0,2) === 'WQ'){
            computerscore = computerscore + 9;
        }
        else if(wascapture.substring(0,2) === 'BP'){
            playerscore = playerscore + 1;
        }
        else if(wascapture.substring(0,2) === 'BN' || wascapture.substring(0,2) === 'BB'){
            playerscore = playerscore + 3;       
        }
        else if(wascapture.substring(0,2) === 'BR'){
            playerscore = playerscore + 5;
        }
        else if(wascapture.substring(0,2) === 'BQ'){
            playerscore = playerscore + 9;
        }        
    }
    else{
        if(wascapture.substring(0,2) === 'BP'){
            computerscore = computerscore + 1;
        }
        else if(wascapture.substring(0,2) === 'BN' || wascapture.substring(0,2) === 'BB'){
            computerscore = computerscore + 3;       
        }
        else if(wascapture.substring(0,2) === 'BR'){
            computerscore = computerscore + 5;
        }
        else if(wascapture.substring(0,2) === 'BQ'){
            computerscore = computerscore + 9;
        }
        else if(wascapture.substring(0,2) === 'WP'){
            playerscore = playerscore + 1;
        }
        else if(wascapture.substring(0,2) === 'WN' || wascapture === 'WB'){
            playerscore = playerscore + 3;       
        }
        else if(wascapture.substring(0,2) === 'WR'){
            playerscore = playerscore + 5;
        }
        else if(wascapture.substring(0,2) === 'WQ'){
            playerscore = playerscore + 9;
        }
    }
    
    AddCapturedPiece(wascapture);
    AddProcessItem(didcapture + ' captures ' + wascapture);
}