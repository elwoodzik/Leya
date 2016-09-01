define(['Class'], function(my){
    
   var Text = my.Class({
        constructor: function(game, context, text, x, y, size, color, action){
            this.game = game;
            //
            this.used = true;
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.text = text;
            this.action = action;
            this.currentWidth = size
            this.currentHeight = size
            this.zIndex = 5;
            

            this.contextType = 'main';
            //
            //this.game.physic.outOfScreen(this);
            this.setContext(context);
           
        },

        draw: function() { 
            
            var fontSize = this.size;
            this.context.fillStyle = this.color;
            this.context.font = fontSize + "px Forte";
    
            var textSize = this.context.measureText(this.text);
            this.currentWidth = textSize.width;
            var textX = this.x;
            var textY = this.y;
           
            this.context.fillText(this.text, textX, textY);
        },

        redraw: function() { 
            
            var fontSize = this.size;
            this.context.fillStyle = this.color;
            this.context.font = fontSize + "px Sans";
    
            var textSize = this.context.measureText(this.text);
            this.currentWidth = textSize.width;
            var textX = this.x;
            var textY = this.y;
           
            this.context.fillText(this.text, textX, textY);
        },

        add: function(count){
            this.text+=count;
            //this.context.clearRect(this.x, this.y-this.currentHeight,  this.currentWidth, this.currentHeight)
            //this.draw();
        },

        rem: function(count){
            this.text-=count;
            //this.context.clearRect(this.x, this.y-this.currentHeight,  this.currentWidth, this.currentHeight)
            //this.draw();
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
				this.draw(); 
			}
			else if(context === 'onbackground'){
				this.context = this.game.onbgctx;
				this.contextType = context;
				this.gameObjectOnStaticLength = this.game.gameObjectOnStatic.length;
				this.game.gameObjectOnStatic[this.gameObjectOnStaticLength] = this; 
				this.draw();
			}
        },


        remove: function(count){
            return this.text-=count;
        },

        getText: function(){
            return this.text;
        }
    });

    return Text;
})
