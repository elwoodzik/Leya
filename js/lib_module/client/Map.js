define(['Class'], function(my){
   
   var that;

   var Map = my.Class({
        constructor: function(game, context, key, arr, width, height, scalled){
        	var Loader = require('module/Loader');

            that = this;

            this.game = game;
            this.used = true;
            this.key = key;

            this.mapObj = arr;
            this.mapArray = arr.map;

            this.w = width;
            this.h = height;

            this.zIndex = 4;

            this.x = 0;
            this.y = 0;

            this.static = true;

            this.cw = this.game.canvas.width;
            this.ch = this.game.canvas.height;
        

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
                        Math.floor((j * (this.currentWidth) )- this.game.camera.xScroll),
                        Math.floor((i * (this.currentHeight)) - this.game.camera.yScroll),
                        (!this.scalled ? this.currentWidth : Math.ceil(this.game.canvas.width / this.b[i].length)),
                        (!this.scalled ? this.currentHeight : Math.ceil(this.game.canvas.height / this.b.length))
                    ); 
                }
            }
 
            this.imageMap = new Image();
            this.imageMap.src = ctx.canvas.toDataURL("image/png");   
 
            ctx = null;  
        },

        // update: function(dt){
        //     // if(this.camera.xScroll !== 0 || this.camera.yScroll !== 0){
        //     //     this.x = ( this.camera.xScroll  + (dt * (this.camera.lerpAmount*2))) ;
        //     //     this.y = ( this.camera.yScroll  + (dt * (this.camera.lerpAmount*2))) ;
        //     // }else{
        //     //     this.x = 0;
        //     //     this.y = 0;
        //     // }
           
        // },

        draw: function(dt) {
            
            // if (this.previousX) { 
            //     this.renderX = (this.previousX + (this.x - this.previousX) * dt);  //this.x + (this.body.velocity.x * dt);
            // } else {
            //     this.renderX = this.x;
            // }
            // if (this.previousY) {
            //     this.renderY = (this.previousY + (this.y - this.previousY) * dt); //this.y + (this.body.velocity.y * dt);
            // } else {
            //     this.renderY = this.y;
            // }
            
            this.context.drawImage(
                this.imageMap,
                this.camera.xScroll, //Math.floor(this.renderX), // + (this.game.camera.lerpAmount * dt)
                this.camera.yScroll, //Math.floor(this.renderY), // + (this.game.camera.lerpAmount * dt)
                this.cw,
                this.ch,
                0,
                0,
                this.cw,
                this.ch
            ); 
        },

        createObjOnMap: function(){
            var obj,
                newObj;
                
            for(var i=0; i<this.objects.length; i++){
                obj = this.objects[i];
                if(obj.arr ){
                    console.log(obj.name)
                    this.game.CLASS[obj.name].pnew(that.game, true, 'main', obj.x + (obj.marginX || 0), obj.y - this.offsetY+ (obj.marginY || 0), 'mapa');
                    //this.game.ARR[obj.arr].push(that.game[obj.pool].get(obj.x + (obj.marginX || 0),obj.y - this.offsetY+ (obj.marginY || 0)));
                    // newObj = this.game.ARR["Tab_"+obj.arr].pop();
                    // newObj.x = obj.x + (obj.marginX || 0);
                    // newObj.y = obj.y + (obj.marginY || 0);
                    // newObj.used = true;

                   // this.game.ARR[obj.arr].push(newObj);
                    // if(!this.game.ARR[obj.arr]){
                    //     this.game.ARR[obj.arr] = [];
                    // }
                    // obj.marginX = obj.marginX ? obj.marginX : 0;
                    // obj.marginY = obj.marginY ? obj.marginY : 0;

                    // this.game.ARR[obj.arr].push(new obj.name(this.game, obj.context , obj.x+obj.marginX, obj.y+obj.marginY, obj.image));
                }else if(obj.varr){
                    obj.marginX = obj.marginX ? obj.marginX : 0;
                    obj.marginY = obj.marginY ? obj.marginY : 0;

                    this.game.VAR[obj.varr] = new obj.name(this.game, false, obj.context , obj.x+obj.marginX, obj.y+obj.marginY, obj.image);
                }
            }

            this.camera = this.game.camera;
            // for(var i=0; i<this.b.length; i++){
            //     // 
            //     for(var j=0; j<this.b[i].length; j++){
            //         if(this.b[i][j].obj){
            //             if(this.b[i][j].obj.arr ){
                            
            //                 if(!this.game.ARR[this.b[i][j].obj.arr]){
            //                     this.game.ARR[this.b[i][j].obj.arr] = [];
            //                 }
                            
            //                 this.b[i][j].obj.marginX = this.b[i][j].obj.marginX ? this.b[i][j].obj.marginX : 0;
            //                 this.b[i][j].obj.marginY = this.b[i][j].obj.marginY ? this.b[i][j].obj.marginY : 0;
                        
            //                 this.game.ARR[this.b[i][j].obj.arr].push(new this.b[i][j].obj.name(this.game, this.b[i][j].obj.context , (j*70)+this.b[i][j].obj.marginX, (i*70)+this.b[i][j].obj.marginY, this.b[i][j].obj.image));
                        
            //             }else if(this.b[i][j].obj.varr){
                            
            //                 this.b[i][j].obj.marginX = this.b[i][j].obj.marginX ? this.b[i][j].obj.marginX : 0;
            //                 this.b[i][j].obj.marginY = this.b[i][j].obj.marginY ? this.b[i][j].obj.marginY : 0;

            //                 this.game.VAR[this.b[i][j].obj.varr] = new this.b[i][j].obj.name(this.game, this.b[i][j].obj.context , (j*70)+this.b[i][j].obj.marginX, (i*70)+this.b[i][j].obj.marginY, this.b[i][j].obj.image);
            //             }
            //         }
            //     }
            // }
           
            this.game.sortByIndex();
        },

       	parse: function(arr){   
			this.b = [];
			this.emptySpaces = [];
           
			//
			for(var i=0; i<arr.length; i++){
				this.b.push([]);
				for(var j=0; j<arr[i].length; j++){
                    var tile = {};
                    tile.x = ((arr[i][j]-1) % 13) * 72;
                    tile.y = (Math.floor((arr[i][j]-1) / 13)) * 72;
                    
                    if(this.tiles[arr[i][j]-1]){
                        tile.type = !this.tiles[arr[i][j]-1].type ? 'empty' : this.tiles[arr[i][j]-1].type;
                    }else{
                        tile.type = 'empty';
                    }
                    
                    
					this.b[i].push(tile);

                   
					// Jeśli miejsce jest puste i nie jest to podłoga w lewym górnym rogu (wykluczam trzypozycje) wstaw nowy obiekt z pozycją x i y do tablicy z pustymi miejscami
					// if(this.b[i][j].name=='empty' && !(i==1 && j==1) && !(i==2 && j==1) && !(i==1 && j==2) && !(i==9 && j==13) && !(i==9 && j==12) && !(i==8 && j==13) && !(i==1 && j==12) && !(i==2 && j==13) && !(i==1 && j==13) && !(i==9 && j==1) && !(i==9 && j==2)  && !(i==8 && j==1)){
					// 	this.emptySpaces.push({x:j, y:i});
					// }
				}
			}
            

            this.currentWidth  = (!this.scalled ? this.currentWidth : Math.ceil(this.cw / this.b[0].length));
            this.currentHeight = (!this.scalled ? this.currentHeight : Math.ceil(this.ch / this.b.length));

            this.currentHalfWidth = this.currentWidth / 2;
            this.currentHalfHeight = this.currentHeight / 2;
		},

        parser: function(arr, w, h){
            this.newTab = [];
            var index = 0;

            for (var i = 0; i < h; i++) {
                this.newTab[i] = [];
                for (var j = 0; j <w; j++) {
                    this.newTab[i][j]=arr[j+index];
                }
                index+=w;
            };

            
        },

        setElements: function(elements){
            
                this.parser(this.mapArray, this.mapObj.w, this.mapObj.h)
                this.tiles = elements.tiles;
                if(this.checkElements(elements.objects)){
                    this.objects = elements.objects;
                }
                this.offsetY = elements.offsety
                this.parse(this.newTab);
                this.generate();
                this.setContext(this.contextType);
            
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
                else if(elements[i].name === undefined){
                    console.error("Musisz podać wlaściwość name dla każdego obiektu");
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
