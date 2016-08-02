define([
	'Class',
    'module/Objects/Water',
    'module/Objects/Box'
], function(my, Water, Box){
	var that;

	var Maps = my.Class({

        STATIC: {
            MAPS: {
                LEVEL1 :[
                    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                    'xffffffffffffffffffffffffffffffffffffffx',
                    'xffbffffggffffffffffffffffggfffffffffffx',
                    'xfffffffffffffffffffggfffffffffffffffffx',
                    'xfffffffffffffgggffffffffffffffffgggfffx',
                    'xffbfgffffffffffffffffffgffffffffffffffx',
                    'xfffffffggffffffffffffffffggfffffffffffx',
                    'xfffffffffffffffgffffffffffffffffffffffx',
                    'xgggcffffffffffffffffffgfffffffffffffffx',
                    'xaaawwwgggggwwgggggggggggggggwwwgggggggx',
                ],
                LEVEL2 :[
                    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                    'xffffffffffffffffffffffffffffffffffffffx',
                    'xfffffffggffffffffffffffffggfffffffffffx',
                    'xfffffffffffffffffffggfffffffffffffffffx',
                    'xfffffffffffffgggffffffffffffffffgggfffx',
                    'xffffgffffffffffffffffffgffffffffffffffx',
                    'xfffffffggffffffffffffffffggfffffffffffx',
                    'xfffffffffffffffgffffffffffffffffffffffx',
                    'xgggcffffffffffffffffffgfffffffffffffffx',
                    'xaaafffggggggggggggggggggggggfffgggggggx',
                ],
            },

            ELEMENTS:{
                'f':{x:12*72, y:4*72, type:'empty', sub_type: 'board'},
                'g':{x:7*72, y:8*72, type:'solid', sub_type: 'board'},
                'w':{x:12*72, y:4*72, type:'empty', sub_type: 'board', obj: {type: Water, image: 'mapa', arr: 'waterBlocks', marignX: 0, marginY: 30 } },
                'b':{x:12*72, y:4*72, type:'empty', sub_type: 'board', obj: {type: Box, image: 'mapa', arr: 'boxBlocks'} },
                'x':{x:0, y:6*72, type:'solid', sub_type: 'board'},
                't':{x:8*72, y:2*72, type:'solid', sub_type: 'board'},
                'a':{x:8*72, y:12*72, type:'solid', sub_type: 'board'},
                'c':{x:8*72, y:8*72, type:'solid', sub_type: 'board'},
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