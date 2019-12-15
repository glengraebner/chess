/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// settings
var datafont = 'blue';

// game variables
var player = 'white';
var compskilllvl = 0;  // 0 - random, 1 - beginner, 2 - intermediate, 3 - advanced
var gamepieces = new Array();
var selectedpiece;
var fromquare;
var tosquare;
var playermove;
//var computermove;
var validcompmoves;
var playerscore = 0;
var computerscore = 0;
var moves = new Array();
var board = new Array(); // pieces on board
var squares = new Array(); // names of squares
var processes = new Array();
var capturedpieces = new Array();
var fromsquare, tosquare;

// event handlers
function drag(id) {
    selectedpiece = id;
    fromsquare = document.getElementById(id).parentNode.id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(id){
    if(id)
    {
        tosquare = id;
        ProcessMove();
    }
}

function ResetGameData(){
    playermove = '---';
    computermove = '---';
    validcompmoves = '---';
    numcompmoves = 0;  
    computerscore = 0;
    playerscore = 0;
}

function ClearMoves(){
    moves.length = 0;
}

function ClearProcesses(){
    processes.length = 0;
}

function ClearCapturedPieces(){
    capturedpieces.length = 0;
}

function ClearWindows(){
    document.getElementById('moves_block').innerHTML = '';
    document.getElementById('processing_block').innerHTML = '';
    document.getElementById('pieces_block').innerHTML = '';
}

function AddCapturedPiece(piece){
    document.getElementById('pieces_block').innerHTML = document.getElementById('pieces_block').innerHTML + piece + '</br>';
}

function UpdateAnalysisWindow(){
    
    if(player === 'white'){
        document.getElementById('playercolorcell').innerHTML = 'White';    
    }
    else{
        document.getElementById('playercolorcell').innerHTML = 'Black';    
    }
    if(compskilllvl === 0){
        document.getElementById('randmodecell').innerHTML = 'Beginner';        
    }
    else if (compskilllvl === 1){
        document.getElementById('randmodecell').innerHTML = 'Novice';        
    }
    else if (compskilllvl === 2){
        document.getElementById('randmodecell').innerHTML = 'Intermediate';        
    }
    else if (compskilllvl === 3){
        document.getElementById('randmodecell').innerHTML = 'Advanced';        
    }
    document.getElementById('playermovecell').innerHTML = playermove;
    document.getElementById('compmovecell').innerHTML = computermove;
    document.getElementById('gamescorecell').innerHTML = playerscore + '/' + computerscore;
    
}

// ToDo: Flip pieces for active game
function SwitchSides(){
    if(player === 'white') {
        player = 'black';
        LoadProcess('player now black');
    }
    else {
        player = 'white';
        LoadProcess('player now white');
    }
    UpdateAnalysisWindow();
}

function ToggleCompSkillLevel(){

    if(compskilllvl === 0){
        compskilllvl = 1;
        LoadProcess('computer skill level: 1');        
    }
    else if(compskilllvl === 1){
        compskilllvl = 2;
        LoadProcess('computer skill level: 2');        
    }
    else if(compskilllvl === 2){
        compskilllvl = 3;
        LoadProcess('computer skill level: 3');
    }
    else {
        compskilllvl = 0;
        LoadProcess('computer skill level: 0');        
    }
    UpdateAnalysisWindow();
}

function LoadProcess(process){
    var d = new Date();
    var header = "<table>"
    var footer = "</table>"
    var txt = ""
    
    process = d.toLocaleDateString() + ' ' + d.toLocaleTimeString() + ': ' + process;
    processes[processes.length] = process;

    for(i=processes.length-1;i>-1;i--)
    {
        txt = txt + "<tr><td>" + processes[i] + "</td></tr>"       
    }
    document.getElementById("processing_block").innerHTML = header + txt + footer;
}

function RecordComputerMove(){
    var m,n,p,q;
    var move = computermove;
    
    // If piece captured, record capture
    //alert(computermove.substring(computermove.length-1,computermove.length));
    if(computermove.substring(computermove.length-1,computermove.length) === 'X'){
        CapturePiece(computermove);
    }
    
    moves[moves.length] = move;

    // Output move
    document.getElementById("moves_block").innerHTML = '';
    for(var i=0;i<moves.length;i++){
        if(document.getElementById("moves_block").innerHTML === ''){
            document.getElementById("moves_block").innerHTML = "<span>" + moves[i] + "</span>";            
        }
        else{
            document.getElementById("moves_block").innerHTML = document.getElementById("moves_block").innerHTML + "<br/><span>" + moves[i] + "</span>";            
        }
    }    
    for(m=1;m<9;m++){
        for(n=1;n<9;n++){
            if(squares[m][n]===move.substring(0,2)){
                selectedpiece = board[m][n];
                board[m][n] = '';
            }
        }       
    }
    for(p=1;p<9;p++){
        for(q=1;q<9;q++){
            if(squares[p][q]===move.substring(3,5)){
                board[p][q] = selectedpiece;
            }
        }
    }
    
    UpdateBoard();
    UpdateAnalysisWindow();
}

function RecordPlayerMove(){

    // If piece captured, record capture
    //alert(computermove.substring(computermove.length-1,computermove.length));
    if(playermove.substring(playermove.length-1,playermove.length) === 'X'){
        CapturePiece(playermove);
    }
    
    moves[moves.length] = playermove;  //playermove is a global variable

    // Output move
    document.getElementById("moves_block").innerHTML = '';
    for(var i=0;i<moves.length;i++){
        if(document.getElementById("moves_block").innerHTML === ''){
            document.getElementById("moves_block").innerHTML = "<span>" + moves[i] + "</span>";            
        }
        else{
            document.getElementById("moves_block").innerHTML = document.getElementById("moves_block").innerHTML + "<br/><span>" + moves[i] + "</span>";            
        }
    }
    
    for(var i=1;i<9;i++)
    {
        for(var j=1;j<9;j++)
        {
            if(board[i][j]===selectedpiece)
            {
                board[i][j]='';
            }
        }
    }
    for(var i=1;i<9;i++){
        for(var j=0;j<9;j++){
            if(squares[i][j]===tosquare){
                board[i][j] = selectedpiece;
            }            
        }
    }
    
    UpdateBoard();
}

function UpdateBoard(){
    var txt1 = '';
    var txt2 = '';
    var lightsquares;
    var darksquares;
    
    lightsquares = document.getElementsByClassName('light_square');
    darksquares = document.getElementsByClassName('dark_square');
    
    for(var i=0;i<lightsquares.length;i++){
        if (lightsquares[i].childNodes.length > 0)
        {
            lightsquares[i].removeChild(lightsquares[i].childNodes[0]);                
        }
    }
    for(var i=0;i<darksquares.length;i++){
        if (darksquares[i].childNodes.length > 0)
        {
            darksquares[i].removeChild(darksquares[i].childNodes[0]);                
        }
    }
    
    for(var i=1;i<9;i++){
        for(var j=1;j<9;j++){
            txt1 = board[i][j];
            for(var k=1;k<33;k++){
                txt2 = gamepieces[k].id;
                if(txt1 === txt2){
                    document.getElementById(squares[i][j]).appendChild(gamepieces[k]);
                    k = 33;
                }
            }            
        }
    }
}

function StartUp(){
    LoadPieces();
    InitializeSquares();
    ResetGameData();
    LoadNewGame();
}

function ProcessMove(){    
    var move = fromsquare + '-' + tosquare;
    
    // If opponent occupies tosquare then mark move with an 'X'
    for(var i=1;i<9;i++){
        for(var j=1;j<9;j++){
            if(squares[i][j] === tosquare){
                if(player === 'white'){
                    if(board[i][j].substring(0,1) === 'B'){
                        move = move + 'X';
                    }
                }
                else{
                    if(board[i][j].substring(0,1) === 'W'){
                        move = move + 'X';
                    }                    
                }
            }
        }
    }
    playermove = move;
    if(IsPlayerMoveValid(playermove,moves,squares,board,player)){  // pmove,pmoves,tempsquares,tempboard,player1
        RecordPlayerMove();   // adds move to moves[] list and outputs to window         
        computermove = SelectComputerMove(player,board,compskilllvl);
        RecordComputerMove();
    }
}

function LoadPieces(){
    for(var i=1;i<33;i++){
        gamepieces[i] = null;
    }
    for(var i=1;i<33;i++)
    {
        gamepieces[i] = document.createElement('img');
        gamepieces[i].setAttribute('class','piece');
        gamepieces[i].setAttribute('draggable',true);
        gamepieces[i].setAttribute('ondragstart','drag(this.id)');
    }
    gamepieces[1].src="graphics/rook_white.png";
    gamepieces[1].id = 'WR1';
    gamepieces[2].src="graphics/knight_white.png";
    gamepieces[2].id = 'WN1';
    gamepieces[3].src="graphics/bishop_white.png";
    gamepieces[3].id = 'WB1';
    gamepieces[4].src="graphics/king_white.png";
    gamepieces[4].id = 'WK';
    gamepieces[5].src="graphics/queen_white.png";
    gamepieces[5].id = 'WQ';
    gamepieces[6].src="graphics/bishop_white.png";
    gamepieces[6].id = 'WB2';
    gamepieces[7].src="graphics/knight_white.png";
    gamepieces[7].id = 'WN2';
    gamepieces[8].src="graphics/rook_white.png";
    gamepieces[8].id = 'WR2';
    gamepieces[9].src="graphics/pawn_white.png";
    gamepieces[9].id = 'WP1';
    gamepieces[10].src="graphics/pawn_white.png";
    gamepieces[10].id = 'WP2';
    gamepieces[11].src="graphics/pawn_white.png";
    gamepieces[11].id = 'WP3';
    gamepieces[12].src="graphics/pawn_white.png";
    gamepieces[12].id = 'WP4';
    gamepieces[13].src="graphics/pawn_white.png";
    gamepieces[13].id = 'WP5';
    gamepieces[14].src="graphics/pawn_white.png";
    gamepieces[14].id = 'WP6';
    gamepieces[15].src="graphics/pawn_white.png";
    gamepieces[15].id = 'WP7';
    gamepieces[16].src="graphics/pawn_white.png";
    gamepieces[16].id = 'WP8';

    gamepieces[17].src="graphics/rook_black.png";
    gamepieces[17].id = 'BR1';
    gamepieces[18].src="graphics/knight_black.png";
    gamepieces[18].id = 'BN1';
    gamepieces[19].src="graphics/bishop_black.png";
    gamepieces[19].id = 'BB1';
    gamepieces[20].src="graphics/king_black.png";
    gamepieces[20].id = 'BK';
    gamepieces[21].src="graphics/queen_black.png";
    gamepieces[21].id = 'BQ';
    gamepieces[22].src="graphics/bishop_black.png";
    gamepieces[22].id = 'BB2';
    gamepieces[23].src="graphics/knight_black.png";
    gamepieces[23].id = 'BN2';
    gamepieces[24].src="graphics/rook_black.png";
    gamepieces[24].id = 'BR2';
    gamepieces[25].src="graphics/pawn_black.png";
    gamepieces[25].id = 'BP1';
    gamepieces[26].src="graphics/pawn_black.png";
    gamepieces[26].id = 'BP2';
    gamepieces[27].src="graphics/pawn_black.png";
    gamepieces[27].id = 'BP3';
    gamepieces[28].src="graphics/pawn_black.png";
    gamepieces[28].id = 'BP4';
    gamepieces[29].src="graphics/pawn_black.png";
    gamepieces[29].id = 'BP5';
    gamepieces[30].src="graphics/pawn_black.png";
    gamepieces[30].id = 'BP6';
    gamepieces[31].src="graphics/pawn_black.png";
    gamepieces[31].id = 'BP7';
    gamepieces[32].src="graphics/pawn_black.png";
    gamepieces[32].id = 'BP8';
}

function InitializeSquares(){
    for(var i=1;i<9;i++)
    {
        squares[i] = new Array();
    }
    squares[1][1] = 'A8';
    squares[1][2] = 'B8';
    squares[1][3] = 'C8';
    squares[1][4] = 'D8';
    squares[1][5] = 'E8';
    squares[1][6] = 'F8';
    squares[1][7] = 'G8';
    squares[1][8] = 'H8';
    squares[2][1] = 'A7';
    squares[2][2] = 'B7';
    squares[2][3] = 'C7';
    squares[2][4] = 'D7';
    squares[2][5] = 'E7';
    squares[2][6] = 'F7';
    squares[2][7] = 'G7';
    squares[2][8] = 'H7';
    squares[3][1] = 'A6';
    squares[3][2] = 'B6';
    squares[3][3] = 'C6';
    squares[3][4] = 'D6';
    squares[3][5] = 'E6';
    squares[3][6] = 'F6';
    squares[3][7] = 'G6';
    squares[3][8] = 'H6';
    squares[4][1] = 'A5';
    squares[4][2] = 'B5';
    squares[4][3] = 'C5';
    squares[4][4] = 'D5';
    squares[4][5] = 'E5';
    squares[4][6] = 'F5';
    squares[4][7] = 'G5';
    squares[4][8] = 'H5';
    squares[5][1] = 'A4';
    squares[5][2] = 'B4';
    squares[5][3] = 'C4';
    squares[5][4] = 'D4';
    squares[5][5] = 'E4';
    squares[5][6] = 'F4';
    squares[5][7] = 'G4';
    squares[5][8] = 'H4';
    squares[6][1] = 'A3';
    squares[6][2] = 'B3';
    squares[6][3] = 'C3';
    squares[6][4] = 'D3';
    squares[6][5] = 'E3';
    squares[6][6] = 'F3';
    squares[6][7] = 'G3';
    squares[6][8] = 'H3';
    squares[7][1] = 'A2';
    squares[7][2] = 'B2';
    squares[7][3] = 'C2';
    squares[7][4] = 'D2';
    squares[7][5] = 'E2';
    squares[7][6] = 'F2';
    squares[7][7] = 'G2';
    squares[7][8] = 'H2';
    squares[8][1] = 'A1';
    squares[8][2] = 'B1';
    squares[8][3] = 'C1';
    squares[8][4] = 'D1';
    squares[8][5] = 'E1';
    squares[8][6] = 'F1';
    squares[8][7] = 'G1';
    squares[8][8] = 'H1';
}

function LoadNewGame(){
    var color = player;

    for(var i=1;i<9;i++)
    {
        board[i] = new Array();
    }
    for(var i=3;i<7;i++)
    {
        for(var j=1;j<9;j++)
        {
            board[i][j] = '';
        }
    }
    if(color === 'black')
    {
        board[1][1] = 'WR1';
        board[1][2] = 'WN1';
        board[1][3] = 'WB1';
        board[1][4] = 'WK';
        board[1][5] = 'WQ';
        board[1][6] = 'WB2';
        board[1][7] = 'WN2';
        board[1][8] = 'WR2';
        board[2][1] = 'WP1';
        board[2][2] = 'WP2';
        board[2][3] = 'WP3';
        board[2][4] = 'WP4';
        board[2][5] = 'WP5';
        board[2][6] = 'WP6';
        board[2][7] = 'WP7';
        board[2][8] = 'WP8';
        board[7][1] = 'BP1';
        board[7][2] = 'BP2';
        board[7][3] = 'BP3';
        board[7][4] = 'BP4';
        board[7][5] = 'BP5';
        board[7][6] = 'BP6';
        board[7][7] = 'BP7';
        board[7][8] = 'BP8';
        board[8][1] = 'BR1';
        board[8][2] = 'BN1';
        board[8][3] = 'BB1';
        board[8][4] = 'BK';
        board[8][5] = 'BQ';
        board[8][6] = 'BB2';
        board[8][7] = 'BN2';
        board[8][8] = 'BR2';        
    }
    if(color === 'white')
    {
        board[1][1] = 'BR1';
        board[1][2] = 'BN1';
        board[1][3] = 'BB1';
        board[1][4] = 'BQ';
        board[1][5] = 'BK';
        board[1][6] = 'BB2';
        board[1][7] = 'BN2';
        board[1][8] = 'BR2';
        board[2][1] = 'BP1';
        board[2][2] = 'BP2';
        board[2][3] = 'BP3';
        board[2][4] = 'BP4';
        board[2][5] = 'BP5';
        board[2][6] = 'BP6';
        board[2][7] = 'BP7';
        board[2][8] = 'BP8';
        board[7][1] = 'WP1';
        board[7][2] = 'WP2';
        board[7][3] = 'WP3';
        board[7][4] = 'WP4';
        board[7][5] = 'WP5';
        board[7][6] = 'WP6';
        board[7][7] = 'WP7';
        board[7][8] = 'WP8';
        board[8][1] = 'WR1';
        board[8][2] = 'WN1';
        board[8][3] = 'WB1';
        board[8][4] = 'WQ';
        board[8][5] = 'WK';
        board[8][6] = 'WB2';
        board[8][7] = 'WN2';
        board[8][8] = 'WR2';         
    }
    ClearWindows();
    ClearMoves();
    ClearProcesses();
    ClearCapturedPieces();
    ResetGameData();
    UpdateAnalysisWindow();
    if(color === 'black'){  // computer goes first if player is black
        RecordComputerMove(SelectComputerMove());
    }
    UpdateBoard();
}

function CapturePiece(move){
    
    var didcapture, wascapture;
    
    for(var i=1;i<9;i++){
        for(var j=1;j<9;j++){
            if(squares[i][j] === move.substring(3,5)){                
                capturedpieces[capturedpieces.length] = board[i][j];
                wascapture = board[i][j];
            }
            if(squares[i][j] === move.substring(0,2)){                
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
    LoadProcess(didcapture + ' captures ' + wascapture);
}