define([
	'Class',
    'module/Objects/Player',
    'module/Objects/Exit',
    'module/Objects/Ufo',
    'module/maps/switchFunctions'
], function(my, Player, Exit, Ufo, switchFunctions){
	var that;

    switchFunctions = switchFunctions.init();
   
   
    //  var switchFunctions = {
    //     lvl1:  [
    //         {
    //             actOn: 'exit',
    //             callbackIn: function(){
    //                 if(this.game.VAR[this.actOn]){ 
    //                     this.game.VAR[this.actOn].x = 30; 
    //                 }
    //             },
    //             callbackOut: function(){ 
    //                 if(this.game.VAR[this.actOn]){
    //                     this.game.VAR[this.actOn].x = this.game.VAR[this.actOn].startX;
    //                 }
    //             }
    //         }
    //     ]
    //  } 

	var Maps = my.Class(null, {


        STATIC: {
            MAPS: {
                LEVEL1 : {
                    map: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 4, 4, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 189, 190, 65, 65, 65, 65, 65, 65, 65, 180, 194, 65, 65, 65, 65, 65, 65, 65, 65, 65, 193, 181, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 4, 4, 65, 65, 193, 194, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 189, 190, 65, 65, 65, 65, 65, 65, 65, 65, 4, 4, 65, 65, 65, 65, 65, 65, 180, 181, 65, 65, 65, 65, 65, 65, 65, 65, 65, 23, 44, 65, 175, 65, 65, 65, 65, 65, 192, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 193, 194, 65, 65, 4, 4, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 112, 112, 112, 112, 112, 65, 65, 112, 112, 112, 112, 112, 113, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 4, 4, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 165, 165, 165, 165, 165, 65, 189, 190, 65, 171, 65, 65, 65, 65, 65, 65, 65, 65, 65, 79, 65, 65, 79, 79, 79, 4, 4, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 112, 112, 171, 65, 65, 65, 65, 180, 194, 65, 65, 165, 165, 165, 165, 165, 65, 65, 65, 139, 112, 113, 65, 193, 181, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 4, 4, 36, 23, 36, 65, 65, 192, 65, 65, 65, 65, 65, 65, 165, 165, 112, 112, 157, 65, 65, 65, 65, 65, 65, 165, 112, 112, 165, 165, 65, 65, 65, 65, 165, 65, 65, 65, 65, 65, 144, 144, 65, 65, 65, 65, 65, 49, 65, 65, 4, 4, 112, 112, 112, 112, 112, 113, 65, 65, 65, 65, 65, 175, 165, 165, 165, 165, 112, 112, 112, 65, 65, 65, 65, 165, 165, 165, 165, 165, 65, 65, 65, 65, 165, 65, 65, 65, 191, 144, 144, 144, 144, 144, 172, 65, 70, 62, 65, 174, 4, 4, 165, 165, 165, 165, 165, 65, 65, 65, 112, 112, 112, 112, 165, 165, 165, 165, 165, 165, 165, 173, 65, 171, 144, 165, 165, 165, 112, 165, 65, 65, 65, 65, 165, 65, 65, 65, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 4, 4, 165, 165, 165, 165, 165, 65, 65, 65, 165, 165, 165, 165, 165, 112, 112, 165, 165, 165, 165, 112, 112, 112, 112, 165, 165, 165, 165, 165, 65, 65, 65, 65, 165, 65, 65, 65, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 4],
                    w: 50,
                    h: 12,
                    ELEMENTS:{
                        offsety : 70,
                        tiles: {
                            "111":{ "type":"solid"},
                            "112":{ "type":"solid"},
                            "138":{ "type":"solid"},
                            "143":{ "type":"solid"},
                            "156":{ "type":"solid"},
                            "164":{ "type":"solid"},
                            "22" :{ "type":"empty"},
                            "3"  :{ "type":"solid"},
                            "33" :{ "type":"empty"},
                            "78" :{ "type":"solid"},
                            "173" :{ "type":"solid"},
                            "117" :{ "type":"solid"},
                            "125" :{ "type":"solid"},
                            "99" :{ "type":"solid"},
                        },
                        objects:[
                            // Woda
                            { "name":"Water", "pool": true, "context":"main", "image":"mapa", "x":420, "y":840, "marginY": 30 },
                            { "name":"Water", "pool": true, "context":"main", "image":"mapa", "x":490, "y":840, "marginY": 30 },
                            { "name":"Water", "pool": true, "context":"main", "image":"mapa", "x":560, "y":840, "marginY": 30 },
                            { "name":"Water", "pool": true, "context":"main", "image":"mapa", "x":2520, "y":840, "marginY": 30 },
                            { "name":"Water", "pool": true, "context":"main", "image":"mapa", "x":2030, "y":840, "marginY": 30 },
                            { "name":"Water", "pool": true, "context":"main", "image":"mapa", "x":2100, "y":840, "marginY": 30 },
                            { "name":"Water", "pool": true, "context":"main", "image":"mapa", "x":2170, "y":840, "marginY": 30 },
                            { "name":"Water", "pool": true, "context":"main", "image":"mapa", "x":2380, "y":840, "marginY": 30 },
                            { "name":"Water", "pool": true, "context":"main", "image":"mapa", "x":2240, "y":840, "marginY": 30 },
                            { "name":"Water", "pool": true, "context":"main", "image":"mapa", "x":2450, "y":840, "marginY": 30 },
                            { "name":"Water", "pool": true, "context":"main", "image":"mapa", "x":2450, "y":840, "marginY": 30 },
                            // skrzynki do zniszczenia
                            { "name":"BoxDesc", "pool": true, "context":"main", "image":"mapa", "x":700, "y":420 },
                            { "name":"BoxDesc", "pool": true, "context":"main", "image":"mapa", "x":770, "y":420 },
                            { "name":"BoxDesc", "pool": true, "context":"main", "image":"mapa", "x":1540, "y":420 },
                            { "name":"BoxDesc", "pool": true, "context":"main", "image":"mapa", "x":1610, "y":420 },
                            { "name":"BoxDesc", "pool": true, "context":"main", "image":"mapa", "x":3010, "y":280 },
                            { "name":"BoxDesc", "pool": true, "context":"main", "image":"mapa", "x":2310, "y":280 },
                            { "name":"BoxDesc", "pool": true, "context":"main", "image":"mapa", "x":3290, "y":280 },
                            // skrzynki do przesuwania
                            { "name":"Box", "pool": true, "context":"main", "image":"mapa", "x":140, "y":220 },
                            // Windy
                            //{ "name":"Lift", "pool": true, "context":"main", "image":"mapa", "x":70*8, "y":70*7, "method":[ {"name": "thereAndBack", "attr": [220, 'left', 160] } ] },
                            // platforma do wybijania
                            { "name":"JumpPlatform", "pool": true, "context":"main", "image": "items", "x":400, "y":664, "method":[ {"name": "configure", "attr": [ { jump:1200 } ] } ] },
                            // dzwignie
                            { "name":"Lever", "pool": true, "context":"main", "image": "items", "x":640, "y":70*10, "method":[ {"name": "configure", "attr": [ { moveToX:2200, moveToY:0, actionObj:'BoxDesc' } ] } ] },
                            // Klucze
                            { "name":"Keys", "pool": true, "context":"main", "image": "items", "x":140, "y":220, "method":[ {"name": "configure", "attr": [ { key:'red'} ] } ] },
                            { "name":"Keys", "pool": true, "context":"main", "image": "items", "x":340, "y":520, "method":[ {"name": "configure", "attr": [ { key:'blue'} ] } ] },
                            { "name":"Keys", "pool": true, "context":"main", "image": "items", "x":440, "y":520, "method":[ {"name": "configure", "attr": [ { key:'green'} ] } ] },
                            { "name":"Keys", "pool": true, "context":"main", "image": "items", "x":770, "y":710, "method":[ {"name": "configure", "attr": [ { key:'yellow'} ] } ] },
                            // zamki do drzwi
                            { "name":"Lock", "pool": true, "context":"main", "image": "mapa", "x":240, "y":620, "method":[ {"name": "configure", "attr": [ { lock:'yellow'} ] } ] },
                            // przyciski
                            { "name":"Switch", "pool": true, "context":"main", "image": "items", "x":290, "y":70*9, "marginY": 5, "method":[ {"name": "configure", "attr": [ { actOn: switchFunctions.lvl1[0].actOn, callbackIn: switchFunctions.lvl1[0].callbackIn, callbackOut: switchFunctions.lvl1[0].callbackOut  /* End */}  ] }  ] },
                            // przeciwnicy
                            //{ "name":"Enemy1", "pool": true, "context":"main", "image": "enemies", "x":70*12, "y":70*6, "method":[ {"name": "thereAndBack", "attr": [200, 'left', 160] } ] },
                           // { "name":"Enemy1", "pool": true, "context":"main", "image": "enemies", "x":70*2, "y":70*6, "method":[ {"name": "thereAndBack", "attr": [200, 'right', 160] } ] },
                        
                            // Gracz
                            { "name":Player, "context":"main", "image":"player3", "varr":"player", "x":297.5, "y":297.5 },
                            // Exit
                            { "name":Exit, "context":"main", "image":"exit", "varr":"exit", "x": 3220, "y": 560, "marginY": 30 },

                            { "name":Ufo, "context":"main", "image":"ufo", "varr":"ufo", "x": -530, "y":  -250 },
                        ]
                    },
                },
               
                LEVEL2 :{
                    map: [79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 65, 65, 65, 65, 65, 65, 65, 65, 65, 118, 118, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 144, 65, 65, 65, 65, 65, 65, 65, 65, 65, 79, 79, 65, 65, 65, 65, 65, 65, 65, 65, 65, 118, 118, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 144, 65, 65, 65, 65, 65, 65, 65, 65, 65, 79, 79, 65, 65, 65, 65, 65, 65, 65, 65, 65, 118, 118, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 144, 144, 65, 65, 65, 65, 65, 65, 65, 65, 65, 79, 79, 65, 65, 65, 65, 65, 65, 65, 65, 65, 118, 118, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 144, 144, 65, 65, 65, 65, 65, 65, 65, 65, 65, 79, 79, 173, 65, 65, 65, 65, 65, 65, 65, 65, 118, 118, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 112, 112, 112, 112, 100, 65, 65, 126, 112, 112, 112, 112, 112, 112, 112, 65, 65, 65, 65, 65, 65, 65, 65, 65, 79, 112, 112, 112, 112, 113, 65, 65, 65, 65, 65, 118, 118, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 79, 165, 165, 65, 65, 65, 65, 65, 65, 65, 65, 118, 118, 65, 65, 65, 65, 65, 65, 65, 65, 65, 192, 173, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 79, 165, 165, 65, 65, 65, 65, 65, 65, 139, 112, 112, 112, 112, 113, 65, 65, 65, 65, 65, 112, 112, 112, 112, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 165, 165, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 79, 79, 165, 165, 165, 165, 112, 112, 172, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 165, 165, 83, 65, 65, 171, 192, 65, 65, 65, 36, 36, 23, 65, 65, 65, 175, 112, 112, 165, 112, 112, 165, 165, 165, 112, 65, 171, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 165, 165, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 112, 165, 165, 165, 165, 165, 165, 165, 165, 165, 112, 112, 65, 65, 65, 65, 65, 65, 112, 112, 112, 112, 112, 112, 112, 65, 65, 65, 65, 65, 65, 65, 65, 65],
  

                    w: 50,
                    h: 12,
                    ELEMENTS:{
                        offsety : 70,
                        tiles: {
                            "111":{ "type":"solid"},
                            "112":{ "type":"solid"},
                            "138":{ "type":"solid"},
                            "143":{ "type":"solid"},
                            "156":{ "type":"solid"},
                            "164":{ "type":"solid"},
                            "22" :{ "type":"empty"},
                            "3"  :{ "type":"solid"},
                            "33" :{ "type":"empty"},
                            "78" :{ "type":"solid"},
                            "173" :{ "type":"solid"},
                            "117" :{ "type":"solid"},
                            "125" :{ "type":"solid"},
                            "99" :{ "type":"solid"},
                        },
                        objects:[ 
                             // Woda
                            { "name":"Water", "pool": true, "context":"main", "image":"mapa", "x":1960, "y":840, "marginY": 30 },
                            { "name":"Water", "pool": true, "context":"main", "image":"mapa", "x":2030, "y":840, "marginY": 30 },
                            { "name":"Water", "pool": true, "context":"main", "image":"mapa", "x":2240, "y":840, "marginY": 30 },
                            { "name":"Water", "pool": true, "context":"main", "image":"mapa", "x":2310, "y":840, "marginY": 30 },
                            { "name":"Water", "pool": true, "context":"main", "image":"mapa", "x":2170, "y":840, "marginY": 30 },
                            { "name":"Water", "pool": true, "context":"main", "image":"mapa", "x":2100, "y":840, "marginY": 30 },
                            // skrzynki do zniszczenia
                            { "name":"BoxDesc", "pool": true, "context":"main", "image":"mapa", "x":560, "y":280 },
                            { "name":"BoxDesc", "pool": true, "context":"main", "image":"mapa", "x":630, "y":280 },
                            { "name":"BoxDesc", "pool": true, "context":"main", "image":"mapa", "x":840, "y":280 },
                            { "name":"BoxDesc", "pool": true, "context":"main", "image":"mapa", "x":910, "y":280 },
                            // skrzynki do przesuwania
                            { "name":"Box", "pool": true, "context":"main", "image":"mapa", "x":1960, "y":348 },
                            { "name":"Box", "pool": true, "context":"main", "image":"mapa", "x":2380, "y":348 },

                            { "name":Player, "context": "main", "image": "player3", "varr": "player", "x": 1900, "y": 497 },

                            { "name":Exit, "context":"main", "image":"exit", "varr":"exit", "x": 220, "y": 460, "marginY": 30 },

                            { "name":Ufo, "context":"main", "image":"ufo", "varr":"ufo", "x": 534, "y":  -254 },
                        ]
                    }
                }
            },
        },
		
        getMap: function(lvl){
            return Maps.MAPS['LEVEL'+lvl];
        },

        getElements: function(lvl){
            return Maps.MAPS['LEVEL'+lvl].ELEMENTS;
        }

        
       
	})

   
       
	
	return Maps;
})