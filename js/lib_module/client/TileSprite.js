define(['Class', 'require', 'lib_module/client/Body'], function(my, require, Body){
    
  var TileSprite = my.Class({
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
                        w+ this.x - this.game.camera.xScroll, // * this.scale
                        h - this.game.camera.yScroll, // * this.scale
                        this.width,
                        this.height
                    );

                    this.game.ctx.drawImage(
                        this.image,
                        0,
                        0,
                        this.image.width,
	                    this.image.height,
                        w+this.x + this.width - this.game.camera.xScroll, // * this.scale
                        h- this.game.camera.yScroll, // * this.scale
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
            // else if(this.x >  this.game.canvas.width){
            //     this.x = 0 - this.velocity.x;
            // }   
        },

        changeContext: function(context, array){
            if(this.contextType != context){
				this.destroy(array);
                this.setContext(context);
            }
			return this;
        },

        setContext: function(context){
		
            if(context === 'main'){
				this.context = this.game.ctx;
				this.contextType = context;
				this.gameObjectLength = this.game.gameObject.length;
				this.game.gameObject[this.gameObjectLength] = this; 
			}else if(context === 'background'){
				this.context = this.game.bgctx;
				this.contextType = context;
				this.gameObjectStaticLength = this.game.gameObjectStatic.length;
				this.game.gameObjectStatic[this.gameObjectStaticLength] = this; 
				//this.redraw(); 
			}
			else if(context === 'onbackground'){
				this.context = this.game.onbgctx;
				this.contextType = context;
				this.gameObjectOnStaticLength = this.game.gameObjectOnStatic.length;
				this.game.gameObjectOnStatic[this.gameObjectOnStaticLength] = this; 
				//this.redraw();
			}else{
				return console.error("Niepoprawna nazwa Contextu. Dostępne nazwy to: \n1. background \n2. onbackground \n3. main")
			}
        },
    });

    return TileSprite;
});
