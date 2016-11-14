define([
	'Class',
], function(my){
	'use strict';
	var that;

	var Menu = my.Class({

		constructor: function(game){
			that = this;
			that.game = game;
		},
		
		create: function(){
			this.add.image('main', 0,0,'menu-bg',1366, 768);
			
			this.add.text('main', "Nazwa", (this.canvas.width/2)-170, 170, 99, "#333", null);
		
			//this.add.button("Graj", 500, 300, 300, 80, '#077607', '#0cd70c', '#333', null);
			//this.add.button("Opcje", 500, 410, 300, 80, '#077607', '#0cd70c', '#333', null);
			// this.add.buttonImg("main", 'graj', 'graj-hover', 550, 280, 0,0, that.play);	

			// this.add.buttonImg("main", 'opcje', 'opcje-hover', 530, 430, 0,0, null);

			this.add.button('Graj',600, 310 , 180, 60, null, null, 'black', 'green', '#333', that.play);
			this.add.button('Opcje',600, 400 , 180, 60, null, null, 'black', 'green', '#333', null);
			this.add.button('Zamknij',600, 490 , 180, 60, null, null, 'black', 'green', '#333', window.close);
           
				
			
	
			// that.img = this.add.image('main', this.rand(20,800),this.rand(20,600),'menu-bg',80, 80);
			// var img2 = this.add.image('main', this.rand(20,800),this.rand(20,800),'menu-bg',80, 80);

			// this.add.toMulti(that.img);
			// this.add.toMulti(img2);
		},

		update: function(){
			
			// if (this.keyboard.use['A'].pressed){
			// 	that.img.x -= 3;
			// }
			// if (this.keyboard.use['D'].pressed){
			// 	that.img.x += 3;
			// }
			// that.img.multiUpdate();
		},

		play: function(){
			that.game.state.start('LevelSelect');
		}
	})
	
	return Menu;
})