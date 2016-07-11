define(['Class'], function(my, game){
	
	var GameStateFactory = my.Class( {
		
		constructor: function(game){
		 	this.game = game;
		},

	  	add: function (key, stateObject) {
	    	this.game.states[key] = stateObject;	
	    },

	    start: function(key){
	    	var that = this;
	    	
	    	this.game.cTime = 0;
	    	this.game.world.timeLocal = 0;
	    	this.game.gameObject.length = 0;
	    	this.game.currentState = new this.game.states[key]();
	    	if(this.game.currentState.create){
	    		this.game.currentState.create.apply(this.game);
	    	}else{
	    		throw "Brakuje metody create w scenie " + key;
	    	}
	    	
	    	
	    }
	});

	return GameStateFactory;
});