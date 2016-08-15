define([
	'Class',
    'module/Objects/Water',
    'module/Objects/Box',
    'module/Objects/BoxDesc',
    'module/Objects/Exit',
    'module/Objects/Player',
    'module/Objects/Coin',
], function(my, Water, Box, BoxDesc, Exit, Player, Coin){
	var that;

	var Maps = my.Class({

        STATIC: {
            MAPS: {
                LEVEL1 : {
                   map: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 4, 4, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 4, 4, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 4, 4, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 23, 44, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 4, 4, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 112, 112, 112, 112, 112, 65, 65, 112, 112, 112, 112, 112, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 4, 4, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 165, 165, 165, 165, 165, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 4, 4, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 112, 112, 65, 65, 65, 65, 65, 65, 65, 65, 65, 165, 165, 165, 165, 165, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 4, 4, 34, 23, 34, 65, 65, 65, 65, 65, 65, 65, 65, 65, 165, 165, 112, 112, 157, 65, 65, 65, 65, 65, 65, 165, 165, 165, 165, 165, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 4, 4, 112, 112, 112, 112, 112, 113, 65, 65, 65, 65, 65, 65, 165, 165, 165, 165, 112, 112, 112, 65, 65, 65, 65, 165, 165, 165, 165, 165, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 4, 4, 165, 165, 165, 165, 165, 65, 65, 65, 112, 112, 112, 112, 165, 165, 165, 165, 165, 165, 165, 65, 65, 65, 144, 165, 165, 165, 165, 165, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 65, 4, 4, 165, 165, 165, 165, 165, 65, 65, 65, 165, 165, 165, 165, 165, 112, 112, 165, 165, 165, 165, 112, 112, 112, 112, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 165, 4],
                   //map: [79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 79, 79, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 79, 79, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 79, 79, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 79, 79, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 79, 79, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 79, 79, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 104, 79, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152, 152],
                   w: 50,
                   h: 12
                },
                LEVEL2 :[
                    ['20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20'],
                    ['20','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','20'],
                    ['20','10','10','21','10','98','10','10','40','40','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','40','40','10','10','10','10','10','10','10','10','10','10','10','20'],
                    ['20','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','40','40','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','20'],
                    ['20','10','10','10','10','10','10','10','10','10','10','10','10','10','40','40','40','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','40','40','40','10','10','10','20'],
                    ['20','99','10','21','10','40','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','40','10','10','10','10','10','10','10','10','10','10','10','10','10','10','20'],
                    ['20','10','10','10','10','10','10','10','40','40','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','40','40','10','10','10','10','10','10','10','10','10','10','10','20'],
                    ['20','40','10','10','10','10','10','10','10','10','10','10','10','10','10','10','40','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','20'],
                    ['20','40','40','40','42','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','40','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','20'],
                    ['20','41','41','41','30','30','30','40','40','40','40','40','30','30','40','40','40','40','40','40','40','40','40','40','40','40','40','40','40','30','30','30','40','40','40','40','40','40','40','20']
                ],
                 LEVEL3 :[
                    ['20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20','20'],
                    ['20','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','20'],
                    ['20','10','10','10','10','98','10','10','40','40','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','40','40','10','10','10','10','10','10','10','10','10','10','10','20'],
                    ['20','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','40','40','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','20'],
                    ['20','22','10','10','10','10','10','10','10','11','10','10','10','10','40','40','40','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','40','40','40','10','10','10','20'],
                    ['20','10','10','21','10','40','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','40','10','10','10','10','10','10','10','10','10','10','10','10','10','10','20'],
                    ['20','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','40','40','10','10','10','10','10','10','10','10','10','10','10','20'],
                    ['20','10','80','10','10','10','10','10','10','40','40','10','10','10','10','10','40','10','10','10','99','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','20'],
                    ['20','40','40','40','42','10','10','80','80','41','41','10','10','10','10','10','10','10','10','10','10','10','10','40','10','10','10','10','10','10','10','10','10','10','10','10','10','10','10','20'],
                    ['20','41','41','41','30','30','30','40','40','41','41','30','30','30','40','40','40','40','40','40','40','40','40','40','40','40','40','40','40','30','30','30','40','40','40','40','40','40','40','20']
                ],
            },
            /**
             * '99' -> EXIT
             * '98' -> PLAYER
             * '10' -> Puste miejsca (statyczna)
             * '11' -> Pochodnia (statyczna)
             * '80' -> puste miejsce w ktore wstawiany jest Sprite Coin
             * '30' -> puste miejsce w ktore wstawiany jest Sprite Watter
             * '20' -> wstawiony BOX (statyczna)
             * '21' -> puste miejsce w ktore wstawiany jest Sprite BOX
             * '22' -> puste miejsce w ktore wstawiany jest Sprite BOXDesc
             * '40' -> wstawiona ziemia (statyczna)
             * '41' -> wstawiona ziemia (statyczna)
             * '42' -> wstawiona ziemia (statyczna)
             * '43' -> wstawiona ziemia (statyczna)
             */
            ELEMENTS:{
                tiles: {
                    // '99':{x:12*72, y:4*72, type:'empty', obj: {type: Exit, context: 'main', image: 'exit', varr: 'exit', marignX: 0, marginY: 30 } },
                    // '98':{x:12*72, y:4*72, type:'empty', obj: {type: Player, context: 'main', image: 'player3', varr: 'player', marignX: 0, marginY: 0 } },
                    // '80':{x:12*72, y:4*72, type:'empty', obj: {type: Coin, context: 'main', image: 'coin', arr: 'coins', marignX: 0, marginY: 0 } },
                    // '10':{x:12*72, y:4*72, type:'empty'}, 
                    // '11':{x:1*72, y:1*72, type:'empty'}, 
                    // '30':{x:12*72, y:4*72, type:'empty', obj: {type: Water, context: 'main', image: 'mapa', arr: 'waterBlocks', marignX: 0, marginY: 30 } },
                    // '20':{x:0, y:6*72, type:'solid'},
                    // '21':{x:12*72, y:4*72, type:'empty', obj: {type: Box, context: 'main', image: 'mapa', arr: 'boxBlocks'} },
                    // '22':{x:12*72, y:4*72, type:'empty', obj: {type: BoxDesc, context: 'main', image: 'mapa', arr: 'boxDescBlocks'} },
                    // '40':{x:7*72, y:8*72, type:'solid'},
                    // '41':{x:8*72, y:12*72, type:'solid'},
                    // '42':{x:8*72, y:8*72, type:'solid'},
                    // '43':{x:8*72, y:10*72, type:'solid'},
                    "111":
                    {
                     "type":"solid"
                    },
                 "112":
                    {
                     "type":"solid"
                    },
                 "143":
                    {
                     "type":"solid"
                    },
                 "164":
                    {
                     "type":"solid"
                    },
                 "22":
                    {
                     "type":"empty"
                    },
                 "3":
                    {
                     "type":"solid"
                    },
                 "33":
                    {
                     "type":"empty"
                    },
                    "156":
                    {
                     "type":"solid"
                    }
           
                },
                objects:[
                    {
                        "name":Player,
                        "context":"main",
                        "image":"player3",
                        "varr":"player",
                        "x":297.5,
                        "y":297.5
                    },
                    {
                     "name":Water,
                     "arr":"waterBlocks",
                     "context":"main",
                     "image":"mapa",
                     "x":420,
                     "y":770,
                     "marginY": 30
                    },
                    {
                     "name":Water,
                     "arr":"waterBlocks",
                     "context":"main",
                     "image":"mapa",
                     "x":490,
                     "y":770,
                     "marginY": 30
                    },
                    {
                     "name":Water,
                     "arr":"waterBlocks",
                     "context":"main",
                     "image":"mapa",
                     "x":560,
                     "y":770,
                     "marginY": 30
                    },
                    {
                     "name":BoxDesc,
                     "arr":"boxDescBlocks",
                     "context":"main",
                     "image":"mapa",
                     "x":700,
                     "y":420,
                    },
                    {
                     "name":BoxDesc,
                     "arr":"boxDescBlocks",
                     "context":"main",
                     "image":"mapa",
                     "x":775,
                     "y":420,
                    }
                ]
            }
        },
		
        getMap: function(count){
            return Maps.MAPS['LEVEL'+count];
        },

        getElements: function(){
            return Maps.ELEMENTS;
        }
	})
	
	return Maps;
})