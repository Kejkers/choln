'use strict';

function loadEngine() {
    var Crafty = require('craftyjs');
    Crafty.init(1280,720);
    Crafty.background('black');
    Crafty.sprite("assets/sprites/choln.png", {choln:[0,0,128,128]});

    return Crafty;
}
