define(['Class', 'require', 'lib_module/client/Body'], function(my, require, Body){
	
	var Image = my.Class({
		constructor: function(game, x, y, key, width, height, fullscreen){
			var Loader = require('module/Loader');
			
			this.game = game; 
			this.used = true;
			this.x = x || 0; 
			this.y = y || 0; 
			this.key = key;
			this.fullscreen = fullscreen || false;
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

			this.gameObjectLength = Object.keys(this.game.gameObject).length;
			this.game.gameObject[this.gameObjectLength] = this; 

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
	            this.width,
	            this.height,
	            this.renderX - this.game.camera.xScroll, // * this.scale
	            this.renderY - this.game.camera.yScroll, // * this.scale
	            this.fullscreen ? this.game.canvas.width : this.width,
	            this.fullscreen ? this.game.canvas.height : this.height
	        )
		},

		update: function(){
			
			this.worldBounce();
			this.x += this.body.velocity.x;
	        this.y += this.body.velocity.y;
		},

		kill: function(){
            this.game.gameObject.splice(this.game.gameObject.indexOf(this), 1);
        },

		destroy: function(array){
			this.game.gameObject.splice(this.game.gameObject.indexOf(this), 1);
			array.splice(array.indexOf(this), 1);
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
		
		useRotate: function(){
             this.body.angle += this.body.angleSpeed; 
        },

		moveByLine: function(_mouseX, _mouseY, _speed, _maxDistance, _callback){
            var dx = (_mouseX - this.x - this.currentHalfWidth);
            var dy = (_mouseY - this.y - this.currentHalfHeight);
			var distance = Math.sqrt(dx * dx + dy * dy);
			var maxDistance = _maxDistance || 2;
			
			if(distance > maxDistance){
				if(Math.abs(dx) > 1 && Math.abs(dy) > 1){
					var angle = Math.atan2(dy, dx);
					this.body.rotate(angle*(180/Math.PI));

					this.body.velocity.x = Math.cos(angle) * _speed;
					this.body.velocity.y = Math.sin(angle) * _speed;
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
                
                this.myX = Math.floor(this.x+ this.currentWidth /2);
                this.myY = Math.floor(this.y+ this.currentHeight /2 );
            
                if(this.moveTo && (this.myX != this.positionToMoveX || this.myY != this.positionToMoveY) ){
                    this.x -= ((this.myX - this.positionToMoveX) / this.positionSpeed);  
                    this.y -= ((this.myY - this.positionToMoveY) / this.positionSpeed);
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
