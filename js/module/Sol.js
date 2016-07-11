define(['Class','module/Cards','module/Card'], function(my, Cards, Card){
	var that;

	var Sol = my.Class({

		constructor: function(){
            that = this;
            
            that.canTake = true;
            that.lastCardFromDeck = null;
            //      
            that.cardSelected = null; // karta jaka zostala zaznaczona po kliknieciu
            that.cardSelectedPos = null;
            
            that.nextButtonCard = null; // przycisk zmienia kolejnosc karty z reki (nastepna)
            that.prevButtonCard = null; // przycisk zmienia kolejnosc karty z reki (poprzednia)
            //
            that.bPutDown = null; // przycisk pozwalający odlozyć karty z reki na miejsce
            that.bPutUp = null; // przycisk pozwalający wziac wybrane karty jeszcze raz

            that.freePlayablePlace = []; // 
            // 
            that.cardDeck = []; // karty z ktorych wyciaga sie jedna
            that.cardPlayable = []; // karty rozlozone na srodku
            that.cardHand = []; // karty w reku
            //
            that.cardFreeCaps = []; // zaslepki w puste miejsca
            
            that.flashback = {
                cardFrom : [],
                cardTo: []
            }
            // ulozone karty
            that.cardsFree = [
                {
                    cardFree: [],
                    color: 'pik'
                },
                {
                    cardFree: [],
                    color: 'kier'
                },
                {
                    cardFree: [],
                    color: 'karo'
                },
                {
                    cardFree: [],
                    color: 'trefl'
                },
                {
                    cardFree: [],
                    color: 'pik'
                },
                {
                    cardFree: [],
                    color: 'kier'
                },
                {
                    cardFree: [],
                    color: 'karo'
                },
                {
                    cardFree: [],
                    color: 'trefl'
                }
            ]
		},

		create: function(){
            that.game = this; // przypisanie glownego obiektu "game" do tej classy

            that.allCards = new Cards().getAllCards(that.game.res.res.cardH); // wszystkie karty
            that.game.shuffle(that.allCards);
            that.deal(that.game.res.res.dealStartX, that.game.res.res.dealStartY, that.game.res.res.marginX, that.game.res.res.marginY, that.game.res.res.reversMarginX, that.game.res.res.reversMarginY);
             that.game.sortByIndex(); 
            that.freeCaps(that.game.res.res.freeStartX,that.game.res.res.freeStartY, that.game.res.res.marginX, that.game.res.res.marginY, that.game.res.res.maxFreeX);
            
            //var cc = new Card(that.game, 11,11,that.game.res.res.cardsImg);

            that.game.add.button("Powrót", that.game.canvas.width - 160, 30, 130, 70, that.backToMenu);

            that.game.add.button("Cofnij", that.game.canvas.width - 660, 30, 130, 70, that.useFlashback);
		},

        update: function(){
           that.game.mouse.trigger(that.cardPlayable, that.sellectCard, true);
        },
        
        backToMenu: function(){
            that.game.state.start("Menu");    
        },

        useFlashback: function(){
          
        },
        
        putCardToFreeSpace: function(freeSpace){
           
        },
        
        createCardInFreeSpace: function(card, newCard, zaslepka, freeTab){
           
        },
        
        reSortTab: function(arr){
         
        },
        
        checkWin: function(){
       
        },
        
        putDown: function(){
            var StartX = that.game.res.res.dealStartX;
            var StartY = that.game.res.res.dealStartY;
            var dane = that.getHandCards();
            that.canTake = false;

            console.log( that.getHandCards());
           
            if(that.bPutDown){
                that.bPutDown = that.bPutDown.destroy(that.bPutDown);
            }
            if(dane.cards.length === 0 && dane.king){
                that.addOneCardToDeck(dane.king);
                that.canTake = true;
                //that.sortByIndex(that.cardDeck);
                that.game.sortByIndex();
            }
            else if(dane.cards.length > 0){
                that.destroyHandButtons();
                for(var i =0, max=dane.cards.length; i<max; i++){
                    var card = dane.cards[i];
                    console.log(card)
                    var w = card.currentHalfWidth;
                    var h = card.currentHalfHeight;
                    var backToXPos = Math.floor(card.place % 3);
                    var backToYPos = Math.floor(card.place / 3);
                    
                    
                    // that.cardPlayable.push(that.game.add.sprite(card.x, card.y,that.game.res.res.cardsImg));
                    // that.cardPlayable[that.cardPlayable.length-1].animations.add('card', 0, card.frameY, that.game.res.res.cardW, that.game.res.res.cardH, [card.frame]);
                    // that.cardPlayable[that.cardPlayable.length-1].animations.play('card');
                    // that.cardPlayable[that.cardPlayable.length-1].color = card.color;
                    // that.cardPlayable[that.cardPlayable.length-1].frame = card.frame;
                    // that.cardPlayable[that.cardPlayable.length-1].frameY = card.frameY;
                    // that.cardPlayable[that.cardPlayable.length-1].name = card.name;
                    // that.cardPlayable[that.cardPlayable.length-1].zIndex = card.zIndex;
                    // that.cardPlayable[that.cardPlayable.length-1].place = card.place;
                    card.tab = 'playable';
                    // that.game.sortByIndex();

                    card.moveToPoint((that.game.res.res.marginX*backToXPos+StartX)+w, (that.game.res.res.marginY*backToYPos+StartY)+h, 7, function(card){
                        if(!that.bPutUp){
                            that.bPutUp =  that.game.add.button("Weź te same", that.game.canvas.width - that.game.res.res.maxFreeX, that.game.canvas.height - 320, 165, 60, that.putUp);
                            that.canTake = true;
                        }
                    });
                }
                
            }else{
                return;
            }
            // for(var i =0, max=that.cardHand.length; i<max; i++){
            //     that.cardHand[i].kill();
            // }
            // that.cardHand = []; 
        },

        putUp: function(){
          
        },
        
        sellectCard: function(card){
           if(that.cardSelected && ( that.cardSelected.tab ==='inFreeSpaceLeft' || that.cardSelected.tab ==='inFreeSpaceRight') && card.tab === that.cardSelected.tab){
                return that.unSellectCard(true);
            }
            if(that.cardSelected != card && that.cardSelected && that.cardSelectedPos == card.place && that.cardSelected.tab === 'hand' ){
                that.cardSelected.y += that.game.res.res.cardSellectedY;
                that.cardSelected = card;
                that.cardSelected.y -= that.game.res.res.cardSellectedY;
                that.cardSelectedPos = card.place;
                return;
            }else if(that.cardSelected && that.cardSelectedPos == card.place){
                return that.unSellectCard(true);
            }
           
            if(that.cardSelected && that.cardSelectedPos != card.place){
                that.cardSelected.y += that.game.res.res.cardSellectedY;
                that.cardSelected = card;
                that.cardSelected.y -= that.game.res.res.cardSellectedY;
                that.cardSelectedPos = card.place;
                that.destroyHandButtons();
                that.createHandButtons();
               
            }else if(that.cardSelectedPos != card.place){
                that.cardSelected = card;
                that.cardSelectedPos = card.place;
                that.cardSelected.y -= that.game.res.res.cardSellectedY;
                
                that.destroyHandButtons();
                that.createHandButtons();
            }
        },

        createFreePlayablePlace: function(place){
        
        },  

        replacePlayableCard: function(_place){
           
        },

        checkPlayableCards: function(place){
           
        },
        
        unSellectCard: function(bool){
         
        },
        
        createHandButtons: function(){
            if(that.cardSelected.tab === 'hand'){
                that.nextButtonCard = that.game.add.button('>>', 1550, that.cardSelected.y-80, 75, 45, that.moveCardNext);
                that.prevButtonCard = that.game.add.button("<<", 1450, that.cardSelected.y-80, 75, 45, that.moveCardPrev);
            }
        },
        
        destroyHandButtons: function(){
            if(that.nextButtonCard && that.prevButtonCard){
                that.nextButtonCard = that.nextButtonCard.destroy(that.nextButtonCard);
                that.prevButtonCard = that.prevButtonCard.destroy(that.prevButtonCard);
            }
        },
        
        moveCardNext: function(){
            var tempFirstCardX = that.cardSelected.x;
            var tempFirstCardIndex = that.cardSelected.zIndex;
           
            for(var i=0; i<that.cardPlayable.length; i++){
                var card = that.cardPlayable[i];
                if(card.tab === 'hand'){
                    var tempSecoundCardX = card.x;
                    var tempSecoundCardIndex = card.zIndex;
                    
                    if(tempFirstCardIndex < tempSecoundCardIndex){
                        that.cardSelected.x = card.x;
                        card.x = tempFirstCardX;
                        that.cardSelected.zIndex = tempSecoundCardIndex;
                        card.zIndex = tempFirstCardIndex;  
                        that.game.sortByIndex();
                        that.sortByIndex(that.cardHand);
                        //that.unSellectCard(true);
                        return;
                    }
                }
                
            }
        },
        
        moveCardPrev: function(){
            var tempFirstCardX = that.cardSelected.x;
            var tempFirstCardIndex = that.cardSelected.zIndex;
           
           for(var i=0; i<that.cardPlayable.length; i++){
                var card = that.cardPlayable[i];
                if(card.tab === 'hand'){
                    var tempSecoundCardX = card.x;
                    var tempSecoundCardIndex = card.zIndex;
                    
                    if(tempFirstCardIndex > tempSecoundCardIndex){
                        that.cardSelected.x = card.x;
                        card.x = tempFirstCardX;
                        that.cardSelected.zIndex = tempSecoundCardIndex;
                        card.zIndex = tempFirstCardIndex;  
                        that.game.sortByIndex();
                        that.sortByIndex(that.cardHand);
                        //that.unSellectCard(true);
                        return;
                    }
                }
            }
        },
        
        replaceHandCard: function(firstCard, secoundCard){
            var tempFirstCardX = firstCard.x;
            var tempFirstCardIndex = firstCard.zIndex;
            var tempSecoundCardX = secoundCard.x;
            var tempSecoundCardIndex = secoundCard.zIndex;
            firstCard.zIndex = tempSecoundCardIndex;
            secoundCard.zIndex = tempFirstCardIndex;     
            //   
            firstCard.moveToPoint(tempSecoundCardX + firstCard.currentHalfWidth,that.game.canvas.height - 240+107,7, null);
            //
            secoundCard.moveToPoint(tempFirstCardX + firstCard.currentHalfWidth,that.game.canvas.height - 240+107,7, null);
            
            that.game.sortByIndex();
            that.sortByIndex(that.cardHand);
     
            that.cardSelected.y += 20;
            that.cardSelected = null;
            that.cardSelectedPos = null;

            return;
        },

        getCardFromDeck: function(x, lastCard){
            var newCard= false; 
            var dane = that.getOneCardFromDeck();
            
            if(that.cardHand.length === 0 && that.canTake){
                if(that.bPutUp){
                    that.bPutUp = that.bPutUp.destroy(that.bPutUp);
                }
            
                if(lastCard){
                    var card = lastCard;
                    var v = that.game.res.res.putCardMargin - that.game.res.res.putCardMargin;
                }else{
                    var card = that.getOneCardFromDeck();
                    newCard = true;
                    var v = that.game.res.res.putCardMargin;
                }
                
                that.lastCardFromDeck = card;
                var w = card.currentHalfWidth;
                var h = card.currentHalfHeight;
               

                that.unSellectCard(true);
                //odslania jedna karte
                if(newCard){
                    card.x = that.game.canvas.width - that.game.res.res.putCardX;
                    card.zIndex = 5;
                    card.tab = 'hand';
                }
                
                //pobiera karty z okreslonej pozycji np (dwójki)
                for(var i =0, max=that.cardPlayable.length; i<max; i++){
                    if(that.cardPlayable[i].place === card.place && that.cardPlayable[i] != card && that.cardPlayable[i].tab ==='playable'){
                       var index = 6;
                        
                        // przesuwa wszystkie karty z danej grupy do reki gracza i usuwa je z tablicy cardPlayable 
                        // a dodaje do tablicy cardHand
                        that.cardPlayable[i].moveToPoint((that.game.canvas.width - that.game.res.res.putCardX)+w, (that.game.canvas.height - that.game.res.res.putCardY)+h,7, function(card){
                            card.tab = 'hand';
                            card.zIndex = index;
                            index++;
                            //
                            card.moveToPoint((that.cardPlayable[that.cardPlayable.length-1].x+v)+w, that.cardPlayable[that.cardPlayable.length-1].y+h, 4, null)
                            v+= that.game.res.res.putCardMargin;
                           
                            that.game.sortByIndex();

                            if(!that.bPutDown){
                                that.bPutDown = that.game.add.button("Odłóż", that.game.canvas.width - that.game.res.res.maxFreeX, that.game.canvas.height - 320, 145, 60, that.putDown);
                            }  
                        })    
                        
                    }
                    if(!that.bPutDown && card.frame == 12){
                        that.bPutDown = that.game.add.button("Odłóż", that.game.canvas.width - that.game.res.res.maxFreeX, that.game.canvas.height - 320, 145, 60, that.putDown);
                    }  
                     that.game.sortByIndex();
                }
                // if(lastCard){
    
                // }else{
                //      card.kill();
                // }
              
            }
        },
        
        // rozdanie kart
        deal: function(_x,_y, marginX, marginY, reversMarginX, reversMarginY){
            var x = _x;
            var y = _y;
            var passNextCard = false;
            var counterCard = 0;
            var cardCount = 0;
            var place = 0;
            var zIndex = 5;
            
            for(var i = 0; i<96; i++){
                var card = that.allCards.shift();

                that.cardPlayable[i] = that.game.add.sprite(1,1,that.game.res.res.cardsImg);
                that.cardPlayable[i].animations.add('card', 0, card.frameY, that.game.res.res.cardW, that.game.res.res.cardH, [card.frame]);
                that.cardPlayable[i].animations.play('card');
                that.cardPlayable[i].color = card.color;
                that.cardPlayable[i].frame = card.frame;
                that.cardPlayable[i].frameY = card.frameY;
                that.cardPlayable[i].name = card.name;
                
                
                
                if(i==95){
                    zIndex++;
                    that.cardPlayable[i].x = that.game.canvas.width - reversMarginX;
                    that.cardPlayable[i].y = that.game.canvas.height - reversMarginY;
                    that.cardPlayable[i].zIndex = zIndex;
                    that.cardPlayable[i].tab = 'deck';
                    that.cardPlayable[i].place = card.frame;
                   
                   
                    setTimeout(function(){
                        that.getCardFromDeck();
                    },700);
                  
                    return false;
                }
                if(cardCount == 12){
                    zIndex++;
                    that.cardPlayable[i].tab = 'deck';
                    that.cardPlayable[i].x = that.game.canvas.width - reversMarginX;
                    that.cardPlayable[i].y = that.game.canvas.height - reversMarginY;
                    that.cardPlayable[i].place = card.frame;
                    that.cardPlayable[i].zIndex = zIndex;
                    x = _x;
                    y = _y;
                    cardCount = 0;
                    place = 0;
                    
                }

                else if(!passNextCard){
                    that.cardPlayable[i].x = x;
                    that.cardPlayable[i].y = y;
                    that.cardPlayable[i].zIndex = zIndex;
                    that.cardPlayable[i].place = place;
                    that.cardPlayable[i].tab = 'playable';
                    
                    if((counterCard)%3==2){
                        x = _x;
                        y += marginY;
                    }else{
                        x+= marginX;
                    }

                    counterCard++;
                    cardCount++;
                    place++;
                    
                    if(card.frame === cardCount){
                        passNextCard = true;
                    }
                }else if(passNextCard){
                    zIndex++;
                    that.cardPlayable[i].tab = 'deck';
                    that.cardPlayable[i].place = card.frame;
                    that.cardPlayable[i].x = that.game.canvas.width - reversMarginX;
                    that.cardPlayable[i].y = that.game.canvas.height - reversMarginY;
                    that.cardPlayable[i].zIndex = zIndex;
                    //
                    passNextCard = false;
                }
            }
            
            that.game.sortByIndex();
        },
        
        // tworzy zaslepki
        freeCaps: function(_x,_y, marginX, marginY, max){
            var freeX = _x;
            var freeY = _y;
            var freePlace = 0;
            for(var i = 0; i<8; i++){            
                that.cardFreeCaps[i] = that.game.add.rect(freeX,freeY,that.game.res.res.cardW, that.game.res.res.cardH, 'black', "#DDFFAB");
                that.game.add.text(that.cardsFree[i].color, (freeX + that.game.res.res.cardW/2)-32 , freeY + that.game.res.res.cardH/2, 32, '#333', null)
                that.cardFreeCaps[i].color = null;
                that.cardFreeCaps[i].freePlace  = freePlace;
                if(i<3){
                    freeY+=marginY
                }else if(i==3){
                    freeY = _y
                    freeX = max;
                }
                else{
                    freeY += marginY
                    freeX = max;
                }
                freePlace++;
            }
        },
        
        sortByIndex: function(arr){
            arr.sort(function(obj1, obj2) {
                if(obj1.zIndex > obj2.zIndex)
                    return 1;
                else if(obj1.zIndex < obj2.zIndex) {
                    return -1;
                } else {
                    return 0;
                }
            });
        },

        getOneCardFromDeck: function(){
            var tempArray = [];
            for(var i=0; i<that.cardPlayable.length; i++){
                var card = that.cardPlayable[i];
                if(card.tab === 'deck'){
                    tempArray.push(card);
                }
            }
           // this.sortByIndex(tempArray);
            return tempArray[tempArray.length-1]
        },

        addOneCardToDeck: function(card){
            var tempArray = [];
            card.tab = 'deck';

            for(var i=0; i<that.cardPlayable.length; i++){
                var card = that.cardPlayable[i];
                if(card.tab === 'deck'){
                    tempArray.push(card);
                }
            }
            tempArray.unshift(card);     
        },  

        getHandCards: function(){
            var result = {};
            result.king = false;
            result.cards = null;
            
            var tempArray = [];
            for(var i=0; i<that.cardPlayable.length; i++){
                var card = that.cardPlayable[i];
                if(card.tab === 'hand'){
                    tempArray.push(card);
                }
            }
          	if(tempArray.length === 1){
                if(tempArray[0].frame === 12){
                    result.king = tempArray[0];
                }
            }
            result.cards = tempArray; 

            return result;
        },  
	})

	return Sol;
})
