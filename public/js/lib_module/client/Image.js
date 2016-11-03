define(['Class', 'require', 'lib_module/client/Body', 'lib_module/client/_ObjectSettings'], function(my, require, Body, Settings){
	
	var Image = my.Class(null, Settings, {
		constructor: function(game, pooled, context, x, y, key, width, height, fullscreen){
			
			this.initializeGlobalSettings({
				game: game,
				pooled: pooled || false,
				context: context || 'main',
				x: x || 1,
				y: y || 1,
				key: key || null,
				width: width,
				height: height
			});

			this.type = "image";
			this.body = new Body(this.game, this);
			this.zIndex = 2;
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
	            this.currentWidth,
	            this.currentHeight
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
				this.currentWidth,
	            this.currentHeight
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

		multiUpdate: function(){
			if(this.previousX !== this.x || this.previousY !== this.y){
				this.game.multiplayer.emit("update obj", {x: this.x, y: this.y, ID: this.ID});
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
        }
	});

	return Image;
})
