define(['Class', 'require', 'lib_module/client/Body'], function(my, require, Body){
    
  var TileSprite = my.Class({
        constructor: function(game, x, y, key, width, height){
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
    
            this.width = this.image.width; 
            this.height = this.image.height; 

            this.currentWidth = this.image.width; 
            this.currentHeight = this.image.height; 

            this.game.physic.outOfScreen(this)

            this.gameObjectLength = Object.keys(this.game.gameObject).length;
            this.game.gameObject[this.gameObjectLength] = this; 

            
        },

        draw: function(){
            for (var w = 0; w < this.game.canvas.width; w += this.image.width) {
                for (var h = 0; h < this.game.canvas.height; h  += this.image.height) {

                    this.game.ctx.drawImage(
                        this.image,
                        0,
                        0,
                        this.width,
                        this.height,
                        w+this.x - this.game.camera.xScroll, // * this.scale
                        h - this.game.camera.yScroll, // * this.scale
                        this.width,
                        this.height
                    );

                    this.game.ctx.drawImage(
                        this.image,
                        0,
                        0,
                        this.width,
                        this.height,
                        w+this.x - this.game.canvas.width- this.game.camera.xScroll, // * this.scale
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

            if (this.x < 0){
                this.x =  this.game.canvas.width+this.x+this.velocity.x
            }else if(this.x >  this.game.canvas.width){
                this.x = 0 - this.velocity.x;
            }   
        }
    });

    return TileSprite;
});
