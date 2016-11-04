define(['Class', 'require', 'lib_module/client/Body', 'lib_module/client/_ObjectSettings'], function(my, require, Body, Settings){
	'use strict';
	var Rect = my.Class(null, Settings, {
		constructor: function(game, pooled, context, x, y, width, height, strokeStyle, fillStyle){
			
			this.initializeGlobalSettings({
				game: game,
				pooled: pooled || false,
				context: context || 'main',
				x: x || 1,
				y: y || 1,
				key: null,
				width: width,
				height: height
			});
	
			this.alfa = 1;

			this.body = new Body(this.game, this);
			this.zIndex = 2;

            this.strokeStyle = strokeStyle;
            this.fillStyle = fillStyle;

			this.borderWidth = 1;
		},

		draw: function(lag){
			//this.useRotate();
			if(this.alfa !== 1){
				this.game.ctx.globalAlpha = this.alfa;
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
			this.game.ctx.strokeStyle = this.strokeStyle;
            this.game.ctx.lineWidth = this.borderWidth;
            this.game.ctx.fillStyle = this.fillStyle;
            
			if(this.strokeStyle === null){
				this.game.ctx.fillRect(this.renderX - (!this.static ? this.game.camera.xScroll : 0), this.renderY - (!this.static ? this.game.camera.yScroll : 0), this.currentWidth, this.currentHeight);
			}else if(this.fillStyle === null){
				this.game.ctx.beginPath();
				this.game.ctx.rect(this.renderX - (!this.static ? this.game.camera.xScroll : 0), this.renderY - (!this.static ? this.game.camera.yScroll : 0), this.currentWidth, this.currentHeight);
				this.game.ctx.stroke();
				//this.game.ctx.fill();
				this.game.ctx.closePath();
			}else{
				this.game.ctx.beginPath();
				this.game.ctx.rect(this.renderX - (!this.static ? this.game.camera.xScroll : 0), this.renderY - (!this.static ? this.game.camera.yScroll : 0), this.currentWidth, this.currentHeight);
				this.game.ctx.stroke();
				this.game.ctx.fill();
				this.game.ctx.closePath();
			}
			if(this.alfa !== 1){
				this.game.ctx.globalAlpha = 1;
			}
		},

		update: function(dt){
			this.worldBounce();
			this.x =  Math.floor(this.x  + (dt * this.body.velocity.x));
            this.y =  Math.floor(this.y  + (dt * this.body.velocity.y));
		},

		setBorderWidth: function(width){
			this.borderWidth = width;
		},

		setAlfa: function(alfa){
			this.alfa = alfa;
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
        }
	});

	return Rect;
})
