/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// settings
var datafont = 'blue';

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
var processes = new Array();
var capturedpieces = new Array();
//var fromsquare, tosquare;

function StartUp() {
    
    InitializePieces();                // 32 chess pieces with listeners
    InitializeSquares();               // 64 squares on chess board  
    InitializeGameVariables();         // set of game variables
    InitializeGameBoard();             // gameboard
    InitializeHTMLElements();          // connect to HTML elements
    
    LoadNewGame();
}

function LoadNewGame() {

    var gameobj = GetGame();
    
    UpdateHTMLElements(gameobj)                     // put data in HTML elements   
    UpdateBoard(gameobj);                           // load game board  
    
    moves.length = 0;
    capturedpieces.length = 0;
    processes.length = 0;
    
    // ToDo:  Move to HTML intialization / add to gameobj
    document.getElementById('moves_block').innerHTML = '';
    document.getElementById('processing_block').innerHTML = '';
    document.getElementById('pieces_block').innerHTML = '';
    
    ResetGameData();
    UpdateAnalysisWindow();
    // ToDo:  Fix this to change pieces
    if(color === 'black'){  // computer goes first if player is black
        RecordComputerMove(SelectComputerMove());
    }
    UpdateBoard();
    
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

function AddCapturedPiece(piece) {
    document.getElementById('pieces_block').innerHTML = document.getElementById('pieces_block').innerHTML + piece + '</br>';
}

// ToDo: Flip pieces for active game
function SwitchSides() {
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

function ToggleCompSkillLevel() {

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

function LoadProcess(process) {
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

function RecordComputerMove() {
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
    LoadProcess(didcapture + ' captures ' + wascapture);
}