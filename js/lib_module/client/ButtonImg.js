define(['Class'], function(my){
    
   var Button = my.Class( {

        constructor: function(game, context, key, keyHover, x, y, width, height, action){
            this.Loader = require('module/Loader');
            //
            this.game = game;
            this.used = true;
            //
            this.x = x;
            this.y = y;
            this.key = key;
            this.keyHover = keyHover === null ? this.key : keyHover;

            this.image =  this.Loader.assetManager.get(this.key); 
            
            this.width = width || this.image.width;
			this.height = height || this.image.height;

			this.currentWidth = this.width;
			this.currentHeight = this.height;
            
            this.hovered = false;
            this.scale = 1;
            this.action = action;
            this.zIndex = 5;
            //
            //this.game.physic.outOfScreen(this)
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
			}
        },

        update: function() {
            var wasNotClicked = this.game.mouse.click;
             
            if (this.game.mouse.updateStats(this) && wasNotClicked && typeof this.action === 'function') {
                this.game.mouse.click = false;
              
                this.action.call(this.game, this);
               
            }
        },

        draw: function(lag) {
            if (this.hovered) {
                this.image =  this.Loader.assetManager.get(this.keyHover); 
            } else {
                this.image =  this.Loader.assetManager.get(this.key); 
            }
            
            if (this.previousX) {
	            this.renderX = (this.x - this.previousX) * lag + this.previousX;
	        } else {
	            this.renderX = this.x;
	        }
	        if (this.previousY) {
	            this.renderY = (this.y - this.previousY) * lag + this.previousY;
	        } else {
	            this.renderY = this.y;
	        }
			this.context.drawImage(
	            this.image,
	            0,
	            0,
	            this.width,
	            this.height,
	            this.renderX - this.game.camera.xScroll, // * this.scale
	            this.renderY - this.game.camera.yScroll, // * this.scale
	            this.fullscreen ? this.game.canvas.width : this.width,
	            this.fullscreen ? this.game.canvas.height : this.height
	        )
        }
    })

    return Button;
})