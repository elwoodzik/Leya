define(['Class'], function(my){
    
  var Camera = my.Class( {
        
        constructor: function(game, player){
            this.game = game;
            this.used = true;

            this.player = player;

            this.oldPlayerX = this.player.x 
            this.oldPlayerY = this.player.y 

            this.x = this.game.canvas.width * 0.5;
            this.y = this.game.canvas.height * 0.5;

            this.xScroll = 0;
            this.yScroll = 0;

            this.position = [this.xScroll, this.yScroll];
            this.prevPosition = [this.xScroll, this.yScroll];
            this.curPosition = [this.xScroll, this.yScroll];

            this.lerpAmount = 1.0; 

            this.game.gameObjectLength = Object.keys(this.game.gameObject).length;
            this.game.gameObject[this.game.gameObjectLength] = this; 
        },

        draw: function(){

        },

        lerp: function(A, B, t){
            return Math.floor((A * t) + ((1.0 - t) * B));
        },

        update: function(dt){
            this.dx = (this.player.x + this.player.currentWidth/8 - this.x);
            this.dy = (this.player.y + this.player.currentHeight/2 - this.y);
        
            this.position = [this.xScroll, this.yScroll];
        
            if(this.position[0] != this.curPosition[0] || this.position[1] != this.curPosition[1]){
                this.lerpAmount = 0.0;
                this.curPosition = this.position;
                
              
            }
            
            if(this.lerpAmount < 1.0){
                this.lerpAmount += 0.1;
            } else {
                this.prevPosition = this.curPosition;
            }
        
            this.xScroll = this.lerp(this.dx, this.curPosition[0], this.lerpAmount); 
            this.yScroll = this.lerp(this.dy, this.curPosition[1], this.lerpAmount); 
            
            if(this.yScroll <= 0 ){
                this.yScroll = 0;
            }
            if(this.xScroll <= 0 ){
                this.xScroll = 0;
            }
            if(this.xScroll >= this.game.portViewWidth-this.game.canvas.width ){
                this.xScroll = this.game.portViewWidth-this.game.canvas.width
            }

            if(this.yScroll >= this.game.portViewHeight-this.game.canvas.height ){
                this.yScroll = this.game.portViewHeight-this.game.canvas.height
            }

                this.game.physic.outOfScreen(this.game.gameObject)
        }
       
    });

    return Camera;
});