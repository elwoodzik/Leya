define(['Class'], function(my){
    
    var Mouse = my.Class({

        constructor: function(game){
            this.game = game;
            //
            this.click = false;
            this.hover = false;
            this.down = false;
            this.trig = false;
            this.mouseX = null;
            this.mouseY = null;
        },

        initialize: function(){
            var that = this;

            window.document.addEventListener("mousemove", function(e){that.mouseMove(e)});
            window.document.addEventListener("mousedown", function(e){that.mouseDown(e)});
            window.document.addEventListener("touchstart", function(e){that.touchDown(e)});
            window.document.addEventListener("touchmove", function(e){that.touchMove(e)});
            window.document.addEventListener("touchend", function(e){that.mouseUp(e)});
            window.document.addEventListener("mouseup", function(e){that.mouseUp(e)});
        },

        mouseMove: function(e){ 
            e.preventDefault();
            //
            this.mouseX = e.offsetX  / this.game.scale1 + this.game.camera.xScroll;
            this.mouseY = e.offsetY  / this.game.scale1 + this.game.camera.yScroll;

            
            //
            //this.click = (e.which == 1 && !this.down);
            //this.down = (e.which == 1);
        },

        touchDown: function(e){
            //
            this.mouseX = (e.touches[0].clientX - this.game.canvas.offsetLeft)  / this.game.scale1 + this.game.camera.xScroll;
            this.mouseY = e.touches[0].clientY / this.game.scale1 + this.game.camera.yScroll;

            this.click = !this.down;
            this.down = true;
            this.trig = false;
        },

        touchMove: function(e){ 
            //e.preventDefault();
            //
            this.mouseX = (e.touches[0].clientX - this.game.canvas.offsetLeft)  / this.game.scale1 + this.game.camera.xScroll;
            this.mouseY = e.touches[0].clientY / this.game.scale1 + this.game.camera.yScroll;
            //
            //this.click = (e.which == 1 && !this.down);
            //this.down = (e.which == 1);
        },

        mouseDown: function(e){
            e.preventDefault();
            //
            this.click = !this.down;
            this.down = true;
            this.trig = false;
  
        },

        mouseUp: function(e){
            e.preventDefault();
            //
            this.down = false;
            this.click = false;
            
        },
        
        

        intersects: function(obj, static) {
            var t = 2; //tolerance
            var tempMouseY = this.mouseY;
            var tempMouseX = this.mouseX;
          
            if(static){
                tempMouseX = tempMouseX - (this.game.camera.xScroll);
                tempMouseY = tempMouseY   - (this.game.camera.yScroll);
            }
            

            var xIntersect = (tempMouseX + t) >= obj.x && (tempMouseX + t) <= obj.x + obj.currentWidth;
            var yIntersect = (tempMouseY + t) >= obj.y && (tempMouseY - t) <= obj.y + obj.currentHeight;
          
            return  xIntersect && yIntersect ;
        },

        intersectsSprite: function(obj, static) {

            var t = 2; //tolerance
           
            var xIntersect = (this.mouseX + t) >= obj.x && (this.mouseX + t) <= obj.x + obj.states[obj.state].fW;
            var yIntersect = (this.mouseY + t) >= obj.y && (this.mouseY - t) <= obj.y + obj.states[obj.state].fH;

            return  xIntersect && yIntersect ;
        },
        
        updateHoverStats: function(obj){
	        if (this.intersects(obj)) {
	            return true;
	        } else {
	            obj.hovered = false;
	        }            
	    },

        updateStats: function(obj,static, hold){
           
            if (this.intersects(obj, static)) {
                
                obj.hovered = true;
                
                if(this.click){ 
                    return true;
                }
            } else {
                obj.hovered = false;
                return false;
            }
            
            //
            // if (!this.game.mouse.down) {
            //     this.click = false;
            // }               
        },

        // updateSpriteStats: function(obj){
        //     var wasNotClicked = !this.game.mouse.click;

        //     if (this.intersectsSprite(obj, this.game.mouse)) {
        //         this.hovered = true;
        //         if (this.game.mouse.click) {
        //             this.click = true;
        //         }
        //         if (this.click && wasNotClicked) {
        //             this.click = false;
        //             return true;
        //         }
        //     } else {
        //         this.hovered = false;
        //     }
        //     //
        //     if (!this.game.mouse.down) {
        //         this.click = false;
        //     }               
        // },

        trigger: function(obj, static, callback, hold){
            var wasNotClicked = this.click;
            
            if(wasNotClicked ){
                if(!this.trig){
                   
                    this.trig = hold ? true : false;

                    if(Array.isArray(obj)){
                        for(u=obj.length-1; u>=0; u--){
                            if(this.updateStats(obj[u],static, hold) ){
                                return callback.call(this, obj[u]);
                            }
                        }
                        this.trig = false;
                    }
                    else if(typeof obj === 'object' && obj != null){
                        if(this.updateStats(obj, static, hold)){
                            
                            return callback.call(this, obj);
                        }
                        this.trig = false; 
                    }
                    else if(obj === null){
                       
                        if(typeof callback === 'function'){
                            this.click = false;
                            this.trig = false;
                            this.down = false;
                            return callback.call(this);
                        }   
                    }
                }
            }
        },
        
        onHover: function(obj, callback, hold){
	    	//var wasNotClicked = this.click;
	    	
			if(Array.isArray(obj)){
				for(u=0, uMax=obj.length; u<uMax; u++){
					if(this.updateHoverStats(obj[u], hold) ){
						return callback.call(this, obj[u]);
					}
				}
			}
			else if(typeof obj === 'object' && obj != null){
				if(this.updateHoverStats(obj, hold)){
					return callback.call(this, obj);
				}
			}
			else if(obj === null){
				if(typeof callback === 'function'){
					
					return callback.call(this);
				}	
			}
	    }
    })

   return Mouse;
})
