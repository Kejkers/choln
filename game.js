'use strict';

// TODO:
// var loader = require('./loader');

var Crafty = require('craftyjs');
// create window
Crafty.init(1280,720);
Crafty.background('black');

// load resources
Crafty.sprite("assets/sprites/choln.png", {choln:[0,0,27,61]});
Crafty.sprite("assets/sprites/barrel.png", {barrel:[0,0,27,61]});

// // GAME PARAMETERS
var pushing = false;
var speed = 5;
var contraAccelerateCoeff = 35;
var contraAccelerate = speed / contraAccelerateCoeff;

// //

// // PLAYER INSTANTIATING
var p = Crafty.e('2D, Canvas, Color, Collision, Controllable, choln')
  .attr({x: 10, y: 10, w: 27, h: 61, vx: 0, vy: 0, ax: 0, ay: 0})
  .color('transparent')
  .collision(
    new Crafty.polygon([10, 10,  37, 10,  37, 71,  10, 71])
  )
  .checkHits('barrel')
  .bind('KeyDown', handleKey)
  .bind('ExitFrame', updatePlayer)
  .onHit('barrel', function(hitDatas) {
      for (var i = 0, l = hitDatas.length; i < l; ++i) {
        // TODO: hitDatas[i].x, hitDatas[i].y add impulse to this.x, this.y
        console.log('Hit barrel!');
      }
  })
;

// //

// // BARREL INSTANTIATING
var barrel = Crafty.e('2D, Canvas, Color, Collision, Controllable, barrel')
  .attr({x: 77, y: 77, w: 27, h: 61, vx: 0, vy: 0, ax: 0, ay: 0})
  .color('transparent')
  .collision(
    new Crafty.polygon([10, 10,  37, 10,  37, 71,  10, 71])
  )
;
// //



function handleKey(e) {
  if (e.key == Crafty.keys.X) {
      pushing = !pushing;
  }

  if (e.key == Crafty.keys.LEFT_ARROW) {
    p.vx = -speed;
    p.ax = contraAccelerate;
  } else if (e.key == Crafty.keys.RIGHT_ARROW) {
    p.vx = speed;
    p.ax = -contraAccelerate;
  } else if (e.key == Crafty.keys.UP_ARROW) {
    p.vy = -speed;
    p.ay = contraAccelerate;
  } else if (e.key == Crafty.keys.DOWN_ARROW) {
    p.vy = speed;
    p.ay = -contraAccelerate;
  }
}



function updatePlayer(e) {
  updMotion(e.dt);
}

function updMotion(dt) {
  p.x += p.vx;
  p.y += p.vy;

  // prevents from strange bugs
  if ((p.vx > 0 && p.vx + p.ax > p.vx) || (p.vx < 0 && p.vx + p.ax < p.vx)) {
    p.vx = 0;
    p.ax = 0;
  } else {
    p.vx += p.ax;
  }

  if ((p.vy > 0 && p.vy + p.ay > p.vy) || (p.vy < 0 && p.vy + p.ay < p.vy)) {
    p.vy = 0;
    p.ay = 0;
  } else {
    p.vy += p.ay;
  }


  if (Math.abs(p.vx) <= 0.1) { p.vx = 0; p.ax = 0; }
  if (Math.abs(p.vy) <= 0.1) { p.vy = 0; p.ay = 0; }
}
