define([
	'Class',
	'module/Levels'
], function(my, Levels){
	var that;

	var Menu = my.Class({

		constructor: function(){
			that = this;
		},
		
		create: function(){
			// this.add.image('main', 0,0,'menu-bg',1366, 768);
			
			// this.add.text('main', "Wybierz Poziom", (this.canvas.width/2)-300, 170, 99, "#333", null);
			
			// that.levels = new Levels(this);

			var img = this.add.image('main', this.rand(20,400),this.rand(20,400),'menu-bg',80, 80);
			console.log(this)
			this.add.toMulti(img);
		},

		update: function(){
			// that.levels.update();
		},
	})
	
	return Menu;
})