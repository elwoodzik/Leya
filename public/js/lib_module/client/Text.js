define(['Class', 'lib_module/client/Body', 'lib_module/client/_ObjectSettings'], function(my, Body, Settings){
    
   var Text = my.Class(null, Settings, {
        constructor: function(game, context, text, x, y, size, color, action){
            
            this.initializeGlobalSettings({
				game: game,
				pooled: false,
				context: context || 'main',
				x: x || 1,
				y: y || 1,
				key: null,
				width: 1,
				height: 1
			});

            this.size = size;
            this.color = color;
            this.text = text;
            this.action = action;
            

            this.body = new Body(this.game, this);

            var textSize = this.context.measureText(this.text);
            
            this.currentWidth = textSize.width;
            this.currentHeight = size;
            this.currentHalfWidth = textSize.width / 2;
            this.currentHalfHeight = size / 2;
            this.zIndex = 5;
        },

        update:function(dt){
            this.moveToPointHandler();
            this.doInTimeHandler();
        },

        draw: function() { 
            
            var fontSize = this.size;
            this.context.fillStyle = this.color;
            this.context.font = fontSize + "px Forte";

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

        // destroy: function(array){  
        //     if(Array.isArray(array)){
        //         array.splice(array.indexOf(this), 1);
        //     }else if(typeof array === 'object'){
		// 		array = null;
		// 	}
		// 	if(this.contextType === 'main'){
        //     	return this.game.gameObject.splice(this.game.gameObject.indexOf(this), 1);
		// 	}else if(this.contextType === 'background'){
		// 		var destroyed = this.game.gameObjectStatic.splice(this.game.gameObjectStatic.indexOf(this), 1);
		// 		this.context.clearRect(destroyed[0].x, destroyed[0].y, destroyed[0].currentWidth, destroyed[0].currentHeight);
		// 	}else if(this.contextType === 'onbackground'){
		// 		var destroyed = this.game.gameObjectOnStatic.splice(this.game.gameObjectOnStatic.indexOf(this), 1);
		// 		this.context.clearRect(destroyed[0].x, destroyed[0].y, destroyed[0].currentWidth, destroyed[0].currentHeight);
		// 	}
        // },

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

                if(this.moveTo && (this.myX != this.positionToMoveX && this.myY != this.positionToMoveY) ){
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

        remove: function(count){
            return this.text-=count;
        },

        getText: function(){
            return this.text;
        }
    });

    return Text;
})
