define(['Class', 'require', 'lib_module/client/Body', 'lib_module/client/_ObjectSettings'], function(my, require, Body, Settings){
    
  var TileSprite = my.Class(null, Settings, {
        constructor: function(game, pooled, context, x, y, key, width, height){
            var Loader = require('module/Loader');
            this.game = game; 
            this.used = true;
            this.x = x || 0; 
            this.y = y || 0; 
            this.velocity = {
                x:0,
                y:0
            };

            this.key = key;
            this.zIndex = 1;
            this.image = Loader.assetManager.get(this.key); 
        

            this.contextType = 'main';
            this.width =  width || this.image.width;
            this.height = height || this.image.height;

            this.currentWidth = this.image.width; 
            this.currentHeight = this.image.height; 

            this.isOutOfScreen = false;

	        if(!this.pooled){
	        	this.setContext(context);
	        }
        },

        draw: function(){
            for (var w = 0; w < this.game.canvas.width; w += this.image.width) {
                for (var h = 0; h < this.game.canvas.height; h  += this.image.height) {

                    this.game.ctx.drawImage(
                        this.image,
                        0,
                        0,
                        this.image.width,
                        this.image.height,
                        w + this.x - this.game.camera.xScroll, // * this.scale
                        h - this.y - this.game.camera.yScroll, // * this.scale
                        this.width,
                        this.height
                    );

                    this.game.ctx.drawImage(
                        this.image,
                        0,
                        0,
                        this.image.width,
	                    this.image.height,
                        w + this.x + this.width - this.game.camera.xScroll, // * this.scale
                        h - this.y - this.game.camera.yScroll, // * this.scale
                        this.width,
                        this.height
                    )
                }
            }
        },

        update: function(){
           
            if(this.velocity.x != 0){
                this.x += this.velocity.x;
            }
            if(this.velocity.y != 0){
                this.y += this.velocity.y;
            }

            if (this.x+this.width < 0){
                this.x =  0
            }
            if (this.y+this.height < 0){
                this.y =  0
            }
            // else if(this.x >  this.game.canvas.width){
            //     this.x = 0 - this.velocity.x;
            // }   
        }
    });

    return TileSprite;
});
