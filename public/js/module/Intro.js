define([
	'Class',
	
], function(my){
	'use strict';
	var that;

	var Intro = my.Class({

		constructor: function(game){
			that = this;
            that.game = game;
		},
		
		create: function(){
			var asteroids = [];
			var galactic = that.game.add.tileSprite('main', 0, 0, 'galactic');
				galactic.velocity.x = -1;

			var b = that.game.add.button("Pomiń", that.game.width - 160, 10, 150, 50, 'white', 'red', 'black', 'black', '#333', that.startGame);

			var asteroidsConfig = [
				{
					x: 1400,
					y: 500,
					speed: -5,
					rot: -6,
					anchorX: 0.5,
					anchorY: 0.5
				},
				{
					x: 1500,
					y: 300,
					speed: -4,
					rot: -2,
					anchorX: 0.5,
					anchorY: 0.5
				},
				{
					x: 1200,
					y: 210,
					speed: -2,
					rot: 8,
					anchorX: 0.5,
					anchorY: 0.5
				},
				{
					x: 1800,
					y: 450,
					speed: -5,
					rot: -4,
					anchorX: 0.5,
					anchorY: 0.5
				},
				{
					x: 1900,
					y: 370,
					speed: -4,
					rot: 3,
					anchorX: 0.5,
					anchorY: 0.5
				}
			]

			for(var i=0; i<asteroidsConfig.length; i++){
				var conf = asteroidsConfig[i];
				var a1 = that.game.add.image('main', conf.x, conf.y, 'asteroid1');
					a1.body.setAnchor(conf.anchorX,conf.anchorY);
					a1.body.angleSpeed = conf.rot;
					a1.body.velocity.x = conf.speed;

			}
			
			
			//galactic.velocity.y = -1; 

			that.game.VAR.ufo = that.game.add.image('main', 100, 250, 'ufo', 40, 30);
		},

		update: function(){
			
		},

		startGame: function(){
			that.game.state.start("Menu");
		}
	})
	
	return Intro;
})