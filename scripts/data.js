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
var computermove;
var validcompmoves;
var playerscore = 0;
var computerscore = 0;
var board = new Array(); // pieces on board
var squares = new Array(); // names of squares
var moves = new Array();
var processes = new Array();
var validmoves = new Array();
var capturedpieces = new Array();