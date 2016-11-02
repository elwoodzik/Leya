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
                            { "name":"Keys", "pool": true, "context":"main", "image": "items", "x":150, "y":220, "method":[ {"name": "configure", "attr": [ { key:'red'} ] } ] },
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
                    map: [79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 104, 104, 104, 104, 104, 104, 104, 104, 165, 165, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 79, 79, 104, 104, 104, 104, 104, 104, 104, 189, 165, 165, 194, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 180, 181, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 144, 104, 104, 104, 189, 190, 104, 104, 104, 104, 104, 104, 104, 79, 79, 104, 104, 189, 181, 104, 104, 104, 104, 165, 165, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 193, 194, 104, 104, 104, 104, 144, 144, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 79, 79, 104, 104, 104, 104, 104, 104, 104, 104, 165, 165, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 144, 144, 104, 104, 104, 104, 44, 104, 104, 104, 104, 104, 104, 79, 79, 36, 36, 104, 104, 104, 104, 104, 104, 165, 165, 104, 104, 189, 194, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 189, 190, 104, 104, 104, 104, 36, 36, 191, 104, 104, 104, 104, 104, 144, 144, 104, 192, 104, 104, 112, 112, 112, 104, 104, 104, 104, 79, 79, 112, 112, 112, 112, 104, 104, 104, 104, 165, 165, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 175, 175, 104, 104, 104, 104, 104, 104, 104, 104, 112, 112, 112, 112, 112, 112, 104, 104, 144, 144, 112, 112, 104, 104, 104, 104, 104, 104, 104, 104, 172, 79, 79, 165, 165, 165, 165, 104, 104, 104, 171, 165, 165, 175, 104, 104, 104, 104, 104, 104, 44, 104, 104, 104, 112, 112, 112, 112, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 112, 112, 165, 165, 104, 104, 104, 189, 190, 104, 104, 112, 112, 79, 79, 165, 165, 165, 165, 104, 104, 112, 112, 165, 165, 112, 112, 104, 104, 104, 104, 112, 112, 112, 104, 104, 165, 165, 165, 165, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 79, 79, 165, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 172, 165, 165, 165, 104, 104, 165, 104, 104, 189, 194, 104, 104, 104, 104, 112, 173, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 70, 104, 192, 79, 79, 165, 104, 193, 194, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 112, 112, 165, 165, 165, 104, 104, 165, 104, 104, 104, 104, 104, 171, 112, 112, 165, 112, 104, 104, 104, 104, 104, 193, 181, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 112, 112, 112, 112, 79, 79, 165, 104, 104, 104, 104, 104, 104, 104, 104, 173, 104, 192, 104, 104, 165, 165, 165, 165, 165, 104, 104, 165, 104, 104, 104, 104, 191, 112, 165, 165, 165, 165, 112, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 23, 23, 192, 104, 165, 165, 165, 165, 79, 79, 165, 104, 104, 104, 104, 104, 104, 112, 112, 112, 112, 112, 112, 112, 165, 165, 165, 165, 165, 104, 104, 165, 104, 104, 104, 112, 112, 165, 165, 165, 165, 165, 165, 175, 104, 104, 104, 104, 104, 104, 104, 104, 104, 112, 112, 112, 112, 112, 112, 165, 165, 165, 165, 79, 79, 165, 104, 192, 104, 104, 171, 112, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 104, 104, 165, 173, 104, 171, 165, 165, 165, 165, 165, 165, 165, 165, 112, 104, 171, 104, 104, 104, 104, 104, 104, 171, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 79, 79, 165, 112, 112, 112, 112, 112, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 104, 104, 165, 112, 112, 112, 165, 165, 165, 165, 165, 165, 165, 165, 165, 112, 112, 104, 104, 104, 104, 104, 112, 112, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 79],
         
         
         
                    w: 55,
                    h: 15,
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
                            { "name":"Water", "pool": true, "context":"main", "image":"mapa", "x":2590, "y":1050, "marginY": 30 },
                            { "name":"Water", "pool": true, "context":"main", "image":"mapa", "x":2660, "y":1050, "marginY": 30 },
                            { "name":"Water", "pool": true, "context":"main", "image":"mapa", "x":2730, "y":1050, "marginY": 30 },
                            { "name":"Water", "pool": true, "context":"main", "image":"mapa", "x":2800, "y":1050, "marginY": 30 },
                            { "name":"Water", "pool": true, "context":"main", "image":"mapa", "x":2870, "y":1050, "marginY": 30 },
                            { "name":"Water", "pool": true, "context":"main", "image":"mapa", "x":1400, "y":1050, "marginY": 30 },
                            { "name":"Water", "pool": true, "context":"main", "image":"mapa", "x":1470, "y":1050, "marginY": 30 },
                            // // skrzynki do zniszczenia
                             { "name":"BoxDesc", "pool": true, "context":"main", "image":"mapa", "x":490, "y":280 },
                             { "name":"BoxDesc", "pool": true, "context":"main", "image":"mapa", "x":560, "y":280 },
                             { "name":"BoxDesc", "pool": true, "context":"main", "image":"mapa", "x":770, "y":280 },
                             { "name":"BoxDesc", "pool": true, "context":"main", "image":"mapa", "x":840, "y":280 },
                             { "name":"BoxDesc", "pool": true, "context":"main", "image":"mapa", "x":1680, "y":280 },
                             { "name":"BoxDesc", "pool": true, "context":"main", "image":"mapa", "x":3710, "y":280 },
                             { "name":"BoxDesc", "pool": true, "context":"main", "image":"mapa", "x":3640, "y":280 },
                            // // skrzynki do przesuwania
                            { "name":"Box", "pool": true, "context":"main", "image":"mapa", "x":2520, "y":410 },
                            // { "name":"Box", "pool": true, "context":"main", "image":"mapa", "x":2380, "y":348 },
                            { "name":"Coin", "pool": true, "context":"main", "image":"coin1", "x":160, "y":710, "method":[ {"name": "configure", "attr": [ { immoveable: false} ] } ] },
                            { "name":"Coin", "pool": true, "context":"main", "image":"coin1", "x":210, "y":710, "method":[ {"name": "configure", "attr": [ { immoveable: false} ] } ] },
                            { "name":"Coin", "pool": true, "context":"main", "image":"coin1", "x":260, "y":710, "method":[ {"name": "configure", "attr": [ { immoveable: false} ] } ] },
                            { "name":"Coin", "pool": true, "context":"main", "image":"coin1", "x":160, "y":770, "method":[ {"name": "configure", "attr": [ { immoveable: false} ] } ] },
                            { "name":"Coin", "pool": true, "context":"main", "image":"coin1", "x":210, "y":770, "method":[ {"name": "configure", "attr": [ { immoveable: false} ] } ] },
                            { "name":"Coin", "pool": true, "context":"main", "image":"coin1", "x":260, "y":770, "method":[ {"name": "configure", "attr": [ { immoveable: false} ] } ] },
                            { "name":"Coin", "pool": true, "context":"main", "image":"coin1", "x":160, "y":830, "method":[ {"name": "configure", "attr": [ { immoveable: false} ] } ] },
                            { "name":"Coin", "pool": true, "context":"main", "image":"coin1", "x":210, "y":830, "method":[ {"name": "configure", "attr": [ { immoveable: false} ] } ] },
                            { "name":"Coin", "pool": true, "context":"main", "image":"coin1", "x":260, "y":830, "method":[ {"name": "configure", "attr": [ { immoveable: false} ] } ] },
                            { "name":"Coin", "pool": true, "context":"main", "image":"coin1", "x":160, "y":890, "method":[ {"name": "configure", "attr": [ { immoveable: false} ] } ] },
                            { "name":"Coin", "pool": true, "context":"main", "image":"coin1", "x":210, "y":890, "method":[ {"name": "configure", "attr": [ { immoveable: false} ] } ] },
                            { "name":"Coin", "pool": true, "context":"main", "image":"coin1", "x":260, "y":890, "method":[ {"name": "configure", "attr": [ { immoveable: false} ] } ] },
                            
                            { "name":"Coin", "pool": true, "context":"main", "image":"coin1", "x":1610, "y":710, "method":[ {"name": "configure", "attr": [ { immoveable: false} ] } ] },
                            { "name":"Coin", "pool": true, "context":"main", "image":"coin1", "x":1660, "y":710, "method":[ {"name": "configure", "attr": [ { immoveable: false} ] } ] },
                            { "name":"Coin", "pool": true, "context":"main", "image":"coin1", "x":1710, "y":710, "method":[ {"name": "configure", "attr": [ { immoveable: false} ] } ] },
                            { "name":"Coin", "pool": true, "context":"main", "image":"coin1", "x":1610, "y":770, "method":[ {"name": "configure", "attr": [ { immoveable: false} ] } ] },
                            { "name":"Coin", "pool": true, "context":"main", "image":"coin1", "x":1660, "y":770, "method":[ {"name": "configure", "attr": [ { immoveable: false} ] } ] },
                            { "name":"Coin", "pool": true, "context":"main", "image":"coin1", "x":1710, "y":770, "method":[ {"name": "configure", "attr": [ { immoveable: false} ] } ] },
                            { "name":"Coin", "pool": true, "context":"main", "image":"coin1", "x":1610, "y":830, "method":[ {"name": "configure", "attr": [ { immoveable: false} ] } ] },
                            { "name":"Coin", "pool": true, "context":"main", "image":"coin1", "x":1660, "y":830, "method":[ {"name": "configure", "attr": [ { immoveable: false} ] } ] },
                            { "name":"Coin", "pool": true, "context":"main", "image":"coin1", "x":1710, "y":830, "method":[ {"name": "configure", "attr": [ { immoveable: false} ] } ] },
                            { "name":"Coin", "pool": true, "context":"main", "image":"coin1", "x":1610, "y":890, "method":[ {"name": "configure", "attr": [ { immoveable: false} ] } ] },
                            { "name":"Coin", "pool": true, "context":"main", "image":"coin1", "x":1660, "y":890, "method":[ {"name": "configure", "attr": [ { immoveable: false} ] } ] },
                            { "name":"Coin", "pool": true, "context":"main", "image":"coin1", "x":1710, "y":890, "method":[ {"name": "configure", "attr": [ { immoveable: false} ] } ] },
                            { "name":Player, "context": "main", "image": "player3", "varr": "player", "x": 200, "y": 197 },

                            { "name":Exit, "context":"main", "image":"exit", "varr":"exit", "x": 3640, "y": 560, "marginY": 30 },

                            { "name":Ufo, "context":"main", "image":"ufo", "varr":"ufo", "x": 534, "y":  -254 }
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