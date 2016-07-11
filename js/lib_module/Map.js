define(['Class'], function(my){
    
   var Map = my.Class({
        constructor: function(game, key, arr, width, height){
        	var Loader = require('module/Loader');

        	this.elements = {
				'floor':{sx:33, sy:429, type:'empty', sub_type: 'board'},
				'W':{sx:33, sy:33, type:'solid', sub_type: 'board'},
				'X':{sx:0, sy:528, type:'solid', sub_type: 'board'},
				'box':{sx:126, sy:0, type:'soft', sub_type: 'board', ko_obj : 'Crate'}
			};

            this.game = game;
            this.key = key;
            this.mapArray = arr;
           // this.createCanvas(this.game.canvas.width, this.game.canvas.height, this.game.orientation);
            this.fW = this.game.canvas.width  / 19
            this.fH = this.game.canvas.height  / 11
            this.image = Loader.assetManager.get(this.key); 

            this.lastXScroll = null;
            this.lastYScroll = null;

            
            this.parse(this.mapArray)
            this.game.physic.outOfScreen(this)
         	this.ID = Object.keys(this.game.gameObject).length;
            this.game.gameObject.unshift(this); 
            
            this.game.gameObject.sort(function(obj1, obj2) {
                if(obj1.zIndex > obj2.zIndex)
                    return 1;
                else if(obj1.zIndex < obj2.zIndex) {
                    return -1;
                } else {
                    return 0;
                }
            });
            this.generate();
            //this.draw();
        },

        generate: function(){
            var ctx = document.createElement("canvas").getContext("2d");        
            ctx.canvas.width = this.b[0].length * 32 ;
            ctx.canvas.height = this.b.length * 32;
            console.log(ctx.canvas.width);
            console.log( ctx.canvas.height);
            console.log(this.b[0].length)
            for(var i=0; i<this.b.length; i++){
                // 
                for(var j=0; j<this.b[i].length; j++){
                    // 
                    ctx.drawImage(
                        this.image,
                        this.b[i][j].sx,
                        this.b[i][j].sy,
                        32,
                        32,
                        j*32 ,
                        i*32,
                        32,
                        32
                    ); 
                }
            }

            this.imageMap = new Image();
            this.imageMap.src = ctx.canvas.toDataURL("image/png");   

            ctx = null;      
        },

        draw: function() { 

                //
            this.game.ctx.drawImage(
                this.imageMap,
                this.game.camera.xScroll,
                this.game.camera.yScroll,
                this.game.canvas.width,
                this.game.canvas.height,
                0,
                0,
                this.game.canvas.width,
                this.game.canvas.height
            );
           
   //      	for(var i=0; i<this.b.length; i++){
			// 	// 
			// 	for(var j=0; j<this.b[i].length; j++){
			// 		// 
			// 		this.game.ctx.drawImage(
			// 			this.image,
			// 			this.b[i][j].sx,
			// 			this.b[i][j].sy,
			// 			32,
			// 			32,
			// 			j*this.fW - this.game.camera.xScroll,
			// 			i*this.fH,
			// 			this.fW+2,
			// 			this.fH+1
			// 		);
					
			// 	}
			// }
        },

       	parse: function(arr){   

			this.b = [];
			this.emptySpaces = [];
			//
			for(var i=0; i<arr.length; i++){
				this.b.push([]);
				for(var j=0; j<arr[i].length; j++){
					this.b[i].push(this.elements[arr[i].charAt(j)==' ' ? 'floor' : arr[i].charAt(j)]);
					// Jeśli miejsce jest puste i nie jest to podłoga w lewym górnym rogu (wykluczam trzypozycje) wstaw nowy obiekt z pozycją x i y do tablicy z pustymi miejscami
					if(this.b[i][j].type=='empty' && !(i==1 && j==1) && !(i==2 && j==1) && !(i==1 && j==2) && !(i==9 && j==13) && !(i==9 && j==12) && !(i==8 && j==13) && !(i==1 && j==12) && !(i==2 && j==13) && !(i==1 && j==13) && !(i==9 && j==1) && !(i==9 && j==2)  && !(i==8 && j==1)){
						this.emptySpaces.push({x:j, y:i});
					}
				}
			}
          
			//this.draw();
		},

        createCanvas: function(width, height, orientation){
            var that = this;
            //
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext("2d");
            this.screenWidth = width || 960;
            this.screenHeight = height || 540;
            this.portViewWidth = width;
            this.portViewHeight = height;
            this.orientation = orientation || false;
            
            document.body.style.overflow = 'hidden';
                
            document.body.appendChild(this.canvas);
            this.resizeCanvas(this.canvas, that.orientation);
            
            window.addEventListener("resize", function() {
                that.resizeCanvas(that.canvas, that.orientation);
            }, false);   
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
            if(this.b){
            	this.draw();
            }
            
        },

       
    });

    return Map;
})
