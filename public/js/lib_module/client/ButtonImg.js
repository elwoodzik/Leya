define(['Class'], function(my){
   var that;

   var Button = my.Class( {

        constructor: function(game,pooled, context, key, keyHover, x, y, width, height, action){
            this.Loader = require('module/Loader');
            //
            that = this;
            this.game = game;
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
            this.used = true;

            this.static = false;

            this.contextType = context;

            if(!this.pooled){
                this.setContext(this.contextType);
            }

        },

        update: function() {
            
           this.game.mouse.trigger(that, function(){
               console.log('s')
           })
            //     this.game.mouse.click = false;
            //     console.log('p;')
            //     this.action.call(this.game, this);
            // }
        },

        draw: function(dt) {
            
            if (this.hovered) {
                this.image =  this.Loader.assetManager.get(this.keyHover); 
            } else {
                this.image =  this.Loader.assetManager.get(this.key); 
            }
            
            if (this.previousX) { 
                this.renderX = (this.previousX + (this.x - this.previousX) * dt);  //this.x + (this.body.velocity.x * dt);

            } else {
                this.renderX = this.x;
                
            }
            if (this.previousY) {
                this.renderY = (this.previousY + (this.y - this.previousY) * dt); //this.y + (this.body.velocity.y * dt);
            } else {
                this.renderY = this.y;
            } 
			this.context.drawImage(
	            this.image,
	            0,
	            0,
	            this.image.width,
	            this.image.height,
	            Math.floor(this.renderX  - (!this.static ? this.game.camera.xScroll : 0)), // * this.scale
	            Math.floor(this.renderY - (!this.static ? this.game.camera.yScroll : 0)),// * this.scale
	            this.width,
	            this.height
	        )
        },

         changeContext: function(context, array){
            if(this.contextType != context){
                this.destroy(array);
                this.setContext(context);
            }
            return this;
        },

        setContext: function(context){
            if( context){
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
            }
        },
    })

    return Button;
})