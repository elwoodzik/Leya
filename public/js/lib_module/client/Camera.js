define([
    'Class',
    'lib_module/client/Rectangle',
    'lib_module/client/_ObjectSettings'
],
    
function(my, Rectangle, Settings){
    
    var Camera = my.Class(null, Settings, {

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

            this.type = 'CAMERA'

            this.static = true;

            this.xScroll = xView || 0;
            this.yScroll = yView || 0;

            // distance from followed object to border before camera starts move
            this.xDeadZone = 0; // min distance to horizontal borders
            this.yDeadZone = 0; // min distance to vertical borders

            // viewport dimensions
            this.wView = canvasWidth;
            this.hView = canvasHeight;	
            
            // allow camera to move in vertical and horizontal axis
            this.axis = Camera.AXIS.BOTH;	

            // object that should be followed
            this.followed = null;

            // rectangle that represents the viewport
            this.viewportRect = new Rectangle(this.xScroll, this.yScroll, this.wView, this.hView);				
                            
            // rectangle that represents the world's boundary (room's boundary)
            this.worldRect = new Rectangle(0, 0, worldWidth, worldHeight);

            this.contextType = 'main';
            this.pooled = false;
          
            if(!this.pooled){
                this.setContext(this.contextType);
            } 
        },

        update: function(dt){
            this.moveToPointHandler();
            if(this.followed != null){		
				if(this.axis === Camera.AXIS.HORIZONTAL || this.axis === Camera.AXIS.BOTH){		
					// moves camera on horizontal axis based on followed object position
					if(this.followed.renderX - this.xScroll  + this.xDeadZone  > this.wView)
						this.xScroll = this.followed.renderX - (this.wView - this.xDeadZone);
					else if(this.followed.renderX  - this.xDeadZone < this.xScroll)
						this.xScroll = this.followed.renderX  - this.xDeadZone;
				}

				if(this.axis === Camera.AXIS.VERTICAL || this.axis === Camera.AXIS.BOTH){
					// moves camera on vertical axis based on followed object position
					if(this.followed.renderY - this.yScroll + this.yDeadZone > this.hView)
						this.yScroll = this.followed.renderY - (this.hView - this.yDeadZone);
					else if(this.followed.renderY - this.yDeadZone < this.yScroll)
						this.yScroll = this.followed.renderY - this.yDeadZone;
				}
            }
           
             this.viewportRect.set(this.xScroll, this.yScroll);						

            if(!this.viewportRect.within(this.worldRect)){
                
                if(this.viewportRect.left < this.worldRect.left)
                    this.xScroll = this.worldRect.left;
                // if(this.viewportRect.top < this.worldRect.top)					
                //     this.yScroll = this.worldRect.top;
                if(this.xScroll >= this.game.portViewWidth-this.game.width )
                    this.xScroll = this.game.portViewWidth-this.game.width
                if( this.yScroll < 0)					
                    this.yScroll =  0;
                if( this.yScroll > this.game.portViewHeight-this.game.height)					
                    this.yScroll =  this.game.portViewHeight-this.game.height;
               
            }	
            this.game.physic.outOfScreen(this.game.gameObject )
        },

        follow: function(gameObject, xDeadZone, yDeadZone){		
			this.followed = gameObject;	
			this.xDeadZone = xDeadZone;
			this.yDeadZone = yDeadZone;
		},

        moveToPoint: function(x, y, speed, callback){
            //if(!this.moveTo){
                this.positionToMoveX = Math.floor(x);
                this.positionToMoveY = Math.floor(y)  ;
                this.positionSpeed = speed;
                this.followed = null;
                this.moveTo = true;
                
                this.positionCallback = callback;
            //}
        },	
        moveToPointHandler: function(){
            if(this.moveTo){
                
                this.myX = Math.floor(this.xScroll + this.wView / 2);
                this.myY = Math.floor(this.yScroll + this.hView / 2 );
                
                if(this.moveTo && (this.myX != this.positionToMoveX || this.myY != this.positionToMoveY) ){
                    this.xScroll -= (((this.myX - this.positionToMoveX) / this.positionSpeed));  
                    this.yScroll -= (((this.myY - this.positionToMoveY) / this.positionSpeed));
                }else if(this.moveTo ){
        
                    this.xScroll = Math.floor(this.xScroll)
                    this.yScroll = Math.floor(this.yScroll) 
                    this.moveTo = false;
					
                    if(typeof this.positionCallback === 'function'){
                        this.positionCallback.call(this.game, this);
                    }
                }

                if(!this.viewportRect.within(this.worldRect)){
                //console.log(this.xScroll)
                    if(this.xScroll <= 0)
                        this.positionToMoveX = this.myX
                    // if(this.viewportRect.top < this.worldRect.top)					
                    //     this.yScroll = this.worldRect.top;
                    // if(this.xScroll >= this.game.portViewWidth-this.game.width )
                    //      this.positionToMoveX = this.myX
                    if( this.yScroll < 0)					
                        this.positionToMoveY = this.myY
                    if( this.yScroll > this.game.portViewHeight-this.game.height)					
                        this.positionToMoveY = this.myY
                
                }
            }
            
        },		
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

 