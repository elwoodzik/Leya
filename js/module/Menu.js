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
			this.add.text('onbackground', "test", (this.canvas.width/2)-50, 100, 99, "white", null);
			
			that.levels = new Levels(this);
		},

		update: function(){
			that.levels.update();
		},
	})
	
	return Menu;
})