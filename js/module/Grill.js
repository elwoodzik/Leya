define(['Class'], function(my){
	var that;

	var Grill = my.Class({

		constructor: function(){
            that = this;
		},

		create: function(){
            var colors = ["#FFABAB", "#FFDAAB", "#DDFFAB", "#ABE4FF", "#D9ABFF"];
            that.game = this;
            
            that.hand = [];

            that.deck = [
                {
                    name: 'trefl_as',
                    pos: 0,
                    y:0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_2',
                    pos: 1,
                    y:0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_3',
                    pos: 2,
                    y:0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_4',
                    pos: 3,
                    y:0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_5',
                    pos: 4,
                    y:0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_6',
                    pos: 5,
                    y:0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_7',
                    pos: 6,
                    y:0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_8',
                    pos: 7,
                    y:0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_9',
                    pos: 8,
                    y:0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_10',
                    pos: 9,
                    y:0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_walet',
                    pos: 10,
                    y:0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_dama',
                    pos: 11,
                    y:0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_krol',
                    pos: 12,
                    y:0,
                    color: 'trefl'
                },
                {
                    name: 'kier_as',
                    pos: 0,
                    y:98,
                    color: 'kier'
                },
                {
                    name: 'kier_2',
                    pos: 1,
                    y:98,
                    color: 'kier'
                },
                {
                    name: 'kier_3',
                    pos: 2,
                    y:98,
                    color: 'kier'
                },
                {
                    name: 'kier_4',
                    pos: 3,
                    y:98,
                    color: 'kier'
                },
                {
                    name: 'kier_5',
                    pos: 4,
                    y:98,
                    color: 'kier'
                },
                {
                    name: 'kier_6',
                    pos: 5,
                    y:98,
                    color: 'kier'
                },
                {
                    name: 'kier_7',
                    pos: 6,
                    y:98,
                    color: 'kier'
                },
                {
                    name: 'kier_8',
                    pos: 7,
                    y:98,
                    color: 'kier'
                },
                {
                    name: 'kier_9',
                    pos: 8,
                    y:98,
                    color: 'kier'
                },
                {
                    name: 'kier_10',
                    pos: 9,
                    y:98,
                    color: 'kier'
                },
                {
                    name: 'kier_walet',
                    pos: 10,
                    y:98,
                    color: 'kier'
                },
                {
                    name: 'kier_dama',
                    pos: 11,
                    y:98,
                    color: 'kier'
                },
                {
                    name: 'kier_krol',
                    pos: 12,
                    y:98,
                    color: 'kier'
                },
                {
                    name: 'pik_as',
                    pos: 0,
                    y:196,
                    color: 'pik'
                },
                {
                    name: 'pik_2',
                    pos: 1,
                    y:196,
                    color: 'pik'
                },
                {
                    name: 'pik_3',
                    pos: 2,
                    y:196,
                    color: 'pik'
                },
                {
                    name: 'pik_4',
                    pos: 3,
                    y:196,
                    color: 'pik'
                },
                {
                    name: 'pik_5',
                    pos: 4,
                    y:196,
                    color: 'pik'
                },
                {
                    name: 'pik_6',
                    pos: 5,
                    y:196,
                    color: 'pik'
                },
                {
                    name: 'pik_7',
                    pos: 6,
                    y:196,
                    color: 'pik'
                },
                {
                    name: 'pik_8',
                    pos: 7,
                    y:196,
                    color: 'pik'
                },
                {
                    name: 'pik_9',
                    pos: 8,
                    y:196,
                    color: 'pik'
                },
                {
                    name: 'pik_10',
                    pos: 9,
                    y:196,
                    color: 'pik'
                },
                {
                    name: 'pik_walet',
                    pos: 10,
                    y:196,
                    color: 'pik'
                },
                {
                    name: 'pik_dama',
                    pos: 11,
                    y:196,
                    color: 'pik'
                },
                {
                    name: 'pik_krol',
                    pos: 12,
                    y:196,
                    color: 'pik'
                },
                {
                    name: 'karo_as',
                    pos: 0,
                    y:294,
                    color: 'karo'
                },
                {
                    name: 'karo_2',
                    pos: 1,
                    y:294,
                    color: 'karo'
                },
                {
                    name: 'karo_3',
                    pos: 2,
                    y:294,
                    color: 'karo'
                },
                {
                    name: 'karo_4',
                    pos: 3,
                    y:294,
                    color: 'karo'
                },
                {
                    name: 'karo_5',
                    pos: 4,
                    y:294,
                    color: 'karo'
                },
                {
                    name: 'karo_6',
                    pos: 5,
                    y:294,
                    color: 'karo'
                },
                {
                    name: 'karo_7',
                    pos: 6,
                    y:294,
                    color: 'karo'
                },
                {
                    name: 'karo_8',
                    pos: 7,
                    y:294,
                    color: 'karo'
                },
                {
                    name: 'karo_9',
                    pos: 8,
                    y:294,
                    color: 'karo'
                },
                {
                    name: 'karo_10',
                    pos: 9,
                    y:294,
                    color: 'karo'
                },
                {
                    name: 'karo_walet',
                    pos: 10,
                    y:294,
                    color: 'karo'
                },
                {
                    name: 'karo_dama',
                    pos: 11,
                    y:294,
                    color: 'karo'
                },
                {
                    name: 'karo_krol',
                    pos: 12,
                    y:294,
                    color: 'karo'
                },
                {
                    name: 'trefl_2',
                    pos: 1,
                    y:0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_3',
                    pos: 2,
                    y:0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_4',
                    pos: 3,
                    y:0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_5',
                    pos: 4,
                    y:0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_6',
                    pos: 5,
                    y:0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_7',
                    pos: 6,
                    y:0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_8',
                    pos: 7,
                    y:0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_9',
                    pos: 8,
                    y:0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_10',
                    pos: 9,
                    y:0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_walet',
                    pos: 10,
                    y:0,
                    color: 'trefl'
                },
                {
                    name: 'trefl_dama',
                    pos: 11,
                    y:0,
                    color: 'trefl'
                },
                {
                    name: 'kier_2',
                    pos: 1,
                    y:98,
                    color: 'kier'
                },
                {
                    name: 'kier_3',
                    pos: 2,
                    y:98,
                    color: 'kier'
                },
                {
                    name: 'kier_4',
                    pos: 3,
                    y:98,
                    color: 'kier'
                },
                {
                    name: 'kier_5',
                    pos: 4,
                    y:98,
                    color: 'kier'
                },
                {
                    name: 'kier_6',
                    pos: 5,
                    y:98,
                    color: 'kier'
                },
                {
                    name: 'kier_7',
                    pos: 6,
                    y:98,
                    color: 'kier'
                },
                {
                    name: 'kier_8',
                    pos: 7,
                    y:98,
                    color: 'kier'
                },
                {
                    name: 'kier_9',
                    pos: 8,
                    y:98,
                    color: 'kier'
                },
                {
                    name: 'kier_10',
                    pos: 9,
                    y:98,
                    color: 'kier'
                },
                {
                    name: 'kier_walet',
                    pos: 10,
                    y:98,
                    color: 'kier'
                },
                {
                    name: 'kier_dama',
                    pos: 11,
                    y:98,
                    color: 'kier'
                },
                
                {
                    name: 'pik_2',
                    pos: 1,
                    y:196,
                    color: 'pik'
                },
                {
                    name: 'pik_3',
                    pos: 2,
                    y:196,
                    color: 'pik'
                },
                {
                    name: 'pik_4',
                    pos: 3,
                    y:196,
                    color: 'pik'
                },
                {
                    name: 'pik_5',
                    pos: 4,
                    y:196,
                    color: 'pik'
                },
                {
                    name: 'pik_6',
                    pos: 5,
                    y:196,
                    color: 'pik'
                },
                {
                    name: 'pik_7',
                    pos: 6,
                    y:196,
                    color: 'pik'
                },
                {
                    name: 'pik_8',
                    pos: 7,
                    y:196,
                    color: 'pik'
                },
                {
                    name: 'pik_9',
                    pos: 8,
                    y:196,
                    color: 'pik'
                },
                {
                    name: 'pik_10',
                    pos: 9,
                    y:196,
                    color: 'pik'
                },
                {
                    name: 'pik_walet',
                    pos: 10,
                    y:196,
                    color: 'pik'
                },
                {
                    name: 'pik_dama',
                    pos: 11,
                    y:196,
                    color: 'pik'
                },
                {
                    name: 'karo_2',
                    pos: 1,
                    y:294,
                    color: 'karo'
                },
                {
                    name: 'karo_3',
                    pos: 2,
                    y:294,
                    color: 'karo'
                },
                {
                    name: 'karo_4',
                    pos: 3,
                    y:294,
                    color: 'karo'
                },
                {
                    name: 'karo_5',
                    pos: 4,
                    y:294,
                    color: 'karo'
                },
                {
                    name: 'karo_6',
                    pos: 5,
                    y:294,
                    color: 'karo'
                },
                {
                    name: 'karo_7',
                    pos: 6,
                    y:294,
                    color: 'karo'
                },
                {
                    name: 'karo_8',
                    pos: 7,
                    y:294,
                    color: 'karo'
                },
                {
                    name: 'karo_9',
                    pos: 8,
                    y:294,
                    color: 'karo'
                },
                {
                    name: 'karo_10',
                    pos: 9,
                    y:294,
                    color: 'karo'
                },
                {
                    name: 'karo_walet',
                    pos: 10,
                    y:294,
                    color: 'karo'
                },
                {
                    name: 'karo_dama',
                    pos: 11,
                    y:294,
                    color: 'karo'
                }
            ]

            this.shuffle(that.deck)
           
           // zanzczona karta
            that.sellectedCard = null;
            that.sellectedPos = null;
            
            //puste miejsca
            that.freeSpace = []; 
            
            that.cards = [];
            var x = 270;
            var y = 20;
            var counter = 0;
            var counterCard = 0;
            var zIndex = 5;
            var place = 0;
            var passNextCard = false;
            var counterCorrect = 0;

            var cardCount = 0;
            
            //that.deck = this.add.sprite(1,1,'cards');

            // talia
            that.deckHand = this.add.image(120, 420,'revers');

            // puste miejsca
            var freeX = 20;
            var freeY = 20;
            for(var i = 0; i<8; i++){
                
                that.freeSpace[i] = this.add.rect(freeX,freeY,73,98, 'black', colors[2]);
                that.freeSpace[i].color = null;
                if(i<3){
                    freeY+=120
                }else if(i==3){
                    freeY = 20
                    freeX = 830;
                }
                else{
                    freeY += 120
                    freeX = 830;
                }
            }

            // rozdanie
            for(var i = 0; i<96; i++){
                var card = that.deck.shift();
               
                if(cardCount == 12){
                    that.hand.push(card);
                    
                    x = 270;
                    y = 20;
                    cardCount = 0;
                    place =0;
                    zIndex++;
                }

                else if(!passNextCard){
                    that.cards[counterCard] = this.add.sprite(1,1,'cards');
                    that.cards[counterCard].animations.add('card', 0, card.y, 73, 98, [card.pos]);
                    that.cards[counterCard].animations.play('card');
                    that.cards[counterCard].x = x;
                    that.cards[counterCard].y = y;
                    that.cards[counterCard].color = card.color;
                    that.cards[counterCard].kind = card.pos;
                    that.cards[counterCard].pos = counterCard % 12;
                    that.cards[counterCard].zIndex = zIndex;
                  
                    if((counterCard)%4==3){
                        x = 270;
                        y += 120;
                    }else{
                        x+=100;
                    }

                    counterCard++;
                    cardCount++;
                    place++;
                    
                    if(card.pos === cardCount){
                        passNextCard = true;
                    }
                }else if(passNextCard){
                    that.hand.push(card);
                    this.add.image(40, 600,'cards');
                    passNextCard = false;
                }
            }
             this.sortByIndex();

           
           //console.log(that.hand)

		},

        update: function(){
           //this.physic.collide(that.rects, that.rects, null, true)
            // that.moves();
            this.mouse.trigger(that.freeSpace, function(freeSpace){
                if(that.sellectedCard){
                    if(freeSpace.color === null && that.sellectedCard.kind === 1){
                        freeSpace.color = that.sellectedCard.color;
                        freeSpace.kind = that.sellectedCard.kind;
                        freeSpace.index = 5;
                        that.sellectedCard.zIndex = freeSpace.index;
                        
                        that.sellectedCard.moveToPoint(freeSpace.x + freeSpace.currentHalfWidth,freeSpace.y + freeSpace.currentHalfHeight,12, function(card){
                            that.sellectedCard = null;
                            that.sellectedPos = null;
                        })
                    }else if(freeSpace.color === that.sellectedCard.color && that.sellectedCard.kind > freeSpace.kind){
                        freeSpace.index++;
                        that.sellectedCard.zIndex = freeSpace.index;
                        that.game.sortByIndex();
                        
                        that.sellectedCard.moveToPoint(freeSpace.x + freeSpace.currentHalfWidth,freeSpace.y + freeSpace.currentHalfHeight,12, function(card){
                            that.sellectedCard = null;
                            that.sellectedPos = null;
                        })
                    }
                }else{
                    return that.game.mouse.trig = false;
                }
               
            }, true);
            
            this.mouse.trigger(that.cards, function(card){
                console.log(card)
                if(that.sellectedCard && that.sellectedPos == card.pos){
                    that.sellectedCard.y += 20;
                    that.sellectedCard = null;
                    that.sellectedPos = null;
                    return;
                }
                if(that.sellectedCard && that.sellectedPos != card.pos){
                    that.sellectedCard.y += 20;
                    that.sellectedCard = card;
                    that.sellectedCard.y -=20;
                    that.sellectedPos = card.pos;
                }else if(that.sellectedPos != card.pos){
                    that.sellectedCard = card;
                    that.sellectedPos = card.pos;
                    that.sellectedCard.y -=20;
                }
               
            }, true);

            this.mouse.trigger(that.deckHand, function(){
                var a = that.hand.pop();
                that.cards.push(this.game.add.sprite(220,420,'cards'));
                that.cards[that.cards.length-1].animations.add('card', 0, a.y, 73, 98, [a.pos]);
                that.cards[that.cards.length-1].animations.play('card');
                for(var i =0; i<that.cards.length-1; i++){
                    if(i % 12 == a.pos){
                        var v = 0;
                        that.cards[i].moveToPoint(350,470,12, function(card){
                            console.log(card)
                            card.x += v;
                            v+= 40;
                        })
                    }
                }
                
                
            }, true);

            
        }
        
	})

	return Grill;
})