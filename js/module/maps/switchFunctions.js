define([
	'Class',
], function(my){
	var that;

	var switchFunctions = my.Class({

		init: function(){
            var switchFunctions = {
                lvl1:  [
                    {
                        actOn: 'exit',
                        callbackIn: function(){
                            if(this.game.VAR[this.actOn]){ 
                                this.game.VAR[this.actOn].previousX = 30;
                                this.game.VAR[this.actOn].renderX = 30;
                                this.game.VAR[this.actOn].x = 30; 
                            }
                        },
                        callbackOut: function(){ 
                            if(this.game.VAR[this.actOn]){
                                this.game.VAR[this.actOn].previousX = this.game.VAR[this.actOn].startX;
                                this.game.VAR[this.actOn].renderX = this.game.VAR[this.actOn].startX;
                                this.game.VAR[this.actOn].x = this.game.VAR[this.actOn].startX;
                            }
                        }
                    }
                ]
            } 
            return switchFunctions;
        },
	})

   
	
	return new switchFunctions();
})