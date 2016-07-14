define(['Class', 'require'], function(my, require){
	
	var Bar = my.Class({
		constructor: function(game, x, y, width, height, strokeStyle, fillStyle, min, max){
			
			this.game = game; 
			this.used = true;
			this.x = x || 1; 
			this.y = y || 1;

			this.max = max;
			this.min = min > this.max ? this.error() : min;
			
			this.currentStatusX = this.min;
			
			this.statusX = this.currentStatusX / this.max * width;
		
			this.zIndex = 4;

			this.width = width || this.image.width;
			this.height = height || this.image.height;

			this.lineWidth = 1;

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
         	
         	this.game.ctx.fillStyle = this.fillStyle;

	        if(this.strokeStyle){
	        	this.game.ctx.beginPath();
				this.game.ctx.strokeStyle = this.strokeStyle;
	            this.game.ctx.lineWidth = this.lineWidth;
	           
				this.game.ctx.rect(this.renderX, this.renderY, this.width, this.height);
				this.game.ctx.stroke();
				//this.game.ctx.fill();
				this.game.ctx.closePath();
	        }
	        
	       	if(this.fillStyle){
				this.game.ctx.fillRect(this.renderX+this.lineWidth, this.renderY+this.lineWidth, this.statusX-this.lineWidth*2, this.height-this.lineWidth*2);
			}
		},

		setStatusX: function(statusX){
			this.statusX = statusX / this.max * this.width;
		},

		error: function(){
			throw "BAR --> Minimalna wartosc nie moze byc wieksza od maksymalnej";
		},

		update: function(){

		},

		 destroy: function(array){
            this.game.gameObject.splice(this.game.gameObject.indexOf(this), 1);
            if(Array.isArray(array)){
                array.splice(array.indexOf(this), 1);
            }
        },
		
		
	});

	return Bar;
})
