define(['Class', 'require', 'lib_module/client/Body'], function(my, require, Body){
	
	var Rect = my.Class({
		constructor: function(game, x, y, width, height, strokeStyle, fillStyle){
			
			this.game = game; 
			this.used = true;
			this.x = x || 0; 
			this.y = y || 0; 
		
			this.body = new Body(this);
			this.zIndex = 2;

			this.width = width || this.image.width;
			this.height = height || this.image.height;

			this.currentWidth = this.width;
			this.currentHeight = this.height;
            
            this.strokeStyle = strokeStyle;
            this.fillStyle = fillStyle;

			this.useCollision = true;

	        this.currentHalfWidth = this.currentWidth / 2;
	        this.currentHalfHeight = this.currentHeight / 2;

	        this.isOutOfScreen = false;

			this.gameObjectLength = Object.keys(this.game.gameObject).length;
			this.game.gameObject[this.gameObjectLength] = this; 

		},

		draw: function(lag){
			//this.useRotate();
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
			this.game.ctx.strokeStyle = this.strokeStyle;
            this.game.ctx.lineWidth = 1;
            this.game.ctx.fillStyle = this.fillStyle;
            
			if(this.strokeStyle === null){
				this.game.ctx.fillRect(this.renderX, this.renderY, this.width, this.height);
			}else{
				this.game.ctx.beginPath();
				this.game.ctx.rect(this.renderX, this.renderY, this.width, this.height);
				this.game.ctx.stroke();
				//this.game.ctx.fill();
				this.game.ctx.closePath();
			}
            
		},

		update: function(){
			this.worldBounce();
			this.x += this.body.velocity.x;
	        this.y += this.body.velocity.y;
		},

		 destroy: function(array){
            this.game.gameObject.splice(this.game.gameObject.indexOf(this), 1);
            if(Array.isArray(array)){
                array.splice(array.indexOf(this), 1);
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
		
		// useRotate: function(){
  //            this.body.angle += this.body.angleSpeed; 
  //       }
	});

	return Rect;
})
