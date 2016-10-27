define(['Class', 'require', 'lib_module/client/Body'], function(my, require, Body){
	
	var Image = my.Class({
		constructor: function(game, pooled, context, x, y, key, width, height, fullscreen){
			var Loader = require('module/Loader');
			
			this.game = game; 
			this.used = true;

			this.pooled = pooled;

			this.x = x || 0; 
			this.y = y || 0; 
			this.key = key;
			
			this.image = Loader.assetManager.get(this.key); 
			
			this.body = new Body(this.game, this);
			this.zIndex = 2;

			this.width = width || this.image.width;
			this.height = height || this.image.height;

			this.currentWidth = this.width;
			this.currentHeight = this.height;

			this.useCollision = true;
			
	        this.currentHalfWidth = this.currentWidth / 2;
	        this.currentHalfHeight = this.currentHeight / 2;

	       	this.isOutOfScreen = false;
            this.updateOfScreen = true;

	        if(!this.pooled){
	        	this.setContext(context);
	        }
			
		},

		draw: function(lag){
			
			this.useRotate();
			
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
	        
			this.game.ctx.drawImage(
	            this.image,
	            0,
	            0,
				this.image.width,
	            this.image.height,
	            this.renderX - this.game.camera.xScroll, // * this.scale
	            this.renderY - this.game.camera.yScroll, // * this.scale
	            this.width,
	            this.height
	        )

		
		},

		redraw: function(lag){
			
			this.useRotate();
			
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
			
			this.context.clearRect(this.renderX, this.renderY, this.currentWidth, this.currentHeight);

			this.context.drawImage(
	            this.image,
	            0,
	            0,
	            this.image.width,
	            this.image.height,
	            this.renderX - this.game.camera.xScroll, // * this.scale
	            this.renderY - this.game.camera.yScroll, // * this.scale
				this.width,
	            this.height
	        )
		},

		update: function(dt){
			this.worldBounce();
			this.moveToPointHandler();

			
            if(this.body.velocity.x != 0 || this.body.velocity.y != 0){
                this.x =  Math.floor(this.x  + (dt * this.body.velocity.x));
                this.y =  Math.floor(this.y  + (dt * this.body.velocity.y));
            }
		},

		kill: function(){
            this.game.gameObject.splice(this.game.gameObject.indexOf(this), 1);
        },

		destroy: function(array){  
            if(Array.isArray(array)){
                array.splice(array.indexOf(this), 1);
            }else if(typeof array === 'object'){
				array = null;
			}
			if(this.contextType === 'main'){
            	return this.game.gameObject.splice(this.game.gameObject.indexOf(this), 1);
			}else if(this.contextType === 'background'){
				var destroyed = this.game.gameObjectStatic.splice(this.game.gameObjectStatic.indexOf(this), 1);
				this.context.clearRect(destroyed[0].x, destroyed[0].y, destroyed[0].currentWidth, destroyed[0].currentHeight);
			}else if(this.contextType === 'onbackground'){
				var destroyed = this.game.gameObjectOnStatic.splice(this.game.gameObjectOnStatic.indexOf(this), 1);
				this.context.clearRect(destroyed[0].x, destroyed[0].y, destroyed[0].currentWidth, destroyed[0].currentHeight);
			}
        },
		
		worldBounce: function(){
            if(this.body.colideWorldSide){
                if(this.body.colideWorldSideBottom && this.y + this.currentHeight > this.game.portViewHeight ){
                    this.body.velocity.y = this.body.worldBounds ? this.body.velocity.y*-1 : 0;
                    this.y = this.game.portViewHeight - this.currentHeight;
                }
                else if(this.body.colideWorldSideTop && this.y < 0){
                    this.body.velocity.y = this.body.worldBounds ? this.body.velocity.y*-1 : 0;
                    this.y = 0;
                }
                if(this.body.colideWorldSideRight && this.x + this.currentWidth > this.game.portViewWidth ){
                    this.body.velocity.x = this.body.worldBounds ? this.body.velocity.x*-1 : 0;
                    this.x = this.game.portViewWidth - this.currentWidth;
                }
                else if(this.body.colideWorldSideLeft && this.x < 0){
                    this.body.velocity.x = this.body.worldBounds ? this.body.velocity.x*-1 : 0;
                    this.x = 0;
                }
            }
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
		
		useRotate: function(){
             this.body.angle += this.body.angleSpeed; 
        },

		moveByLine: function(_mouseX, _mouseY, _speed, _maxDistance, _callback){
			if(!_mouseX || !_mouseY){
				return false;
			}
            var dx = (_mouseX - this.x - this.currentHalfWidth);
            var dy = (_mouseY - this.y - this.currentHalfHeight);
			var distance = Math.sqrt(dx * dx + dy * dy);
			var maxDistance = _maxDistance || 10;
			var speed = _speed || 4;
			
			if(distance > maxDistance){
				if(Math.abs(dx) > 1 && Math.abs(dy) > 1){
					var angle = Math.atan2(dy, dx);
					this.body.rotate(angle*(180/Math.PI));

					this.body.velocity.x = Math.cos(angle) * speed;
					this.body.velocity.y = Math.sin(angle) * speed;
				}
			}else{
				this.body.velocity.x = 0;//Math.cos(angle) * speed;
				this.body.velocity.y = 0;//Math.sin(angle) * speed;
				if(typeof _callback === 'function'){
					this._callback.call(this.game, this);
				}
			}
        },

        moveToPoint: function(x, y, speed, callback){
            //if(!this.moveTo){
                this.positionToMoveX = Math.floor(x);
                this.positionToMoveY = Math.floor(y)  ;
                this.positionSpeed = speed;
                this.oldVelocityX = this.body.velocity.x;
                this.oldVelocityY = this.body.velocity.y;
                this.oldUseCollision = this.useCollision;
                this.useCollision = false;
                this.moveTo = true;
                
                this.positionCallback = callback;
            //}
        },

        moveToPointHandler: function(){
            if(this.moveTo){
                
                this.myX = Math.floor(this.x + this.currentWidth /2);
                this.myY = Math.floor(this.y + this.currentHeight /2 );
            
                if(this.moveTo && (this.myX != this.positionToMoveX && this.myY != this.positionToMoveY) ){
                    this.x -= Math.floor(((this.myX - this.positionToMoveX) / this.positionSpeed));  
                    this.y -= Math.floor(((this.myY - this.positionToMoveY) / this.positionSpeed));
                    this.body.velocity.x = 0;
                    this.body.velocity.y = 0;
					
                }else if(this.moveTo ){
                    this.body.velocity.x = this.oldVelocityX;
                    this.body.velocity.y = this.oldVelocityY;
                    this.useCollision = this.oldUseCollision;
                    this.x = Math.floor(this.x)
                    this.y = Math.floor(this.y) 
                    this.moveTo = false;
					
                    if(typeof this.positionCallback === 'function'){
                        this.positionCallback.call(this.game, this);
                    }
                }
            }
            
        },
		
		setIndex: function(index){
            this.zIndex = index;
            this.game.gameObject.sort(function(obj1, obj2) {
                if(obj1.zIndex > obj2.zIndex)
                    return 1;
                else if(obj1.zIndex < obj2.zIndex) {
                    return -1;
                } else {
                    return 0;
                }
            });
        },
	});

	return Image;
})
