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
	    	this.game.gameObjectStatic.length = 0;
	    	this.game.gameObjectOnStatic.length = 0;
			this.game.camera.xScroll = 0;
			this.game.camera.yScroll = 0;
			this.game.VAR = {};
			this.game.ARR = {};
	    	this.game.currentState = null;
	    	this.game.currentState = new this.game.states[key](this.game);
			
	    	if(this.game.currentState.create){
    			this.game.currentState.create.apply(this.game);
				if(this.game.bgctx){
					this.game.renderStatic();
				}
				if(this.game.onbgctx){
					this.game.renderOnStatic();
				}
	    	}else{
	    		throw "Brakuje metody create w scenie " + key;
	    	}
	    }
	});

	return GameStateFactory;
});