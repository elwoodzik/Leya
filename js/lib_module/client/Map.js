define(['Class'], function(my){
   
   var that;

   var Map = my.Class({
        constructor: function(game, context, key, arr, width, height, scalled){
        	var Loader = require('module/Loader');

            that = this;

            this.game = game;
            this.used = true;
            this.key = key;
            this.mapArray = arr;

            this.w = width;
            this.h = height;

            this.zIndex = 1;
        

            this.currentWidth = width;
            this.currentHeight = height;

            this.scalled = scalled;

            this.image = Loader.assetManager.get(this.key); 

            this.lastXScroll = null;
            this.lastYScroll = null;
            
            this.contextType = context;
        },

        generate: function(){
            var ctx = document.createElement("canvas").getContext("2d");        
            ctx.canvas.width = this.b[0].length * 70 ;
            ctx.canvas.height = this.b.length * 70;
         
            for(var i=0; i<this.b.length; i++){
                // 
                for(var j=0; j<this.b[i].length; j++){
                    // 
                    ctx.drawImage(
                        this.image,
                        this.b[i][j].x ,
                        this.b[i][j].y ,
                        this.w,
                        this.h,
                        Math.floor(( j * this.currentWidth) - this.game.camera.xScroll),
                        Math.floor((i * this.currentHeight) - this.game.camera.yScroll),
                        (!this.scalled ? this.currentWidth : Math.ceil(this.game.canvas.width / this.b[i].length)),
                        (!this.scalled ? this.currentHeight : Math.ceil(this.game.canvas.height / this.b.length))
                    ); 
                }
            }
 
            this.imageMap = new Image();
            this.imageMap.src = ctx.canvas.toDataURL("image/png");   
 
            ctx = null;  
         },

        draw: function(dt) {
            
            this.context.drawImage(
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
        },

        createObjOnMap: function(){
            for(var i=0; i<this.b.length; i++){
                // 
                for(var j=0; j<this.b[i].length; j++){
                    if(this.b[i][j].obj){
                        if(this.b[i][j].obj.arr ){
                            
                            if(!this.game.ARR[this.b[i][j].obj.arr]){
                                this.game.ARR[this.b[i][j].obj.arr] = [];
                            }
                            
                            this.b[i][j].obj.marginX = this.b[i][j].obj.marginX ? this.b[i][j].obj.marginX : 0;
                            this.b[i][j].obj.marginY = this.b[i][j].obj.marginY ? this.b[i][j].obj.marginY : 0;
                        
                            this.game.ARR[this.b[i][j].obj.arr].push(new this.b[i][j].obj.type(this.game, this.b[i][j].obj.context , (j*70)+this.b[i][j].obj.marginX, (i*70)+this.b[i][j].obj.marginY, this.b[i][j].obj.image));
                        
                        }else if(this.b[i][j].obj.varr){
                            
                            this.b[i][j].obj.marginX = this.b[i][j].obj.marginX ? this.b[i][j].obj.marginX : 0;
                            this.b[i][j].obj.marginY = this.b[i][j].obj.marginY ? this.b[i][j].obj.marginY : 0;

                            this.game.VAR[this.b[i][j].obj.varr] = new this.b[i][j].obj.type(this.game, this.b[i][j].obj.context , (j*70)+this.b[i][j].obj.marginX, (i*70)+this.b[i][j].obj.marginY, this.b[i][j].obj.image);
                        }
                       
                    }
                }
            }
           
            this.game.sortByIndex();
            
            
        },

       	parse: function(arr){   
			this.b = [];
			this.emptySpaces = [];
			//
			for(var i=0; i<arr.length; i++){
				this.b.push([]);
				for(var j=0; j<arr[i].length; j++){
                    console.log(this.elements[arr[i][j]])
					this.b[i].push(this.elements[arr[i][j]]);

                   
					// Jeśli miejsce jest puste i nie jest to podłoga w lewym górnym rogu (wykluczam trzypozycje) wstaw nowy obiekt z pozycją x i y do tablicy z pustymi miejscami
					// if(this.b[i][j].type=='empty' && !(i==1 && j==1) && !(i==2 && j==1) && !(i==1 && j==2) && !(i==9 && j==13) && !(i==9 && j==12) && !(i==8 && j==13) && !(i==1 && j==12) && !(i==2 && j==13) && !(i==1 && j==13) && !(i==9 && j==1) && !(i==9 && j==2)  && !(i==8 && j==1)){
					// 	this.emptySpaces.push({x:j, y:i});
					// }
				}
			}
            console.log(this.b)

            this.currentWidth  = (!this.scalled ? this.currentWidth : Math.ceil(this.game.canvas.width / this.b[0].length));
            this.currentHeight = (!this.scalled ? this.currentHeight : Math.ceil(this.game.canvas.height / this.b.length));

            this.currentHalfWidth = this.currentWidth / 2;
            this.currentHalfHeight = this.currentHeight / 2;
		},

        setElements: function(elements){
            if(this.checkElements(elements)){
                this.elements = elements;
                this.parse(this.mapArray);
                this.generate();
                this.setContext(this.contextType);
            }
        },

        checkElements:function(elements){
            for(var i in elements){
                if(elements[i].x === undefined){
                    console.error("Musisz podać wlaściwość x dla każdego obiektu");
                    return false;
                }
                else if(elements[i].y === undefined){
                    console.error("Musisz podać wlaściwość y dla każdego obiektu");
                    return false;
                }
                else if(elements[i].type === undefined){
                    console.error("Musisz podać wlaściwość type dla każdego obiektu");
                    return false;
                }
            }
            return true;
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
			}else{
				return console.error("Niepoprawna nazwa Contextu. Dostępne nazwy to: \n1. background \n2. onbackground \n3. main")
			}
        }

    });

    return Map;
})
