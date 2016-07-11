window.Leya;
'use strict';

(function(){
	var Leya = my.Class({
		
		constructor: function(){
 			
		},

		initialize:function(callback){
			if(typeof callback === 'function'){

				var callback = callback.bind(this);
				callback();
			}else{
				return;
			}
		}
		
	});

	window.Leya = new Leya();
})();


(function(){
	var i,
		iMax,
		u,
		uMax,
		entityRender,
		entityUpdate,
		currentTime = 0;


	var Game = my.Class({
		
		constructor: function(width, height, orientation){
		  	var that = this;
		  	//
		  	this.add = new Leya.GameObjectFactory(this);
			//
		  	//this.inputMouse = new Leya.Mouse(this);
		  	//
		  	this.keyboard = new Leya.Keyboard(this);

		  	this.mouse = new Leya.Mouse(this);
		  	//
		  	this.sound = new Leya.assetManager();
		  	//
		  	this.state = new Leya.GameStateFactory(this);
		  	//
		  	this.world = new Leya.World(this);
		  	//
		  	this.physic = new Leya.Physic(this);
		  	//
		  	this.states = {};
		  	//
		  	this.camera = {
		  		xScroll : 0,
				yScroll : 0
		  	};
		  	//
		  	this.gameObject = [];
		  	//
		  
		  	this.cTime = 0;

		  	// game loop vars;
		  	this.PREVIOUS = 0;
		  	this.fps = 60;
		  	this.FRAMEDURATION = 1000/this.fps;
		  	this.LAG = 0;
		  	this.loop = null;
		  	//
		  	// mouse object
		  	
  	 	 	
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext("2d");
            this.screenWidth = width;
            this.screenHeight = height;
            this.portViewWidth = width;
            this.portViewHeight = height;
            this.orientation = orientation || false;

           
            document.body.style.overflow = 'hidden';
                
            document.body.appendChild(this.canvas);
            this.resizeCanvas(this.canvas, that.orientation);
            
          
            window.addEventListener("resize", function() {
                that.resizeCanvas(that.canvas, that.orientation);
            }, false);
            
            this.animationLoop();
		},

		clearCanvas: function() {
            this.ctx.clearRect(0, 0,  this.canvas.width, this.canvas.height);
        },

        rand: function(min,max){
            return Math.floor(Math.random()*(max-min+1))+min;
        },

        saveData: function(name, data) {
			localStorage.setItem(name, JSON.stringify(data));
		},

		loadData: function(name) {
			var data = localStorage.getItem(name);
			//
			if(data){
				return JSON.parse(data);
			}
			else{
				return false;
			}
		},

        resizeCanvas: function(canvas, orientation) {
        	if(!orientation){
        		var w = window.innerWidth;
	            var h =  window.innerHeight;
	           
	            canvas.width = ((this.screenWidth));
	            canvas.height = ((this.screenHeight));
	            this.portViewWidth = this.portViewWidth;
            	this.portViewHeight = this.portViewHeight;

	            this.scale1 = Math.max(0.2,Math.min(
	          		(w/this.screenWidth), 
	          		(h/this.screenHeight)
	            ));

	            var width = Math.floor(this.screenWidth * this.scale1);
	            var height = Math.floor(this.screenHeight * this.scale1);
	       
	            canvas.style.width = width + "px";
	            canvas.style.height = height + "px";
        	}else{
        		var w = window.innerHeight; 
	            var h =  window.innerWidth;
	           
	            canvas.width = this.screenHeight//((screenWidth));
	            canvas.height = this.screenWidth//((screenHeight));
	            this.portViewWidth = this.portViewHeight;
            	this.portViewHeight = this.portViewWidth;

	            this.scale1 = Math.max(0.2,Math.min(
	          		(w/this.screenWidth), 
	          		(h/this.screenHeight)
	            ));

	            var width = Math.floor(this.screenWidth * this.scale1);
	            var height = Math.floor(this.screenHeight * this.scale1);
	       
	            canvas.style.width = height  + "px";
	            canvas.style.height = width + "px";
        	}
        },

	 	animationLoop : function(timestamp) {
           
            if (!timestamp) {
                timestamp = 0;
            } 
           
           	requestAnimationFrame( this.animationLoop.bind(this) );
        	
            var elapsed = timestamp - this.PREVIOUS;
            
            if (elapsed > 1000 || elapsed < 0) {
                elapsed = this.FRAMEDURATION;
                this.LAG = 0;
            }
            //Add the elapsed time to the lag counter
           // console.log(timestamp)
            this.LAG += elapsed;
            
            //Update the frame if the lag counter is greater than or
            //equal to the frame duration
            while (this.LAG >= this.FRAMEDURATION) {  
                this.capturePreviousPositions(this.gameObject);
             	this.cTime += this.FRAMEDURATION;
                this.update(this.cTime);
                this.LAG -= this.FRAMEDURATION;
            }

            var lagOffset = this.LAG / this.FRAMEDURATION;
            
            
            this.render(lagOffset);
           	
            var actualFps = Math.floor(1000 / elapsed);

            this.ctx.fillStyle = "red";
            this.ctx.font = 16 + "px Arial";
         	this.ctx.fillText(actualFps, this.canvas.width- 50, this.canvas.height- 50);
            
            this.PREVIOUS = timestamp;
          
        },

        update: function(time){
        	if(this.currentState && typeof this.currentState.update === 'function'){
        		this.currentState.update.apply(Leya, arguments);
        	}
        	
        	for(u=0, uMax=this.gameObject.length; u<uMax; u++){
                entityUpdate = this.gameObject[u];
                if(entityUpdate && entityUpdate.update){
                	//if(!entityUpdate.isOutOfScreen){
           					
                    	entityUpdate.update(time);
                    //}
                }
            } 
        },

       	render: function(lagOffset){
            this.clearCanvas();
         
            for(i=0, iMax=this.gameObject.length; i<iMax; i++){
                entityRender = this.gameObject[i];
                if(entityRender){
                	if(!entityRender.isOutOfScreen){
                		
                		this.ctx.save();
                		if(entityRender.body){
                			
                			this.ctx.translate(entityRender.x, entityRender.y)
                			this.ctx.rotate( entityRender.body.angle*Math.PI/180 ); 
                			this.ctx.translate(-entityRender.x, -entityRender.y)
                		}
                	
                		entityRender.draw(lagOffset);
                		this.ctx.restore();
                	}
                }
            } 
             
        },
     	capturePreviousPositions: function(entities){
            for(u=0, uMax=entities.length; u<uMax; u++){
                var entity = entities[u];
                entity.previousX = entity.x;
                entity.previousY = entity.y;
            }
        },

        set_clear: function(arr) {
	  		arr.length = 0;  

		},

        set_copy: function(arr, source) {
        	var old = arr;
        	var newly = source.slice();

	  		this.set_clear(old);
	  		
	  		for(var n = 0, max = newly.length ; n < max ; n++){
	  			arr.push(newly[n]);
	  		}
		},

		set_remove: function(arr, entity){
			arr.splice(arr.indexOf(entity), 1);
		},

        bootMouse: function(){

			this.mouse.initialize();
			//
			// this.canvas.addEventListener("mousemove", function(e){that.mouseMove(e)});
			// this.canvas.addEventListener("mousedown", function(e){that.mouseDown(e)});
			// this.canvas.addEventListener("touchstart", function(e){that.touchDown(e)});
			// this.canvas.addEventListener("touchend", function(e){that.mouseUp(e)});
			// this.canvas.addEventListener("mouseup", function(e){that.mouseUp(e)});
		},

		// mouseMove: function(e){	
		//  	e.preventDefault();
		//  	//
		// 	this.mouse.x = e.offsetX / this.scale1;
  //       	this.mouse.y = e.offsetY / this.scale1;
  //       	//
  //   		this.mouse.clicked = (e.which == 1 && !this.mouse.down);
  //  		 	this.mouse.down = (e.which == 1);
		// },

		// touchDown: function(e){
		// 	e.preventDefault();
		// 	//
		// 	this.mouse.x = e.touches[0].clientX / this.scale1;
  //       	this.mouse.y = e.touches[0].clientY / this.scale1;

		// 	this.mouse.clicked = !this.mouse.down;
  //       	this.mouse.down = true;
		// },

		// mouseDown: function(e){
		// 	e.preventDefault();
		// 	//
		// 	this.mouse.clicked = !this.mouse.down;
  //       	this.mouse.down = true;
		// },

		// mouseUp: function(e){
		// 	e.preventDefault();
		// 	//
		// 	this.mouse.down = false;
  //       	this.mouse.clicked = false;
		// },

		bootKeyboard: function(){
			this.keyboard.initialize();
		}
	});

	Leya.Game = Game;
})();



(function(){
	var Camera = my.Class( {
		
		constructor: function(game, player){
			this.game = game;

			this.player = player;

			this.oldPlayerX = this.player.x+ this.player.currentWidth/2
			this.oldPlayerY = this.player.y+ this.player.currentHeight/2

			this.x = this.game.canvas.width * 0.5;
    		this.y = this.game.canvas.height * 0.5;

			this.xScroll = 0;
		    this.yScroll = 0;

		    this.position = [this.xScroll, this.yScroll];
		    this.prevPosition = [this.xScroll, this.yScroll];
		    this.curPosition = [this.xScroll, this.yScroll];

		    this.lerpAmount = 1.0; 

		    this.game.gameObjectLength = Object.keys(this.game.gameObject).length;
			this.game.gameObject[this.game.gameObjectLength] = this; 
		},

		draw: function(){

		},

		lerp: function(A, B, t){
		    return Math.floor((A * t) + ((1.0 - t) * B));
		},

		update: function(dt){
			if(this.player.x != this.oldPlayerX || this.player.y != this.oldPlayerY){

				this.oldPlayerX = this.player.x;
				this.oldPlayerY = this.player.y;
				 // Get the distance from the player to the middle of the screen (our focal point)  
			    this.dx = (this.player.x+ this.player.currentWidth/2 - this.x);
			    this.dy = (this.player.y+ this.player.currentHeight/2 - this.y);
			    // The camera is moving 
			    this.position = [this.xScroll, this.yScroll];
			    //console.log(this.position + " "+ this.curPosition)
			    if(this.position != this.curPosition){
			        this.lerpAmount = 0.0;
			        this.curPosition = this.position;
			    }
			    // increase the speed of the camera if we are not at full camera speed
			    if(this.lerpAmount < 1.0){
			        this.lerpAmount += 0.05;
			    } else {
			        this.prevPosition = this.curPosition;
			    }
			    // Interpolate the  current position on the x-axis
			    this.xScroll = this.lerp(this.dx, this.curPosition[0], this.lerpAmount); 
			    // Interpolate the current position on the y-axis
			    
			    this.yScroll = this.lerp(this.dy, this.curPosition[1], this.lerpAmount); 
			    if(this.yScroll <= 0 ){
			    	this.yScroll = 0;
			    }
			    if(this.xScroll <= 0 ){
			    	this.xScroll = 0;
			    }
		     	if(this.xScroll >= this.game.portViewWidth-this.game.canvas.width ){
			    	this.xScroll = this.game.portViewWidth-this.game.canvas.width
			    }

			    if(this.yScroll >= this.game.portViewHeight-this.game.canvas.height ){
			    	this.yScroll = this.game.portViewHeight-this.game.canvas.height
			    }
			    this.game.physic.outOfScreen(this.game.gameObject)
			}
		   
		}
	  	
	});

	Leya.Camera = Camera;
})();













	






	







// var game = new Leya.Game(window.innerWidth, window.innerHeight);
// var im = game.add.image();
// 

