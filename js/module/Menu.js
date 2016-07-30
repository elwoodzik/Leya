define(['Class'], function(my){
	var that;

	var Menu = my.Class({
		/**
		 * Represents a book.
		 * @constructor
		 */
		constructor: function(){
			that = this;
		},
		//*
		/**
		 * Represents a create Method.
		 * This is a description of the foo function.
		 */
		create: function(){
			
			this.add.text('main', "test", (this.canvas.width/2)-50, 100, 99, "red", null);
			
			that.lvls = [];
			var lvl_x = 290;
			var lvl_y = 150;
			
			for(var i = 1; i <= 20; i++){

				var lvl = that.lvls.push(this.add.sprite('background', lvl_x, lvl_y, 'levels'));
				that.lvls[lvl-1].animations.add('stars0', 0, 0, 65, 65, [0]);
				that.lvls[lvl-1].animations.add('stars1', 65, 0, 65, 65, [0]);
				that.lvls[lvl-1].animations.add('stars2', 65*2, 0, 65, 65, [0]);
				that.lvls[lvl-1].animations.add('stars3', 65*3, 0, 65, 65, [0]);
				that.lvls[lvl-1].animations.add('stars4', 65*4, 0, 65, 65, [0]);
				that.lvls[lvl-1].animations.play('stars0');
				//that.lvls[lvl-1].redraw();

				this.add.text('background', i, lvl_x+3, lvl_y+16, 18, "white", null);
				lvl_x += 90;

				if(i%5==0 ){
					lvl_y+= 90;
					lvl_x = 290;
				}
				
			}

			//this.add.button("button1", this.canvas.width/2-130, this.canvas.height/2+130, 360, 90,'black','red','red', this.currentState.playGame);

			//this.add.button("button2", this.canvas.width/2-130, this.canvas.height/2+250, 360, 90,'black','red','red', this.currentState.showOptions);		
		
		},

		update: function(){
			this.mouse.trigger(that.lvls, function(a){
				console.log(a)
			},true);
		},
	})
	
	return Menu;
})