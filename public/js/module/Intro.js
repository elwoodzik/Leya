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
			var galactic = that.game.add.tileSprite('main', 0, 0, 'galactic');
			galactic.velocity.x = -1;
			//galactic.velocity.y = -1; 

			that.game.VAR.ufo = that.game.add.image('main', 100, 250, 'ufo', 40, 30);
		},

		update: function(){
			
		},
	})
	
	return Intro;
})