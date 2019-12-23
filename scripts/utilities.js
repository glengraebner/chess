/**
 * Does a certain thing.
 *
 * @param {object} gameobj -- Game data object.
 * @return {type} returnthing -- Thing to return.
 */

// Updated 12/22/2019
function LoadGameBoard(gameobj) {
    
    var txt1 = '';
    var txt2 = '';
    var lightsquares;
    var darksquares;
    var board = gameobj[3];
    
    lightsquares = document.getElementsByClassName('light_square');
    darksquares = document.getElementsByClassName('dark_square');
    
    // clear board
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
    
    // reload board
    for(var i=0;i<8;i++){
        for(var j=0;j<8;j++){
            txt1 = board[i][j];
            for(var k=0;k<32;k++){
                txt2 = gameobj[0][k].id;
                if(txt1 === txt2){
                    document.getElementById(gameobj[1][i][j]).appendChild(gameobj[0][k]);
                    k = 33;
                }
            }            
        }
    }
}

// Updated 12/22/2019
function ProcessPlayerMove(gameobj){
    
    gameobj[2][0] = DefinePlayerMove(gameobj); // playermove
    if(IsPlayerMoveValid(gameobj)){  // pmove,pmoves,tempsquares,tempboard,player1
        gameobj = RecordPlayerMove(gameobj);   // adds move to moves[] list and outputs to window
        LoadGameBoard(gameobj);
        gameobj[2][1] = SelectComputerMove(gameobj); // computermove
        gameobj = RecordComputerMove(gameobj);
    }
    
    return gameobj;
    
}

// Updated 12/21/2019
function DefinePlayerMove(gameobj) {
    
    var move = gameobj[2][9] + '-' + gameobj[2][10]; // fromsquare, tosqaure
    
    // If opponent occupies tosquare then mark move with an 'X'
    for(var i=0;i<8;i++){
        for(var j=0;j<8;j++){
            if(gameobj[1][i][j] === gameobj[2][10]){
                if(gameobj[2][6] === 'white'){
                    if(gameobj[1][i][j].substring(0,1) === 'B'){
                        move = move + 'X';
                    }
                }
                else{
                    if(gameobj[1][i][j].substring(0,1) === 'W'){
                        move = move + 'X';
                    }                    
                }
            }
        }
    }
    
    return move;
    
}

function IsPlayerMoveValid(gameobj) {
    
    var isvalid = true;
    var bi, bj;
    var txt = '';

    AddProcessItem('Begin IsPlayerMoveValid()');
    AddProcessItem('Player Move: ' + gameobj[2][0]);
    
    // get player move squares[][] components
    for(var i=0;i<8;i++){
        for(var j=0;j<8;j++){
            if(gameobj[1][i][j]===gameobj[2][0].substring(0,2)){
                bi = i;
                bj = j;
            }
        }
    }

    // check that move was completed   
    if(gameobj[2][0].substring(0,2) === gameobj[2][0].substring(3,5)){
        isvalid = false;
        AddProcessItem('Incomplete move');
        AddProcessItem('End IsPlayerMoveValid()');
        return isvalid;
    }
    
    // check that white goes first
    if(gameobj[4].length === 0){
        // look up piece on board square [i][j]
        txt = gameobj[3][bi][bj];
        if(txt!=''){
            // check if white piece
            if(txt.substring(0,1)==='W'){
                AddProcessItem('White player moved first -> Allowed');
            }
            else{
                isvalid = false;
                AddProcessItem('Black player moved first -> Not Allowed');
                AddProcessItem("End IsPlayerMoveValid()");
                return isvalid;
            }
        }       
    }
    
    // check that own piece is moved
    if(gameobj[2][6] === 'White') {
        txt = gameobj[3][bi][bj];
        if(txt.substring(0,1)==='W') {
            AddProcessItem('White player moved white piece -> Allowed');
        }
        else {
            isvalid = false;
            AddProcessItem('White player moved black piece -> Not allowed');
            AddProcessItem("End IsPlayerMoveValid()");
            return isvalid;
        }
    }
    else {
        if(gameobj[3][bi][bj].substring(0,1)==='W') {
            isvalid = false;
            AddProcessItem('Black player moved white piece - Not Allowed');
            AddProcessItem("End IsPlayerMoveValid()");
            return isvalid;
        }
        else {
            AddProcessItem('Black player moved black piece - Allowed');
        }            
    }

    
    // check that player didn't capture own color
    // bishops can't move through occupied squares
    // rooks can't move through occupied squares
    // queens can't move through occupied squares
    // kings move only one square (unless castle)
    // king-rook castle can only occur if no pieces are in between them and neither has moved
    // rooks can move horizontally or vertically multiple squares
    // bishops can move diagonally multiple squares
    // pawns can only move one square vertically except on first move can move two squares vertically or can move diagonally one square while capturing
    // knights move in 1-2 or 2-1 L-shaped squares
    // king in checkmate -> game over
    // pawn to other end -> new piece
    
    AddProcessItem('End IsPlayerMoveValid()');
    
    return isvalid;
}

// Updated 12/21/2019
function RecordPlayerMove(gameobj) {

    // If piece captured, record capture
    //alert(computermove.substring(computermove.length-1,computermove.length));
    if(gameobj[2][0].substring(gameobj[2][0].length-1,gameobj[2][0].length) === 'X'){
        CapturePiece(gameobj);
    }
    
    gameobj[4][gameobj[4].length] = gameobj[2][0];  //playermove is a global variable

    // Output move
    document.getElementById("moves_block").innerHTML = '';
    for(var i=0;i<gameobj[4].length;i++){
        if(document.getElementById("moves_block").innerHTML === ''){
            document.getElementById("moves_block").innerHTML = "<span>" + gameobj[4][i] + "</span>";            
        }
        else{
            document.getElementById("moves_block").innerHTML = document.getElementById("moves_block").innerHTML + "<br/><span>" + gameobj[4][i] + "</span>";            
        }
    }
    
    for(var i=0;i<8;i++)
    {
        for(var j=0;j<8;j++)
        {
            if(gameobj[3][i][j]===gameobj[2][8])
            {
                gameobj[3][i][j]='';
            }
        }
    }
    for(var i=0;i<8;i++){
        for(var j=0;j<8;j++){
            if(gameobj[1][i][j]===gameobj[2][10]){
                gameobj[3][i][j] = gameobj[2][8];
            }            
        }
    }
    
    return gameobj;
    
}

// ToDo: Finish this next
function SelectComputerMove(gameobj) {
    
    var computermove;
    var step1result = [];
    var step2result = [];
    var tempboard = [];
    var whichplayersmove = "White";
    var cskill = gameobj[2][7];
    var playercolor = gameobj[2][6];
    var board = gameobj[3];
    
    gameobj[5] = [];
    AddProcessItem("Begin SelectComputerMove()");
    outtxt = "";
    
    if(playercolor === "White") {
        whichplayersmove = "Black";
    }
    
    gameobj[5][0] = whichplayersmove;
 
    // Select computer move based on compskilllvl(0-4)
    /*
    
    ToDo: Code novice, check for mate
    
    0) Random
        - no points assessment
    1) Beginner
        - evaluate points for computer next step only (1-step)
    2) Novice
        - evaluate points for computer/player next step (2-step)
        - include points for possible player next step not in response to computer (i.e. oh look)
    3) Advanced
    
    4) Master
    
    */
    
    if(cskill === 'Random') {
        computermove = PickRandomMove(gameobj);
    }
    if(cskill === 'Beginner') {
        // while(move != "")
        step1result = PickBestPointsMove1Step(gameobj);
        computermove = step1result[0];
    }
    if(cskill === 'Novice') {
        step2result = PickBestPointsMove2Step(gameobj);
        computermove = step2result[0];
    }
    
    AddProcessItem("End SelectComputerMove()");
    //UpdateAnalysisWindow();
    
    return computermove;
}

function GetValidMoves(whichplayersmove,tempboard) {
    var txt1, txt2;
    var posmoves = [];
    var validmoves = [];
    // Loads validmoves array with possible computer moves
     
    AddProcessItem("Begin GetValidMoves()");
    
    // Read board
    for(var i=1;i<9;i++){
        for(var j=1;j<9;j++){
            txt1 = tempboard[i][j];
            if((whichplayersmove === 'White' && txt1.substring(0,1)==='W') || (whichplayersmove === 'Black' && txt1.substring(0,1)==='B')){
                posmoves = AnalyzePieceMove(txt1,i,j);  // By piece type, determine valid move(s)
                for(var k=0;k<posmoves.length;k++){
                    validmoves[validmoves.length] = posmoves[k];  // Add move to validmoves[]
                }                   
            }
        }
    }
    txt1 = '';
    for(var i=0;i<validmoves.length;i++){
        if(i == validmoves.length-1)
        {
            txt1 = txt1 + validmoves[i];
        }
        else
        {
            txt1 = txt1 + validmoves[i] + ',';
        }       
    }
    //validcompmoves = txt1;
    AddProcessItem("Valid moves for " + whichplayersmove + " (" + validmoves.length + "): " + txt1);

    // Display valid moves in Analysis window
    
    AddProcessItem("End GetValidMoves()");
    
    return validmoves;
}

function UpdateKnightMoves(iinc,jinc,ipos,jpos,piece,posmoves) {
    if(ipos + iinc < 9 && ipos + iinc > 0 && jpos + jinc < 9 && jpos + jinc > 0){
        //alert(iinc + ' ' + jinc);
        if(board[ipos + iinc][jpos + jinc] === ''){
            posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[ipos + iinc][jpos + jinc];
        }
        else{
            if(board[ipos + iinc][jpos + jinc].substring(0,1) != piece.substring(0,1)){
                posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[ipos + iinc][jpos + jinc] + 'X';
            }
        }
    }
}

function AnalyzePieceMove(piece,ipos,jpos) {
    var posmoves = [];
    var iinc, jinc;
    
    // Row = i, Column = j
    
    // King
    if(piece.substring(1,2)==='K'){
            
        // 12:00
        if(ipos > 1){
            if(board[ipos - 1][jpos] === ''){ // blank square is legal move
                posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[ipos - 1][jpos];
            }
            else{  // non-blank square
                if(board[ipos - 1][jpos].substring(0,1) != piece.substring(0,1)){  // player piece
                    posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[ipos - 1][jpos] + 'X';
                }
            }            
        }

        // 1:30
        if(ipos > 1 && jpos < 8){
            if(board[ipos - 1][jpos + 1] === ''){ // blank square is legal move
                posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[ipos - 1][jpos + 1];
            }
            else{  // non-blank square
                if(board[ipos - 1][jpos + 1].substring(0,1) != piece.substring(0,1)){  // player piece
                    posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[ipos - 1][jpos + 1] + 'X';
                }
            }            
        }
        
        // 3:00
        if(jpos < 8){
            if(board[ipos][jpos + 1] === ''){ // blank square is legal move
                posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[ipos][jpos + 1];
            }
            else{  // non-blank square
                if(board[ipos][jpos + 1].substring(0,1) != piece.substring(0,1)){  // player piece
                    posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[ipos][jpos + 1] + 'X';
                }
            }            
        }
        
        // 4:30
        if(ipos < 8 && jpos < 8){
            if(board[ipos + 1][jpos + 1] === ''){ // blank square is legal move
                posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[ipos + 1][jpos + 1];
            }
            else{  // non-blank square
                if(board[ipos + 1][jpos + 1].substring(0,1) != piece.substring(0,1)){  // player piece
                    posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[ipos + 1][jpos + 1] + 'X';
                }
            }            
        }
        
        // 6:00
        if(ipos < 8){
            if(board[ipos + 1][jpos] === ''){ // blank square is legal move
                posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[ipos + 1][jpos];
            }
            else{  // non-blank square
                if(board[ipos + 1][jpos].substring(0,1) != piece.substring(0,1)){  // player piece
                    posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[ipos + 1][jpos] + 'X';
                }
            }            
        }
        
        // 7:30
        if(ipos < 8 && jpos > 1){
            if(board[ipos + 1][jpos - 1] === ''){ // blank square is legal move
                posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[ipos + 1][jpos - 1];
            }
            else{  // non-blank square
                if(board[ipos + 1][jpos - 1].substring(0,1) != piece.substring(0,1)){  // player piece
                    posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[ipos + 1][jpos - 1] + 'X';
                }
            }            
        }
        
        // 9:00
        if(jpos > 1){
            if(board[ipos][jpos - 1] === ''){ // blank square is legal move
                posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[ipos][jpos - 1];
            }
            else{  // non-blank square
                if(board[ipos][jpos - 1].substring(0,1) != piece.substring(0,1)){  // player piece
                    posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[ipos][jpos - 1] + 'X';
                }
            }            
        }
        
        // 10:30
        if(ipos > 1 && jpos > 1){
            if(board[ipos - 1][jpos - 1] === ''){ // blank square is legal move
                posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[ipos - 1][jpos - 1];
            }
            else{  // non-blank square
                if(board[ipos - 1][jpos - 1].substring(0,1) != piece.substring(0,1)){  // player piece
                    posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[ipos - 1][jpos - 1] + 'X';
                }
            }            
        }
        
    }
    
    // Rook (or Queen)
    if(piece.substring(1,2)==='R' || piece.substring(1,2)==='Q'){
        
        // Vertical - down
        for(var i=ipos+1;i<9;i++){
            if(board[i][jpos] === ''){ // blank square is legal move
                posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[i][jpos];
            }
            else{  // non-blank square
                if(board[i][jpos].substring(0,1) != piece.substring(0,1)){  // player piece
                    posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[i][jpos] + 'X';
                    i = 9;
                }
                else{  // computer piece
                    //alert('computer piece: i=' + i + ', j=' + jpos);
                    i = 9;
                }
            }
        }
        
        // vertical - up
        for(var i=ipos-1;i>0;i--){
            if(board[i][jpos] === ''){ // blank square is legal move
                posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[i][jpos];
            }
            else{  // non-blank square
                if(board[i][jpos].substring(0,1) != piece.substring(0,1)){  // player piece
                    posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[i][jpos] + 'X';
                    i = 0;
                }
                else{  // computer piece
                    //alert('computer piece: i=' + i + ', j=' + jpos);
                    i = 0;
                }
            }
        }
        
        // Horizontal - left
        for(var j=jpos-1;j>0;j--){
            if(board[ipos][j] === ''){ // blank square is legal move
                posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[ipos][j];
            }
            else{  // non-blank square
                if(board[ipos][j].substring(0,1) != piece.substring(0,1)){  // player piece
                    posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[ipos][j] + 'X';
                    j = 0;
                }
                else{  // computer piece
                    j = 0;
                }
            }
        }

        // Horizontal - right
        for(var j=jpos+1;j<9;j++){
            if(board[ipos][j] === ''){ // blank square is legal move
                posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[ipos][j];
            }
            else{  // non-blank square
                if(board[ipos][j].substring(0,1) != piece.substring(0,1)){  // player piece
                    posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[ipos][j] + 'X';
                    j = 9;
                }
                else{  // computer piece
                    j = 9;
                }
            }
        }   
    }
    
    // Knight
    if(piece.substring(1,2)==='N'){
        iinc = 1;
        jinc = 2;       
        UpdateKnightMoves(iinc,jinc,ipos,jpos,piece,posmoves);
        iinc = -1;
        jinc = 2;
        UpdateKnightMoves(iinc,jinc,ipos,jpos,piece,posmoves);
        iinc = 1;
        jinc = -2;
        UpdateKnightMoves(iinc,jinc,ipos,jpos,piece,posmoves);
        iinc = -1;
        jinc = -2;
        UpdateKnightMoves(iinc,jinc,ipos,jpos,piece,posmoves);
        iinc = 2;
        jinc = 1;
        UpdateKnightMoves(iinc,jinc,ipos,jpos,piece,posmoves);
        iinc = -2;
        jinc = 1;
        UpdateKnightMoves(iinc,jinc,ipos,jpos,piece,posmoves);
        iinc = 2;
        jinc = -1;
        UpdateKnightMoves(iinc,jinc,ipos,jpos,piece,posmoves);
        iinc = -2;
        jinc = -1;
        UpdateKnightMoves(iinc,jinc,ipos,jpos,piece,posmoves);
    }
    
    // Bishop (or Queen)
    if(piece.substring(1,2)==='B' || piece.substring(1,2)==='Q'){
        var j = 0;
        // diagonal - down, right
        for(var i=ipos+1;i<9;i++){
            j = j + 1;
            if(jpos + j < 9){
                if(board[i][jpos + j] === ''){ // blank square is legal move
                    posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[i][jpos + j];
                }
                else{  // non-blank square
                    if(board[i][jpos + j].substring(0,1) != piece.substring(0,1)){  // player piece
                        posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[i][jpos + j] + 'X';
                        i = 9;
                    }
                    else{  // computer piece
                        i = 9;
                    }
                }
            }
            else{
                i = 9;
            }
        }
        // diagonal - down, left
        j = 0;
        for(var i=ipos+1;i<9;i++){
            j = j - 1;
            if(jpos + j > 0){
                if(board[i][jpos + j] === ''){ // blank square is legal move
                    posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[i][jpos + j];
                }
                else{  // non-blank square
                    if(board[i][jpos + j].substring(0,1) != piece.substring(0,1)){  // player piece
                        posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[i][jpos + j] + 'X';
                        i = 9;
                    }
                    else{  // computer piece
                        i = 9;
                    }
                }
            }
            else{
                i = 9;
            }
        }
        // diagonal - up, left
        j = 0;
        for(var i=ipos-1;i>0;i--){
            j = j - 1;
            if(jpos + j > 0){
                if(board[i][jpos + j] === ''){ // blank square is legal move
                    posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[i][jpos + j];
                }
                else{  // non-blank square
                    if(board[i][jpos + j].substring(0,1) != piece.substring(0,1)){  // player piece
                        posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[i][jpos + j] + 'X';
                        i = 0;
                    }
                    else{  // computer piece
                        i = 0;
                    }
                }
            }
            else{
                i = 0;
            }
        }
        // diagonal - up, right
        j = 0;
        for(var i=ipos-1;i>0;i--){
            j = j + 1;
            if(jpos + j < 9){
                if(board[i][jpos + j] === ''){ // blank square is legal move
                    posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[i][jpos + j];
                }
                else{  // non-blank square
                    if(board[i][jpos + j].substring(0,1) != piece.substring(0,1)){  // player piece
                        posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[i][jpos + j] + 'X';
                        i = 0;
                    }
                    else{  // computer piece
                        i = 0;
                    }
                }
            }
            else{
                i = 0;
            }
        }
    }
    
    // Pawn
    if(piece.substring(1,2)==='P'){
        if(ipos + 1 < 9){
            if(board[ipos + 1][jpos] === ''){ // blank square is legal move
                posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[ipos + 1][jpos];
            }            
        }
        if(ipos === 2){
            if(board[ipos + 1][jpos] === '' && board[ipos + 2][jpos] === ''){ // blank square is legal move
                posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[ipos + 2][jpos];
            }
        }
        if(jpos > 1){
            if(board[ipos + 1][jpos - 1] !== '' && board[ipos + 1][jpos - 1].substring(0,1) != piece.substring(0,1)){  // diagonal capture of player piece
                posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[ipos + 1][jpos - 1] + 'X';
            }            
        }
        if(jpos < 8){
            if(board[ipos + 1][jpos + 1] !== '' && board[ipos + 1][jpos + 1].substring(0,1) != piece.substring(0,1)){  // diagonal capture of player piece
                posmoves[posmoves.length] = squares[ipos][jpos] + '-' + squares[ipos + 1][jpos + 1] + 'X';
            }            
        }
    }
    
    return posmoves;
}

function PickRandomMove(whichplayersmove,tempboard) {
    
    var randmove;
    var randidx;
    var validmoves = [];
    
    AddProcessItem("Begin PickRandomMove()");
    
    // load [validmoves] array based on board[][]
    validmoves = GetValidMoves(whichplayersmove,tempboard);
    
    // Pick random selection from validmoves[] array
    randidx = Math.floor((Math.random() * validmoves.length) -1);
    //alert(randidx);
    if(randidx < 0){
        randidx = 0;
    }
    randmove = validmoves[randidx];
    AddProcessItem("Random Move: " + randmove);   
    AddProcessItem("End PickRandomMove()");
    
    return randmove;
}

function PickBestPointsMove1Step(whichplayersmove,tempboard) {
    var bestmove = [];
    var sequence;
    var idx;
    var points, maxpoints;
    var txt1, txt2;
    var validmoves = [];
    
    AddProcessItem('Begin PickBestPointsMove1Step()');
    maxpoints = 0;
    sequence = -1;
    
    validmoves = GetValidMoves(whichplayersmove,tempboard);
    
    // Values: pawn=1, bishop=knight=3, rook=5, and queen=9
    for(var i=0;i<validmoves.length;i++){
        txt1 = validmoves[i];
        txt2 = txt1.substring(txt1.length-1,txt1.length);
        if(txt2 === 'X' || txt2 === 'x'){
            points = CalculateCapturePoints(validmoves[i]);
            if(points >= maxpoints){
                maxpoints = points;
                sequence = i;
            }
        }
    }
    
    if(sequence === -1){  // no captures available
        bestmove[0] = PickRandomMove(whichplayersmove,tempboard);
    }
    else{
        bestmove[0] = validmoves[sequence];
    }
    bestmove[1] = maxpoints;
    
    AddProcessItem('Best Points Move (1 Step): ' + bestmove[0] + ' (' + maxpoints + 'pts)');
    AddProcessItem('End PickBestPointsMove1Step()');
    
    return bestmove;
}

function PickBestPointsMove2Step(whichplayersmove,tempboard) {
    var bestmove = [];
    var validmoves, validcountermoves;
    var maxpoints;
    var sequence;
    
    AddProcessItem('Begin PickBestPointsMove2Step()');
    
    // First get all valid computer moves
    validmoves = GetValidMoves(whichplayersmove,tempboard);
    
    // Second, iterate over validmoves and get all possible counter moves
    // Values: pawn=1, bishop=knight=3, rook=5, and queen=9
    for(var i=0;i<validmoves.length;i++){
        txt1 = validmoves[i];
        txt2 = txt1.substring(txt1.length-1,txt1.length);
        if(txt2 === 'X' || txt2 === 'x'){
            // ToDo: modify this function to use tempboard (currently broken)
            points = CalculateCapturePoints(validmoves[i],tempboard);
            if(points >= maxpoints){
                maxpoints = points;
                sequence = i;
            }
        }
    }
    
    AddProcessItem('End PickBestPointsMove2Step()');
    return bestmove;
}

function CalculateCapturePoints(move) {
    
    var capturedsquare = '';
    var points = 0;
    var i, j;
    var txt1;
    var piece;
    
    // Values: pawn=1, bishop=knight=3, rook=5, and queen=9
    // board[1][1]
    capturedsquare = move.substring(3,5);
    txt1 = capturedsquare.substring(0,1);
    i = parseInt(capturedsquare.substring(1,2));
    
    if(txt1 === 'A'){
        j = 1;
    }
    if(txt1 === 'B'){
        j = 2;
    }
    if(txt1 === 'C'){
        j = 3;
    }
    if(txt1 === 'D'){
        j = 4;
    }
    if(txt1 === 'E'){
        j = 5;
    }
    if(txt1 === 'F'){
        j = 6;
    }
    if(txt1 === 'G'){
        j = 7;
    }
    if(txt1 === 'H'){
        j = 8;
    }    
    
    i = 9 - i;
    piece = board[i][j];
    piece = piece.substring(1,2);
    
    if(piece === 'P'){
        points = 1;
    }
    if(piece === 'B' || piece === 'K'){
        points = 3;
    }
    if(piece === 'R'){
        points = 5;
    }
    if(piece === 'Q'){
        points = 9;
    }
       
    return points;
}