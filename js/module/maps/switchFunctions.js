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
                                this.game.VAR[this.actOn].previousX = 130;
                                this.game.VAR[this.actOn].renderX = 130;
                                this.game.VAR[this.actOn].x = 130; 
                                this.game.VAR[this.actOn].previousY = 330;
                                this.game.VAR[this.actOn].renderY = 330;
                                this.game.VAR[this.actOn].y = 330; 
                            }
                        },
                        callbackOut: function(){ 
                            if(this.game.VAR[this.actOn]){
                                this.game.VAR[this.actOn].previousX = this.game.VAR[this.actOn].startX;
                                this.game.VAR[this.actOn].renderX = this.game.VAR[this.actOn].startX;
                                this.game.VAR[this.actOn].x = this.game.VAR[this.actOn].startX;

                                this.game.VAR[this.actOn].previousY = this.game.VAR[this.actOn].startY;
                                this.game.VAR[this.actOn].renderY = this.game.VAR[this.actOn].startY;
                                this.game.VAR[this.actOn].y = this.game.VAR[this.actOn].startY;
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