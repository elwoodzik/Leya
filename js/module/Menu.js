define(['Class'], function(my){
	
	var pony;
	var cards = [];
	var cardsR = [];
	var cards1 = [];
	var cards2 = [];

	var Menu = my.Class({
		/**
		 * Represents a book.
		 * @constructor
		 */
		constructor: function(){

		},
		//*
		/**
		 * Represents a create Method.
		 * This is a description of the foo function.
		 */
		create: function(){
			
			this.add.text("test", (this.canvas.width/2)-74, 170, 152, "white", null);

			this.add.button("button1", this.canvas.width/2-130, this.canvas.height/2+130, 360, 90,'#cccccc','white','white', this.currentState.playGame);

			this.add.button("button2", this.canvas.width/2-130, this.canvas.height/2+250, 360, 90,'#cccccc','white','white', this.currentState.showOptions);		
		
		},

		update: function(){
			
		},

	})

	return Menu;
})