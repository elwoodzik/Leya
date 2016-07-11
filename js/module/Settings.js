define(['Class'], function(my){
	
	var Settings = my.Class({

		constructor: function(id){
            this.res = null;
            this.create(id);
            
		},

		create: function(id){
			this.resolution = [
                {
                    cardsImg: "deck_960",
                    reversImg: "revers_960",
                    cardW: 73.8,
                    cardH: 107.4,
                    marginX: 90,
                    marginY: 130,
                    maxFreeX: 400,
                    fontSize:0,
                    dealStartX: 120,
                    dealStartY:  25,
                    freeStartX: 20,
                    freeStartY: 25,
                    cardSellectedY: 23,
                    reversMarginX: 450,
                    reversMarginY: 125,
                    putCardX: 350,
                    putCardY: 125,
                    putCardMargin: 25
                },
                {
                    cardsImg: 'cards2',
                    reversImg: 'revers',
                    cardW: 147.6,
                    cardH: 214,
                    marginX: 210,
                    marginY: 270,
                    maxFreeX: 860,
                    fontSize:0,
                    dealStartX: 230,
                    dealStartY: 45,
                    freeStartX: 20,
                    freeStartY: 45,
                    cardSellectedY: 50,
                    reversMarginX: 860,
                    reversMarginY: 225,
                    putCardX: 660,
                    putCardY: 225,
                    putCardMargin: 50  
                }
            ]

            return this.res = this.resolution[id];
		},

	})

	return Settings;
})