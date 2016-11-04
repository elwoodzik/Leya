define(['Class', 'require', 'lib_module/client/Body', 'lib_module/client/_ObjectSettings'], function(my, require, Body, Settings){
    'use strict';
    var TileSprite = my.Class(null, Settings, {
        constructor: function(game, pooled, context, x, y, key, width, height){
            
            this.initializeGlobalSettings({
				game: game,
				pooled: pooled || false,
				context: context || 'main',
				x: x || 1,
				y: y || 1,
				key: key,
				width: width,
				height: height
			});
           
            this.velocity = {
                x:0,
                y:0
            };

            
            this.zIndex = 1;
            
            // MOZLIWE ZE BEDZIE BLAD WROC DO TEGO
            // this.width =  width || this.image.width;
            // this.height = height || this.image.height;
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
                        this.currentWidth,
                        this.currentHeight
                    );

                    this.game.ctx.drawImage(
                        this.image,
                        0,
                        0,
                        this.image.width,
	                    this.image.height,
                        w + this.x + this.width - this.game.camera.xScroll, // * this.scale
                        h - this.y - this.game.camera.yScroll, // * this.scale
                        this.currentWidth,
                        this.currentHeight
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
