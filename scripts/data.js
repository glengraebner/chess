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
var board = []; // pieces on board
var sandboard = [];
var squares = []; // names of squares
var moves = [];
var processes = [];
var validmoves = [];
var capturedpieces = [];