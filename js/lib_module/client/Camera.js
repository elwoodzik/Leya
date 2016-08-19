define([
    'Class',
    'lib_module/client/Rectangle'
],
    
function(my, Rectangle){
    
    var Camera = my.Class( {

        STATIC: {
            AXIS: {
                NONE: "none", 
                HORIZONTAL: "horizontal", 
                VERTICAL: "vertical", 
                BOTH: "both"
            }
        },

        constructor: function(game, xView, yView, canvasWidth, canvasHeight, worldWidth, worldHeight){
            this.game = game;
            
            this.used = true;

            this.static = true;

            this.xView = xView || 0;
            this.yView = yView || 0;

            // distance from followed object to border before camera starts move
            this.xDeadZone = 0; // min distance to horizontal borders
            this.yDeadZone = 0; // min distance to vertical borders

            // viewport dimensions
            this.wView = canvasWidth;
            this.hView = canvasHeight;	
            
            this.xScroll = 0;
            this.yScroll = 0;		

            // allow camera to move in vertical and horizontal axis
            this.axis = Camera.AXIS.BOTH;	

            // object that should be followed
            this.followed = null;

            // rectangle that represents the viewport
            this.viewportRect = new Rectangle(this.xView, this.yView, this.wView, this.hView);				
                            
            // rectangle that represents the world's boundary (room's boundary)
            this.worldRect = new Rectangle(0, 0, worldWidth, worldHeight);

            this.contextType = 'main';

            this.game.gameObjectLength = Object.keys(this.game.gameObject).length;
            this.game.gameObject[this.game.gameObjectLength] = this; 
        },

        update: function(){
          
            if(this.followed != null){		
				if(this.axis === Camera.AXIS.HORIZONTAL || this.axis === Camera.AXIS.BOTH){		
					// moves camera on horizontal axis based on followed object position
					if(this.followed.x - this.xView  + this.xDeadZone > this.wView)
						this.xView = this.followed.x - (this.wView - this.xDeadZone);
					else if(this.followed.x  - this.xDeadZone < this.xView)
						this.xView = this.followed.x  - this.xDeadZone;
				}

				if(this.axis === Camera.AXIS.VERTICAL || this.axis === Camera.AXIS.BOTH){
					// moves camera on vertical axis based on followed object position
					if(this.followed.y - this.yView + this.yDeadZone > this.hView)
						this.yView = this.followed.y - (this.hView - this.yDeadZone);
					else if(this.followed.y - this.yDeadZone < this.yView)
						this.yView = this.followed.y - this.yDeadZone;
				}
            }
           
             this.viewportRect.set(this.xView, this.yView);						

            if(!this.viewportRect.within(this.worldRect)){
                
                if(this.viewportRect.left < this.worldRect.left)
                    this.xView = this.worldRect.left;
                // if(this.viewportRect.top < this.worldRect.top)					
                //     this.yView = this.worldRect.top;
                if(this.xView >= this.game.portViewWidth-this.game.width )
                    this.xView = this.game.portViewWidth-this.game.width
                if( this.yView < 0)					
                    this.yView =  0;
                if( this.yView > this.game.portViewHeight-this.game.height)					
                    this.yView =  this.game.portViewHeight-this.game.height;
               
            }	
        },

        follow: function(gameObject, xDeadZone, yDeadZone){		
			this.followed = gameObject;	
			this.xDeadZone = xDeadZone;
			this.yDeadZone = yDeadZone;
		}					
     })

    return Camera;
});















//   var Camera = my.Class( {
        
//         constructor: function(game, player){
//             this.game = game;
//             this.used = true;

//             this.player = player;
//             this.physic = this.game.physic;

//             this.oldPlayerX = this.player.x 
//             this.oldPlayerY = this.player.y 

//             this.x = this.game.width * 0.5;
//             this.y = this.game.height * 0.5;

//             this.xScroll = 0;
//             this.yScroll = 0;

//             this.zIndex = 1;

//             this.position = [this.xScroll, this.yScroll];
//             this.prevPosition = [this.xScroll, this.yScroll];
//             this.curPosition = [this.xScroll, this.yScroll];

//             this.lerpAmount = 1.0; 

//             this.contextType = 'main';

//             this.game.gameObjectLength = Object.keys(this.game.gameObject).length;
//             this.game.gameObject[this.game.gameObjectLength] = this; 
//         },

        

//         lerp: function(A, B, t){
//             return ((A * t) + ((1 - t) * B));
//         },

//         update: function(dt){
         
//             if(this.player.body.velocity.x !== 0 || this.player.body.velocity.y !== 0){
//                 this.dx = (this.player.x + this.player.currentWidth/8 - this.x);
//                 this.dy = (this.player.y + this.player.currentHeight/2 - this.y);
            
//                 this.position[0] = this.xScroll; 
//                 this.position[1] = this.yScroll;
               
//                 if(this.position[0] != this.curPosition[0] || this.position[1] != this.curPosition[1] || this.lerpAmount < 0.1){
//                     this.lerpAmount = 0;
//                     this.curPosition[0] = this.position[0];
//                     this.curPosition[1] = this.position[1];
                      
//                     this.physic.outOfScreen(this.game.gameObject)
//                 }
                
//                 if(this.lerpAmount < 1){
//                     this.lerpAmount += 0.2;
//                 } else {
//                     this.prevPosition = this.curPosition;
//                 }
            
//                 this.xScroll = this.lerp(this.dx, this.curPosition[0], this.lerpAmount); 
//                 this.yScroll = this.lerp(this.dy, this.curPosition[1], this.lerpAmount); 
                
//                 if(this.yScroll <= 0 ){
//                     this.yScroll = 0;
//                 }
//                 if(this.xScroll <= 0 ){
//                     this.xScroll = 0;
//                 }
//                 if(this.xScroll >= this.game.portViewWidth-this.game.width ){
//                     this.xScroll = this.game.portViewWidth-this.game.width
//                 }

//                 if(this.yScroll >= this.game.portViewHeight-this.game.height ){
//                     this.yScroll = this.game.portViewHeight-this.game.height
//                 }
//             }
//             //
//         }
       
//     });

 