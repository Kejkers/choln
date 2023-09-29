'use strict';

var Crafty = require('craftyjs');

Crafty.init(1280,720);

Crafty.background('black');

Crafty.sprite("assets/sprites/choln.png", {choln:[0,0,128,128]});


var p = Crafty.e('2D, Canvas, Color, Collision, Controllable, choln')
  .attr({x: 10, y: 10, w: 128, h: 128})
  .color('transparent')
  .collision(
      new Crafty.polygon([10, 10,  40, 10,  40, 40,  10, 40])
   // )
   ).bind('KeyDown', function(e) {
      if (e.key == Crafty.keys.LEFT_ARROW) {
        this.x -= 5;
      } else if (e.key == Crafty.keys.RIGHT_ARROW) {
        this.x += 5;
      } else if (e.key == Crafty.keys.UP_ARROW) {
        this.y -= 5;
      } else if (e.key == Crafty.keys.DOWN_ARROW) {
        this.y += 5;
      }
  })
;

p.enableControl();
