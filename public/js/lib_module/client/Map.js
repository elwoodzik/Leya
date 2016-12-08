define(['Class', 'lib_module/client/_ObjectSettings'], function(my, Settings){
    'use strict';
   
   var that;

   var Map = my.Class(null, Settings, {
        constructor: function(game, context, key, arr, width, height, scalled){

            that = this;

            this.initializeGlobalSettings({
				game: game,
				pooled: false,
				context: context || 'main',
				x: 1,
				y: 1,
				key: key,
				width: width,
				height: height
			});

            this.mapObj = arr;
            this.mapArray = arr.map;

            this.w = width;
            this.h = height;

            this.zIndex = 4;

            this.static = true;

            this.cw = this.game.width;
            this.ch = this.game.height;

            this.scalled = scalled;
         
            this.lastXScroll = null;
            this.lastYScroll = null;
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
                        Math.floor((j * (this.currentWidth) ) - (this.game.camera.xScroll ? this.game.camera.xScroll : 0) ) ,
                        Math.floor((i * (this.currentHeight)) - (this.game.camera.yScroll ? this.game.camera.yScroll : 0) ),
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
                this.camera.xScroll, //Math.floor(this.renderX), // + (this.game.camera.lerpAmount * dt)
                this.camera.yScroll, //Math.floor(this.renderY), // + (this.game.camera.lerpAmount * dt)
                this.cw ,
                this.ch ,
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
                if(obj.pool ){
                    var objCreated = this.game.CLASS[obj.name].pnew(that.game, true, 'main', obj.x + (obj.marginX || 0), obj.y - this.offsetY+ (obj.marginY || 0), obj.image);
                    if(obj.method){
                         for(var j=0; j<obj.method.length; j++){
                            objCreated[obj.method[j].name](obj.method[j].attr[0],obj.method[j].attr[1], obj.method[j].attr[2])
                         }
                    }
                   
                }else if(obj.varr){
                    obj.marginX = obj.marginX ? obj.marginX : 0;
                    obj.marginY = obj.marginY ? obj.marginY : 0;

                    this.game.VAR[obj.varr] = new obj.name(this.game, false, obj.context , obj.x+obj.marginX, obj.y+obj.marginY, obj.image);
                  
                    // if(obj.varr ==='player'){
                    //     that.game.add.toMulti(this.game.VAR[obj.varr]);  
                    // }
                }
            }

            this.camera = this.game.camera;      
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
        }

    });

    return Map;
})
