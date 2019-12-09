/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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