define(['Class', 'lib_module/client/_ObjectSettings'], function(my, Settings){
   'use strict';
   var that;

   var ButtonImg = my.Class(null, Settings, {

        constructor: function(game,pooled, context, key, keyHover, x, y, width, height, action){
           
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
            //
            this.keyHover = keyHover === null ? this.key : keyHover;

            this.action = action;
            this.zIndex = 5;
        },

        update: function() {
            var wasNotClicked = this.game.mouse.click;
            
            if (this.game.mouse.updateStats(this) && wasNotClicked && typeof this.action === 'function') {
                this.game.mouse.click = false;
                
                this.action.call(this.game, this);
            }
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
	            this.currentWidth,
	            this.currentHeight
	        )
        }
    })

    return ButtonImg;
})