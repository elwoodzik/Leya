define(['Class'], function(my){
	var that;

	var Cards = my.Class({

		constructor: function(){
            that = this;
		},

		create: function(){
            that.game = this; // przypisanie glownego obiektu do tej classy
        },
        
        getAllCards: function(y){
            that.deck = [
                {
                    name: 'trefl_as',
                    frame: 0,
                    frameY: y*0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_2',
                    frame: 1,
                    frameY: y*0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_3',
                    frame: 2,
                    frameY: y*0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_4',
                    frame: 3,
                    frameY: y*0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_5',
                    frame: 4,
                    frameY: y*0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_6',
                    frame: 5,
                    frameY: y*0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_7',
                    frame: 6,
                    frameY: y*0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_8',
                    frame: 7,
                    frameY: y*0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_9',
                    frame: 8,
                    frameY: y*0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_10',
                    frame: 9,
                    frameY: y*0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_walet',
                    frame: 10,
                    frameY: y*0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_dama',
                    frame: 11,
                    frameY: y*0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_krol',
                    frame: 12,
                    frameY: y*0,
                    color: 'trefl'
                },
                {
                    name: 'karo_as',
                    frame: 0,
                    frameY: y*1,
                    color: 'karo'
                },
                {
                    name: 'karo_2',
                    frame: 1,
                    frameY: y*1,
                    color: 'karo'
                },
                {
                    name: 'karo_3',
                    frame: 2,
                    frameY: y*1,
                    color: 'karo'
                },
                {
                    name: 'karo_4',
                    frame: 3,
                    frameY: y*1,
                    color: 'karo'
                },
                {
                    name: 'karo_5',
                    frame: 4,
                    frameY: y*1,
                    color: 'karo'
                },
                {
                    name: 'karo_6',
                    frame: 5,
                    frameY: y*1,
                    color: 'karo'
                },
                {
                    name: 'karo_7',
                    frame: 6,
                    frameY: y*1,
                    color: 'karo'
                },
                {
                    name: 'karo_8',
                    frame: 7,
                    frameY: y*1,
                    color: 'karo'
                },
                {
                    name: 'karo_9',
                    frame: 8,
                    frameY: y*1,
                    color: 'karo'
                },
                {
                    name: 'karo_10',
                    frame: 9,
                    frameY: y*1,
                    color: 'karo'
                },
                {
                    name: 'karo_walet',
                    frame: 10,
                    frameY: y*1,
                    color: 'karo'
                },
                {
                    name: 'karo_dama',
                    frame: 11,
                    frameY: y*1,
                    color: 'karo'
                },
                {
                    name: 'karo_krol',
                    frame: 12,
                    frameY: y*1,
                    color: 'karo'
                },
                {
                    name: 'kier_as',
                    frame: 0,
                    frameY: y*2,
                    color: 'kier'
                },
                {
                    name: 'kier_2',
                    frame: 1,
                    frameY: y*2,
                    color: 'kier'
                },
                {
                    name: 'kier_3',
                    frame: 2,
                    frameY: y*2,
                    color: 'kier'
                },
                {
                    name: 'kier_4',
                    frame: 3,
                    frameY: y*2,
                    color: 'kier'
                },
                {
                    name: 'kier_5',
                    frame: 4,
                    frameY: y*2,
                    color: 'kier'
                },
                {
                    name: 'kier_6',
                    frame: 5,
                    frameY: y*2,
                    color: 'kier'
                },
                {
                    name: 'kier_7',
                    frame: 6,
                    frameY: y*2,
                    color: 'kier'
                },
                {
                    name: 'kier_8',
                    frame: 7,
                    frameY: y*2,
                    color: 'kier'
                },
                {
                    name: 'kier_9',
                    frame: 8,
                    frameY: y*2,
                    color: 'kier'
                },
                {
                    name: 'kier_10',
                    frame: 9,
                    frameY: y*2,
                    color: 'kier'
                },
                {
                    name: 'kier_walet',
                    frame: 10,
                    frameY: y*2,
                    color: 'kier'
                },
                {
                    name: 'kier_dama',
                    frame: 11,
                    frameY: y*2,
                    color: 'kier'
                },
                {
                    name: 'kier_krol',
                    frame: 12,
                    frameY: y*2,
                    color: 'kier'
                },
                {
                    name: 'pik_as',
                    frame: 0,
                    frameY: y*3,
                    color: 'pik'
                },
                {
                    name: 'pik_2',
                    frame: 1,
                    frameY: y*3,
                    color: 'pik'
                },
                {
                    name: 'pik_3',
                    frame: 2,
                    frameY: y*3,
                    color: 'pik'
                },
                {
                    name: 'pik_4',
                    frame: 3,
                    frameY: y*3,
                    color: 'pik'
                },
                {
                    name: 'pik_5',
                    frame: 4,
                    frameY: y*3,
                    color: 'pik'
                },
                {
                    name: 'pik_6',
                    frame: 5,
                    frameY: y*3,
                    color: 'pik'
                },
                {
                    name: 'pik_7',
                    frame: 6,
                    frameY: y*3,
                    color: 'pik'
                },
                {
                    name: 'pik_8',
                    frame: 7,
                    frameY: y*3,
                    color: 'pik'
                },
                {
                    name: 'pik_9',
                    frame: 8,
                    frameY: y*3,
                    color: 'pik'
                },
                {
                    name: 'pik_10',
                    frame: 9,
                    frameY: y*3,
                    color: 'pik'
                },
                {
                    name: 'pik_walet',
                    frame: 10,
                    frameY: y*3,
                    color: 'pik'
                },
                {
                    name: 'pik_dama',
                    frame: 11,
                    frameY: y*3,
                    color: 'pik'
                },
                {
                    name: 'pik_krol',
                    frame: 12,
                    frameY: y*3,
                    color: 'pik'
                },
                {
                    name: 'trefl_2',
                    frame: 1,
                    frameY: y*0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_3',
                    frame: 2,
                    frameY: y*0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_4',
                    frame: 3,
                    frameY: y*0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_5',
                    frame: 4,
                    frameY: y*0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_6',
                    frame: 5,
                    frameY: y*0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_7',
                    frame: 6,
                    frameY: y*0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_8',
                    frame: 7,
                    frameY: y*0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_9',
                    frame: 8,
                    frameY: y*0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_10',
                    frame: 9,
                    frameY: y*0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_walet',
                    frame: 10,
                    frameY: y*0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_dama',
                    frame: 11,
                    frameY: y*0,
                    color: 'trefl'
                },
                {
                    name: 'karo_2',
                    frame: 1,
                    frameY: y*1,
                    color: 'karo'
                },
                {
                    name: 'karo_3',
                    frame: 2,
                    frameY: y*1,
                    color: 'karo'
                },
                {
                    name: 'karo_4',
                    frame: 3,
                    frameY: y*1,
                    color: 'karo'
                },
                {
                    name: 'karo_5',
                    frame: 4,
                    frameY: y*1,
                    color: 'karo'
                },
                {
                    name: 'karo_6',
                    frame: 5,
                    frameY: y*1,
                    color: 'karo'
                },
                {
                    name: 'karo_7',
                    frame: 6,
                    frameY: y*1,
                    color: 'karo'
                },
                {
                    name: 'karo_8',
                    frame: 7,
                    frameY: y*1,
                    color: 'karo'
                },
                {
                    name: 'karo_9',
                    frame: 8,
                    frameY: y*1,
                    color: 'karo'
                },
                {
                    name: 'karo_10',
                    frame: 9,
                    frameY: y*1,
                    color: 'karo'
                },
                {
                    name: 'karo_walet',
                    frame: 10,
                    frameY: y*1,
                    color: 'karo'
                },
                {
                    name: 'karo_dama',
                    frame: 11,
                    frameY: y*1,
                    color: 'karo'
                },
                
                {
                    name: 'kier_2',
                    frame: 1,
                    frameY: y*2,
                    color: 'kier'
                },
                {
                    name: 'kier_3',
                    frame: 2,
                    frameY: y*2,
                    color: 'kier'
                },
                {
                    name: 'kier_4',
                    frame: 3,
                    frameY: y*2,
                    color: 'kier'
                },
                {
                    name: 'kier_5',
                    frame: 4,
                    frameY: y*2,
                    color: 'kier'
                },
                {
                    name: 'kier_6',
                    frame: 5,
                    frameY: y*2,
                    color: 'kier'
                },
                {
                    name: 'kier_7',
                    frame: 6,
                    frameY: y*2,
                    color: 'kier'
                },
                {
                    name: 'kier_8',
                    frame: 7,
                    frameY: y*2,
                    color: 'kier'
                },
                {
                    name: 'kier_9',
                    frame: 8,
                    frameY: y*2,
                    color: 'kier'
                },
                {
                    name: 'kier_10',
                    frame: 9,
                    frameY: y*2,
                    color: 'kier'
                },
                {
                    name: 'kier_walet',
                    frame: 10,
                    frameY: y*2,
                    color: 'kier'
                },
                {
                    name: 'kier_dama',
                    frame: 11,
                    frameY: y*2,
                    color: 'kier'
                },
                {
                    name: 'pik_2',
                    frame: 1,
                    frameY: y*3,
                    color: 'pik'
                },
                {
                    name: 'pik_3',
                    frame: 2,
                    frameY: y*3,
                    color: 'pik'
                },
                {
                    name: 'pik_4',
                    frame: 3,
                    frameY: y*3,
                    color: 'pik'
                },
                {
                    name: 'pik_5',
                    frame: 4,
                    frameY: y*3,
                    color: 'pik'
                },
                {
                    name: 'pik_6',
                    frame: 5,
                    frameY: y*3,
                    color: 'pik'
                },
                {
                    name: 'pik_7',
                    frame: 6,
                    frameY: y*3,
                    color: 'pik'
                },
                {
                    name: 'pik_8',
                    frame: 7,
                    frameY: y*3,
                    color: 'pik'
                },
                {
                    name: 'pik_9',
                    frame: 8,
                    frameY: y*3,
                    color: 'pik'
                },
                {
                    name: 'pik_10',
                    frame: 9,
                    frameY: y*3,
                    color: 'pik'
                },
                {
                    name: 'pik_walet',
                    frame: 10,
                    frameY: y*3,
                    color: 'pik'
                },
                {
                    name: 'pik_dama',
                    frame: 11,
                    frameY: y*3,
                    color: 'pik'
                }
            ]
		    return that.deck;
        },

        update: function(){
          
        }
        
	})

	return Cards;
})