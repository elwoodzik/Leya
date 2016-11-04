define([
	'Class',
	'module/Levels'
], function(my, Levels){
	'use strict';
	var that;

	var LevelSelect = my.Class({

		constructor: function(game){
			that = this;
			that.game = game;
		},
		
		create: function(){
			this.add.image('main', 0, 0, 'menu-bg', 1366, 768);
			
			this.add.image('main', 400, 80, 'selectLevel');
			//this.add.text('main', "Wybierz Poziom", (this.canvas.width/2)-300, 170, 99, "#333", null);
			
			that.levels = new Levels(this);
			
			this.add.buttonImg("main", 'menu', 'menu-hover', this.width-200, 40, 0,0, that.backToMenu);	

			// that.img = this.add.image('main', this.rand(20,800),this.rand(20,600),'menu-bg',80, 80);
			// var img2 = this.add.image('main', this.rand(20,800),this.rand(20,800),'menu-bg',80, 80);

			// this.add.toMulti(that.img);
			// this.add.toMulti(img2);
		},

		update: function(){
			that.levels.update();
			// if (this.keyboard.use['A'].pressed){
			// 	that.img.x -= 3;
			// }
			// if (this.keyboard.use['D'].pressed){
			// 	that.img.x += 3;
			// }
			// that.img.multiUpdate();
		},

		backToMenu: function(){
			that.game.state.start('Menu');
		}
	})
	
	return LevelSelect;
})