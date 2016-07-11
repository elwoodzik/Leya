define(['Class','module/Cards','module/Card'], function(my, Cards, Card){
	var that;

	var Solitaire = my.Class({

		constructor: function(){
            that = this;
            
            that.canUseFlashBack = true; // cofniecie mozna uzyc ponownie dopiero po dotarciu karty na miejsce
            that.canTake = true; // czy mozna wyciagnac nowa karte
            that.lastCardFromDeck = null;
            //      
            that.canUseSelect = true;
            that.cardSelected = null; // karta jaka zostala zaznaczona po kliknieciu
            that.cardSelectedPos = null;
            
            that.showPlayableCardsLenghtInDeck = null; // pokazuje ile kart zostalo w kupce do wyciagniecia
            that.showPlayableCardsLenght = null; // pokazuje ilosc kart z danej kupki

            that.nextButtonCard = null; // przycisk zmienia kolejnosc karty z reki (nastepna)
            that.prevButtonCard = null; // przycisk zmienia kolejnosc karty z reki (poprzednia)

            that.lastButtonCard = null; // przycisk zmienia kolejnosc karty z reki (nastepna)
            that.firstButtonCard = null; // przycisk zmienia kolejnosc karty z reki (poprzednia)
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
            //
            that.game.options = that.game.loadData('options');
            //
            that.allCards = new Cards().getAllCards(that.game.res.res.cardH); // wszystkie karty
            that.game.shuffle(that.allCards);
            that.deal(that.game.res.res.dealStartX, that.game.res.res.dealStartY, that.game.res.res.marginX, that.game.res.res.marginY, that.game.res.res.reversMarginX, that.game.res.res.reversMarginY);
            that.freeCaps(that.game.res.res.freeStartX,that.game.res.res.freeStartY, that.game.res.res.marginX, that.game.res.res.marginY, that.game.res.res.maxFreeX);
            
            //var cc = new Card(that.game, 11,11,that.game.res.res.cardsImg);
            that.getCardsLengthInDeck();
            that.game.add.button("Powrót", that.game.canvas.width - 180, 30, 150, 70, '#cccccc','white','white', that.backToMenu);
		},

        update: function(){
            that.game.mouse.trigger(that.cardFreeCaps, that.putCardToFreeSpace, true);
            that.game.mouse.trigger(that.cardDeck, that.getCardFromDeck, true);
            for(var i=0; i<8; i++){
                that.game.mouse.trigger(that.cardsFree[i].cardFree, that.sellectCard, true);
            }
            that.game.mouse.trigger(that.cardPlayable, that.sellectCard, true);
            that.game.mouse.trigger(that.cardHand, that.sellectCard, true);
            that.game.mouse.trigger(that.freePlayablePlace, that.replacePlayableCard, true);
        },
        
        backToMenu: function(){
            that.game.state.start("Menu");    
        },

        destroyFlashBackArray: function(){
            that.flashback.cardTo = [];
            that.flashback.cardFrom = [];
            if(that.bBack){
                that.bBack = that.bBack.destroy(that.bBack);
            }
        },

        useFlashback: function(){
            console.log(that.flashback)
            if(that.canUseFlashBack && that.flashback.cardTo.length > 0 && that.flashback.cardFrom.length > 0){
                var cardTo = that.flashback.cardTo.pop();
                var cardFrom = that.flashback.cardFrom.pop();
                that.canUseFlashBack = false;
            
                if(cardFrom.tab === 'playable' && cardTo.tab === 'playable'){ 
                    var _place = cardTo.place;
                    cardTo.place = cardFrom.place;

                    that.destroyFreePlace(cardFrom)
                    that.createFreePlayablePlace(_place);

                    cardTo.moveToPoint(cardFrom.x + cardFrom.currentHalfWidth, cardFrom.y + cardFrom.currentHalfHeight, 7, function(card){
                        that.canUseFlashBack = true;
                    })
                    
                }
                else if((cardFrom.tab === 'inFreeSpaceLeft' || cardFrom.tab === 'inFreeSpaceRight') && (cardTo.tab === 'inFreeSpaceRight' || cardTo.tab === 'inFreeSpaceLeft')){
                    var t = that.cardsFree[cardTo.freeTab].cardFree
                    var c = that.cardsFree[cardFrom.freeTab].cardFree;
                        c.push(that.game.add.sprite(cardTo.x, cardTo.y,that.game.res.res.cardsImg));
                        c[c.length-1].animations.add('card', 0, cardFrom.frameY, that.game.res.res.cardW, that.game.res.res.cardH, [cardFrom.frame]);
                        c[c.length-1].animations.play('card');
                        c[c.length-1].color = cardFrom.color;
                        c[c.length-1].frame = cardFrom.frame;
                        c[c.length-1].frameY = cardFrom.frameY;
                        c[c.length-1].name = cardFrom.name;
                        c[c.length-1].zIndex = cardFrom.zIndex;
                        c[c.length-1].place = cardFrom.place;
                        c[c.length-1].tab = cardFrom.tab;
                        c[c.length-1].freeTab = cardFrom.freeTab;
                   
                    // if(cardTo.freeTab >= 0){
                    //     console.log('sdasdasd')
                    //     cardTo.destroy(that.cardsFree[cardTo.freeTab].cardFree);
                    // }
                    t[t.length-1].destroy(t);
                   
                    c[c.length-1].moveToPoint(cardFrom.x + cardFrom.currentHalfWidth, cardFrom.y + cardFrom.currentHalfHeight, 7, function(card){
                        that.canUseFlashBack = true;
                        console.log(that.cardsFree)
                    })

                    console.log('dsfdsfsdf23232')
                    
                   
                   
                    that.unSellectCard(true);
                    that.game.sortByIndex();
                }
                else if(cardFrom.tab === 'playable' && cardTo.tab != 'playable'){
                    var lastX =  cardFrom.x;
                    var lastY =  cardFrom.y;
                    cardFrom.x = cardTo.x
                    cardFrom.y = cardTo.y
                    that.cardPlayable.push(cardFrom);
                    that.game.gameObject.push(cardFrom)
                  
                      
                   that.destroyFreePlace(cardFrom)
                    // if(that.checkPlayableCards(cardTo.place) === 0 ){
                    //     console.log('dsfdsfsdf')
                       
                    //     that.createFreePlayablePlace(cardTo.place);
                    // }
                    
                    
                    //that.createFreePlayablePlace(cardTo.place);
                   
                   
                    if(cardTo.freeTab >= 0){
                        cardTo.destroy(that.cardsFree[cardTo.freeTab].cardFree);
                    }
                     
                    // else{
                    //     console.log('SKASOWANY')
                    //     cardTo.destroy(that.cardPlayable);
                    // }

                    that.cardPlayable[that.cardPlayable.length-1].moveToPoint(lastX + cardFrom.currentHalfWidth, lastY + cardFrom.currentHalfHeight, 7, function(){
                        that.canUseFlashBack = true;
                    })
                    that.unSellectCard(true);
                    that.game.sortByIndex();
                }
                else if(cardFrom.tab === 'hand'){
                    var c = that.cardsFree[cardTo.freeTab].cardFree;

                    that.cardHand.push(that.game.add.sprite(cardTo.x, cardTo.y,that.game.res.res.cardsImg));
                    that.cardHand[that.cardHand.length-1].animations.add('card', 0, cardFrom.frameY, that.game.res.res.cardW, that.game.res.res.cardH, [cardFrom.frame]);
                    that.cardHand[that.cardHand.length-1].animations.play('card');
                    that.cardHand[that.cardHand.length-1].color = cardFrom.color;
                    that.cardHand[that.cardHand.length-1].frame = cardFrom.frame;
                    that.cardHand[that.cardHand.length-1].frameY = cardFrom.frameY;
                    that.cardHand[that.cardHand.length-1].name = cardFrom.name;
                    that.cardHand[that.cardHand.length-1].zIndex = cardFrom.zIndex;
                    that.cardHand[that.cardHand.length-1].place = cardFrom.place;
                    that.cardHand[that.cardHand.length-1].tab = 'hand';
                     //console.log(that.cardHand[that.cardHand.length-1].zIndex + "cof")
                    for(var i=0; i<that.cardHand.length; i++){
                        var card = that.cardHand[i];
                    
                        var tempSecoundCardIndex = card.zIndex;
                        
                        if(that.cardHand[that.cardHand.length-1].zIndex < tempSecoundCardIndex && that.cardHand[that.cardHand.length-1] != card){             
                            card.x += 50;
                            //card.zIndex++;
                        }
                    }
                
               
                    
                    c[c.length-1].destroy(c);
                    
                    that.unSellectCard(true);
                    that.cardHand[that.cardHand.length-1].moveToPoint(cardFrom.x + cardFrom.currentHalfWidth, cardFrom.y + cardFrom.currentHalfHeight, 7,  function(){
                        that.canUseFlashBack = true;
                        //that.sortByIndex(that.cardsFree[0].cardFree);
                    });
                    that.game.sortByIndex();
                    that.sortByIndex(that.cardHand);

                   
                }
                //console.log(that.flashback.cardTo.length)
                //console.log(that.flashback.cardTo.length)
                if(that.flashback.cardTo.length === 0 && that.flashback.cardFrom.length === 0){
                    //console.log('a')
                    that.bBack = that.bBack.destroy();
                }
                 
            }

        },
        
        putCardToFreeSpace: function(freeSpace){
            var cardFreeLength = that.cardsFree[freeSpace.freePlace].cardFree.length;
            if(that.cardSelected && that.cardSelected.tab != 'inFreeSpace'){
                if(freeSpace.freePlace < 4){
                    console.log('od dwojek do krola');
                    // jezeli to pierwsza karta (2) polozona na puste pole
                    if(cardFreeLength === 0){
                        if(that.cardSelected.frame === 1){
                            if(that.cardsFree[freeSpace.freePlace].color == that.cardSelected.color ){
                                that.unSellectCard(false);
                                that.createCardInFreeSpace(that.cardSelected, that.cardsFree[freeSpace.freePlace].cardFree, freeSpace, freeSpace.freePlace);
                                that.cardSelected = null;
                                that.cardSelectedPos = null;
                            }  
                        }
                        
                    }else if(that.cardsFree[freeSpace.freePlace].cardFree[cardFreeLength-1].frame === that.cardSelected.frame-1 &&
                        that.cardsFree[freeSpace.freePlace].cardFree[cardFreeLength-1].color === that.cardSelected.color ) {
                        that.unSellectCard(false);
                        that.createCardInFreeSpace(that.cardSelected, that.cardsFree[freeSpace.freePlace].cardFree, freeSpace, freeSpace.freePlace);
                        that.cardSelected = null;
                        that.cardSelectedPos = null;
                    }
                }else{
                     if(cardFreeLength === 0){
                        console.log('od damy do asa');
                        if(that.cardSelected.frame === 11){
                            // sprawdzenie czy karta o danym kolorze jest juz polozona
                            if(that.cardsFree[freeSpace.freePlace].color == that.cardSelected.color){
                                that.unSellectCard(false);
                                that.createCardInFreeSpace(that.cardSelected, that.cardsFree[freeSpace.freePlace].cardFree, freeSpace, freeSpace.freePlace);
                                that.cardSelected = null;
                                that.cardSelectedPos = null;
                            }  
                        }
                     }
                     else if(that.cardsFree[freeSpace.freePlace].cardFree[cardFreeLength-1].frame === that.cardSelected.frame+1 &&
                        that.cardsFree[freeSpace.freePlace].cardFree[cardFreeLength-1].color === that.cardSelected.color ) {
                        that.unSellectCard(false);
                        that.createCardInFreeSpace(that.cardSelected, that.cardsFree[freeSpace.freePlace].cardFree, freeSpace, freeSpace.freePlace);
                        that.cardSelected = null;
                        that.cardSelectedPos = null;
                    }
                }
            }else{
                return that.game.mouse.trig = false;
            }
        },
        
        createCardInFreeSpace: function(card, newCard, zaslepka, freeTab){
            var w = card.currentHalfWidth;
            var h = card.currentHalfHeight;
            that.canUseSelect = false;

            that.flashback.cardFrom.push(card);
            newCard.push(that.game.add.sprite(card.x,card.y+20,that.game.res.res.cardsImg));
            newCard[newCard.length-1].animations.add('card', 0, card.frameY, that.game.res.res.cardW, that.game.res.res.cardH, [card.frame]);
            newCard[newCard.length-1].animations.play('card');
            newCard[newCard.length-1].color = card.color;
            newCard[newCard.length-1].frame = card.frame;
            newCard[newCard.length-1].frameY = card.frameY;
            newCard[newCard.length-1].name = card.name;
            newCard[newCard.length-1].zIndex = newCard.length+5;
            newCard[newCard.length-1].place = card.place;
            newCard[newCard.length-1].tab = freeTab < 4 ? 'inFreeSpaceLeft' : 'inFreeSpaceRight';
            newCard[newCard.length-1].freeTab = freeTab;
                        
            newCard[newCard.length-1].moveToPoint(zaslepka.x+w, zaslepka.y+h, 7, function(card){
                 that.sortByIndex(that.cardPlayable);
                 that.checkWin();
                 that.canUseSelect = true;
            });

            that.flashback.cardTo.push(newCard[newCard.length-1]);
            
            //
            if(card.tab === 'playable'){
                 card.destroy(that.cardPlayable);
            }
            else if(card.tab === 'hand'){
                 card.destroy(that.cardHand);
                 that.reSortTab(that.cardHand);
            }
            else if(card.tab === 'inFreeSpaceLeft' || card.tab === 'inFreeSpaceRight'){
                 card.destroy(that.cardsFree[card.freeTab].cardFree);
            }
            //
            if(!that.bBack){
                that.bBack = that.game.add.button("Cofnij", that.game.canvas.width - 860, 30, 150, 70, '#cccccc','white','white', that.useFlashback);
            }
            
            that.createFreePlayablePlace(card.place);
            
            that.game.sortByIndex();
        },
        
        reSortTab: function(arr){
            var v = 0;
            for(var i=0; i<arr.length; i++){
                card = arr[i];
                card.x = that.game.canvas.width - that.game.res.res.putCardX + v;
                v+=that.game.res.res.putCardMargin
            }  
        },
        
        checkWin: function(){
            var availableCard = that.cardPlayable.length + that.cardHand.length;
            
            if(availableCard === 0){
                alert('Wygrałeś');
                return that.game.state.start("Menu");
            }
            //console.log(availableCard);
        },
        
        putDown: function(){
            var StartX = that.game.res.res.dealStartX;
            var StartY = that.game.res.res.dealStartY;
            that.canTake = false;
            that.destroyFlashBackArray();
            that.canUseSelect = false;

            if(that.bPutDown){
                that.bPutDown = that.bPutDown.destroy(that.bPutDown);
            }


            if(that.cardHand.length === 1 && that.cardHand[0].frame === 12){
                that.cardDeck.unshift(that.game.add.image(that.game.canvas.width - that.game.res.res.maxFreeX, that.game.canvas.height - that.game.res.res.putCardY, that.game.res.res.reversImg));
                that.cardDeck[0].color = that.cardHand[0].color;
                that.cardDeck[0].frame = that.cardHand[0].frame;
                that.cardDeck[0].frameY = that.cardHand[0].frameY;
                that.cardDeck[0].name = that.cardHand[0].name;
                that.cardDeck[0].zIndex = 4;
                that.cardDeck[0].place = that.cardHand[0].place;
                that.cardDeck[0].tab = 'deck';
                that.canTake = true;
                that.sortByIndex(that.cardDeck);
                that.game.sortByIndex();
                that.getCardsLengthInDeck();
            }
            else if(that.cardHand.length > 0){
                that.destroyHandButtons();
                for(var i =0, max=that.cardHand.length; i<max; i++){
                    var card = that.cardHand[i];
                    var w = card.currentHalfWidth;
                    var h = card.currentHalfHeight;
                    var backToXPos = Math.floor(card.place % 3);
                    var backToYPos = Math.floor(card.place / 3);
                    
                    that.cardPlayable.push(that.game.add.sprite(card.x, card.y,that.game.res.res.cardsImg));
                    that.cardPlayable[that.cardPlayable.length-1].animations.add('card', 0, card.frameY, that.game.res.res.cardW, that.game.res.res.cardH, [card.frame]);
                    that.cardPlayable[that.cardPlayable.length-1].animations.play('card');
                    that.cardPlayable[that.cardPlayable.length-1].color = card.color;
                    that.cardPlayable[that.cardPlayable.length-1].frame = card.frame;
                    that.cardPlayable[that.cardPlayable.length-1].frameY = card.frameY;
                    that.cardPlayable[that.cardPlayable.length-1].name = card.name;
                    that.cardPlayable[that.cardPlayable.length-1].zIndex = card.zIndex;
                    that.cardPlayable[that.cardPlayable.length-1].place = card.place;
                    that.cardPlayable[that.cardPlayable.length-1].tab = 'playable';
                    that.game.sortByIndex();

                    that.cardPlayable[that.cardPlayable.length-1].moveToPoint((that.game.res.res.marginX*backToXPos+StartX)+w, (that.game.res.res.marginY*backToYPos+StartY)+h, 7, function(card){
                        if(!that.bPutUp){
                            that.bPutUp =  that.game.add.button("Weź", that.game.canvas.width - that.game.res.res.maxFreeX, that.game.canvas.height - 320, 145, 60, '#cccccc','white','white', that.putUp);
                            that.canTake = true;
                            that.canUseSelect = true;
                        }
                    });
                }
                
            }else{
                return;
            }
            for(var i =0, max=that.cardHand.length; i<max; i++){
                that.cardHand[i].kill();
            }
            that.cardHand = [];
        },

        putUp: function(){
            if(that.bPutUp){
                that.bPutUp = that.bPutUp.destroy(that.bPutUp);
            }
            
            that.getCardFromDeck(null,that.lastCardFromDeck);
            that.canTake = false
        },
        
        sellectCard: function(card){
            if(that.canUseSelect){
                if(that.showPlayableCardsLenght){
                    that.showPlayableCardsLenght.destroy();
                    that.showPlayableCardsLenght = null;
                }

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
                    that.getCardsLength();
                    that.destroyHandButtons();
                    that.createHandButtons();
                   
                }else if(that.cardSelectedPos != card.place){
                    that.cardSelected = card;
                    that.cardSelectedPos = card.place;
                    that.cardSelected.y -= that.game.res.res.cardSellectedY;
                    that.getCardsLength();
                    that.destroyHandButtons();
                    that.createHandButtons();
                }
            }
            
        },

        createFreePlayablePlace: function(place){
            console.log(that.checkPlayableCards(place));

            if(that.checkPlayableCards(place) === 0 ){
                var StartX = that.game.res.res.dealStartX;
                var StartY = that.game.res.res.dealStartY;
                var posX = Math.floor(place % 3);
                var posY = Math.floor(place / 3);
                that.freePlayablePlace.push(that.game.add.rect( (that.game.res.res.marginX*posX+StartX), (that.game.res.res.marginY*posY+StartY), that.game.res.res.cardW, that.game.res.res.cardH, 'black', "#00ff14"));
                that.freePlayablePlace[that.freePlayablePlace.length-1].place = place;
            
                that.game.sortByIndex();
            }
        }, 

        destroyFreePlace: function(card){
             
            for(var i=0; i<that.freePlayablePlace.length; i++ ){
                var _place = that.freePlayablePlace[i];

                if(_place.place === card.place){
                     console.log(_place)
                    _place.destroy(that.freePlayablePlace)                
                }
            }
           
             that.game.sortByIndex();
        },  

        replacePlayableCard: function(_place){
            var place = _place.place;
            var sellectPlace = that.cardSelected.place;
            var StartX = that.game.res.res.dealStartX;
            var StartY = that.game.res.res.dealStartY;
            
            var posX = Math.floor(place % 3);
            var posY = Math.floor(place / 3);

            if(that.cardSelected && (that.cardSelected.tab === 'playable' || that.cardSelected.tab === 'hand')){
                var w = that.cardSelected.currentHalfWidth;
                var h = that.cardSelected.currentHalfHeight;
                that.canUseSelect = false;
               
                
                that.flashback.cardFrom.push({
                    tab: that.cardSelected.tab,
                    frameY: that.cardSelected.frameY,
                    frame : that.cardSelected.frame,
                    color : that.cardSelected.color,
                    name : that.cardSelected.name,
                    zIndex : that.cardSelected.zIndex,
                    place : that.cardSelected.place,
                    x : that.cardSelected.x,
                    y : that.cardSelected.y,
                    currentHalfWidth : that.cardSelected.currentHalfWidth,
                    currentHalfHeight : that.cardSelected.currentHalfHeight +50
                });

                 that.cardSelected.place = place;

                that.cardSelected.moveToPoint((that.game.res.res.marginX*posX+StartX)+w, (that.game.res.res.marginY*posY+StartY)+h, 7, function(card){
                    
                    that.flashback.cardTo.push(card);
                    that.canUseSelect = true;
                });

                _place.destroy(that.freePlayablePlace);
                that.createFreePlayablePlace(sellectPlace);
               
                
                that.unSellectCard(true);
                
                that.game.sortByIndex();
            }else {
                return false;
            }
        },

        checkPlayableCards: function(place){
            var availablePlace = 0;
          
                for(var i = 0; i<that.cardPlayable.length; i++){
                    var card = that.cardPlayable[i];
                    
                    if(card.place === place){
                        availablePlace++;
                    }
                }
          
                for(var i = 0; i<that.cardHand.length; i++){
                    var card = that.cardHand[i];
                    
                    if(card.place === place){
                        availablePlace++;
                    }
                }
            
            
            return availablePlace;
        },
        
        unSellectCard: function(bool){
            if(that.cardSelected){
                that.cardSelected.y += that.game.res.res.cardSellectedY;
                that.cardSelected = bool ? null : that.cardSelected;
                that.cardSelectedPos = bool ? null : that.cardSelectedPos;
                that.destroyHandButtons();

                if(that.showPlayableCardsLenght){
                    that.showPlayableCardsLenght.destroy();
                    that.showPlayableCardsLenght = null;
                }
                return;
            }
        },
        
        createHandButtons: function(){
            if(that.cardSelected.tab === 'hand'){
                that.nextButtonCard = that.game.add.button('>', 1555, that.cardSelected.y-80, 80, 55, '#cccccc','white','white', that.moveCardNext);
                that.prevButtonCard = that.game.add.button("<", 1445, that.cardSelected.y-80, 80, 55, '#cccccc','white','white', that.moveCardPrev);
                that.lastButtonCard = that.game.add.button('>>', 1690, that.cardSelected.y-80, 80, 55, '#cccccc','white','white', that.moveCardLast);
                that.firstButtonCard = that.game.add.button("<<", 1310, that.cardSelected.y-80, 80, 55, '#cccccc','white','white', that.moveCardFirst);
            }
        },
        
        destroyHandButtons: function(){
            if(that.nextButtonCard && that.prevButtonCard){
                that.nextButtonCard = that.nextButtonCard.destroy(that.nextButtonCard);
                that.prevButtonCard = that.prevButtonCard.destroy(that.prevButtonCard);
                that.lastButtonCard = that.lastButtonCard.destroy(that.lastButtonCard);
                that.firstButtonCard = that.firstButtonCard.destroy(that.firstButtonCard);
            }
        },
        
        moveCardNext: function(){
            var tempFirstCardX = that.cardSelected.x;
            var tempFirstCardIndex = that.cardSelected.zIndex;
           
            for(var i=0; i<that.cardHand.length; i++){
                var card = that.cardHand[i];
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
        },

        moveCardLast: function(){
            var tempFirstCardX = that.cardSelected.x;
            var tempFirstCardIndex = that.cardSelected.zIndex;
            var tempLastCardIndex = that.cardHand[that.cardHand.length-1].zIndex;
            
            for(var i=0; i<that.cardHand.length; i++){
                var card = that.cardHand[i];
                var tempSecoundCardX = card.x;
                var tempSecoundCardIndex = card.zIndex;
                
                if(tempFirstCardIndex < tempSecoundCardIndex &&  that.cardSelected != card){
                    that.cardSelected.x = that.cardHand[that.cardHand.length-1].x;
                    card.x -= 50 ;
                    card.zIndex--;
                }
            }
            that.cardSelected.zIndex = tempLastCardIndex;
            that.game.sortByIndex();
            that.sortByIndex(that.cardHand);
        },

        moveCardFirst: function(){
            var tempFirstCardX = that.cardSelected.x;
            var tempFirstCardIndex = that.cardSelected.zIndex;
            var FirstCardIndex = that.cardHand[0].zIndex;
            var FirstCardX = that.cardHand[0].x;
            
            for(var i=0; i<that.cardHand.length; i++){
                var card = that.cardHand[i];
                var tempSecoundCardX = card.x;
                var tempSecoundCardIndex = card.zIndex;
                
                if(tempFirstCardIndex >= tempSecoundCardIndex &&  that.cardSelected != card){
                    that.cardSelected.x = FirstCardX;
                    card.x += 50 ;
                    card.zIndex++;
                }
            }

            that.cardSelected.zIndex = FirstCardIndex;
            that.game.sortByIndex();
            that.sortByIndex(that.cardHand);
        },
        
        moveCardPrev: function(){
            var tempFirstCardX = that.cardSelected.x;
            var tempFirstCardIndex = that.cardSelected.zIndex;
           
            for(var i=that.cardHand.length-1; i>=0; i--){
                var card = that.cardHand[i];
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
        
            if(that.cardHand.length === 0 && that.canTake){
                that.useSounds('cardPlace3');
                that.canUseSelect = false;
                if(that.bPutUp){
                    that.bPutUp = that.bPutUp.destroy(that.bPutUp);
                }
                
                if(lastCard){
                    var card = lastCard;
                    var v = that.game.res.res.putCardMargin - that.game.res.res.putCardMargin;
                   
                }else{
                    var card = that.cardDeck.pop();
                    that.getCardsLengthInDeck();
                    newCard = true;
                    var v = that.game.res.res.putCardMargin;
                }
                
                that.lastCardFromDeck = card;
                var w = card.currentHalfWidth;
                var h = card.currentHalfHeight;
               

                that.unSellectCard(true);
                //odslania jedna karte
                if(newCard){
                    that.cardHand.push(that.game.add.sprite(that.game.canvas.width - that.game.res.res.putCardX, that.game.canvas.height - that.game.res.res.putCardY,that.game.res.res.cardsImg));
                    that.cardHand[that.cardHand.length-1].animations.add('card', 0, card.frameY, that.game.res.res.cardW, that.game.res.res.cardH, [card.frame]);
                    that.cardHand[that.cardHand.length-1].animations.play('card');
                    
                    that.cardHand[that.cardHand.length-1].color = card.color;
                    that.cardHand[that.cardHand.length-1].frame = card.frame;
                    that.cardHand[that.cardHand.length-1].frameY = card.frameY;
                    that.cardHand[that.cardHand.length-1].name = card.name;
                    that.cardHand[that.cardHand.length-1].zIndex = 5;
                    that.cardHand[that.cardHand.length-1].place = card.place;
                    that.cardHand[that.cardHand.length-1].tab = 'hand';
                }
                
                //pobiera karty z okreslonej pozycji np (dwójki)
                for(var i =0, max=that.cardPlayable.length; i<max; i++){
                    if(that.cardPlayable[i].place === card.place){
                        //
                        var index = 6;
                        // przesuwa wszystkie karty z danej grupy do reki gracza i usuwa je z tablicy cardPlayable 
                        // a dodaje do tablicy cardHand
                        that.cardPlayable[i].moveToPoint((that.game.canvas.width - that.game.res.res.putCardX)+w, (that.game.canvas.height - that.game.res.res.putCardY)+h,7, function(card){
                            that.cardHand.push(that.game.add.sprite(that.game.canvas.width - that.game.res.res.putCardX, that.game.canvas.height - that.game.res.res.putCardY,that.game.res.res.cardsImg));
                            that.cardHand[that.cardHand.length-1].animations.add('card', 0, card.frameY, that.game.res.res.cardW, that.game.res.res.cardH, [card.frame]);
                            that.cardHand[that.cardHand.length-1].animations.play('card');
                            //that.cardHand[that.cardHand.length-1].x += v;
                            that.cardHand[that.cardHand.length-1].color = card.color;
                            that.cardHand[that.cardHand.length-1].frame = card.frame;
                            that.cardHand[that.cardHand.length-1].frameY = card.frameY;
                            that.cardHand[that.cardHand.length-1].name = card.name;
                            that.cardHand[that.cardHand.length-1].zIndex = index;
                            that.cardHand[that.cardHand.length-1].place = card.place;
                            that.cardHand[that.cardHand.length-1].tab = 'hand';
                           
                            index++;
                            that.cardHand[that.cardHand.length-1].moveToPoint((that.cardHand[that.cardHand.length-1].x+v)+w, that.cardHand[that.cardHand.length-1].y+h, 4, function(){

                            })

                            

                            v+= that.game.res.res.putCardMargin;
                            card.destroy(that.cardPlayable);
                           
                            that.game.sortByIndex();
                            that.sortByIndex(that.cardHand);
                            
                            if(!that.bPutDown){
                                that.bPutDown = that.game.add.button("Odłóż", that.game.canvas.width - that.game.res.res.maxFreeX, that.game.canvas.height - 320, 145, 60,'#cccccc','white','white', that.putDown);
                            }  

                            //console.log(that.cardHand[that.cardHand.length-1].zIndex)
                        })    
                        
                    }
                    if(!that.bPutDown && card.frame == 12){
                        that.bPutDown = that.game.add.button("Odłóż", that.game.canvas.width - that.game.res.res.maxFreeX, that.game.canvas.height - 320, 145, 60,'#cccccc','white','white', that.putDown);
                    } 
                    setTimeout(function(){
                        that.canUseSelect = true;
                    }, 400); 
                    
                }
                if(lastCard){
    
                }else{
                     card.kill();
                }
              
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
                
                if(i==95){
                    setTimeout(function(){
                        zIndex++;
                        that.cardDeck.push(that.game.add.image(that.game.canvas.width - reversMarginX, that.game.canvas.height - reversMarginY, that.game.res.res.reversImg));
                        that.cardDeck[that.cardDeck.length-1].color = card.color;
                        that.cardDeck[that.cardDeck.length-1].frame = card.frame;
                        that.cardDeck[that.cardDeck.length-1].frameY = card.frameY;
                        that.cardDeck[that.cardDeck.length-1].name = card.name;
                        that.cardDeck[that.cardDeck.length-1].zIndex = zIndex;
                        that.cardDeck[that.cardDeck.length-1].place = card.frame;
                        that.cardDeck[that.cardDeck.length-1].tab = 'deck';

                        
                        that.getCardFromDeck();
                    }, 10);
                    
                    that.game.sortByIndex();
                    return false;
                }
                if(cardCount == 12){
                    zIndex++;
                    that.cardDeck.push(that.game.add.image(that.game.canvas.width - reversMarginX, that.game.canvas.height - reversMarginY, that.game.res.res.reversImg));
                    that.cardDeck[that.cardDeck.length-1].color = card.color;
                    that.cardDeck[that.cardDeck.length-1].frame = card.frame;
                    that.cardDeck[that.cardDeck.length-1].frameY = card.frameY;
                    that.cardDeck[that.cardDeck.length-1].name = card.name;
                    that.cardDeck[that.cardDeck.length-1].zIndex = zIndex;
                    that.cardDeck[that.cardDeck.length-1].place = card.frame;
                    that.cardDeck[that.cardDeck.length-1].tab = 'deck';

                    //that.cardDeck[that.cardDeck.length-1].pos = card.pos % 12;
                    x = _x;
                    y = _y;
                    cardCount = 0;
                    place = 0;
                    
                }

                else if(!passNextCard){
                    that.cardPlayable[counterCard] = that.game.add.sprite(1,1,that.game.res.res.cardsImg);
                    that.cardPlayable[counterCard].animations.add('card', 0, card.frameY, that.game.res.res.cardW, that.game.res.res.cardH, [card.frame]);
                    that.cardPlayable[counterCard].animations.play('card');
                    that.cardPlayable[counterCard].x = x;
                    that.cardPlayable[counterCard].y = y;
                    
                    that.cardPlayable[counterCard].color = card.color;
                    that.cardPlayable[counterCard].frame = card.frame;
                    that.cardPlayable[counterCard].frameY = card.frameY;
                    that.cardPlayable[counterCard].name = card.name;
                    that.cardPlayable[counterCard].zIndex = zIndex;
                    that.cardPlayable[counterCard].place = place;
                    that.cardPlayable[counterCard].tab = 'playable';
                    
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
                    that.cardDeck.push(that.game.add.image(that.game.canvas.width - reversMarginX, that.game.canvas.height - reversMarginY, that.game.res.res.reversImg));
                    that.cardDeck[that.cardDeck.length-1].color = card.color;
                    that.cardDeck[that.cardDeck.length-1].frame = card.frame;
                    that.cardDeck[that.cardDeck.length-1].frameY = card.frameY;
                    that.cardDeck[that.cardDeck.length-1].name = card.name;
                    that.cardDeck[that.cardDeck.length-1].zIndex = zIndex;
                    that.cardDeck[that.cardDeck.length-1].place = card.frame;
                    that.cardDeck[that.cardDeck.length-1].tab = 'deck';
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
            var tempFrame = 0;
            var widths = [43, 42,41,48];
            var margins = [0, 0, 1, -18];
            var xes = [44, 40, 38, 36];
            for(var i = 0; i<8; i++){            
                that.cardFreeCaps[i] = that.game.add.rect(freeX,freeY,that.game.res.res.cardW, that.game.res.res.cardH, 'white', "#03b9cc");
                var znaczek = that.game.add.sprite((freeX + xes[tempFrame]) , freeY + that.game.res.res.cardH/4+7, 'znaczki');
                    znaczek.animations.add('znaczek', margins[tempFrame], 0, widths[tempFrame],57, [tempFrame])
                    znaczek.animations.play('znaczek',20);
                    znaczek.setScale(1.5);

                that.cardFreeCaps[i].color = null;
                that.cardFreeCaps[i].freePlace  = freePlace;
                if(i<3){
                    freeY+=marginY;
                }else if(i==3){
                    freeY = _y;
                    freeX = max;
                    tempFrame=-1;
                }
                else{
                    freeY += marginY;
                    freeX = max;
                }
                freePlace++;
                tempFrame++;
            }
        },

        getCardsLength: function(){
            if(that.game.options.showCards.value){
                var card,
                    count = 0,
                    i = 0;

                for(i=0; i<that.cardPlayable.length; i++){
                    card = that.cardPlayable[i];
                    if(card.place === that.cardSelected.place && that.cardSelected.tab === 'playable'){
                        count++;
                    }
                }
                if(count>0){
                    that.showPlayableCardsLenght = that.game.add.text("Pozostało kart: "+count, 1300 ,300, 42, 'white', null);
                }
            }
            
        },

        getCardsLengthInDeck: function(){
            if(that.game.options.showCards.value){
                var card,
                    count = 0,
                    i = 0;

                for(i=0; i<that.cardDeck.length; i++){
                    count++;
                }
                
                if(count > 0 && !that.showPlayableCardsLenghtInDeck){
                    that.showPlayableCardsLenghtInDeck = that.game.add.text(count, 1070, 1000,122, 'black', null);
                    that.showPlayableCardsLenghtInDeck.setIndex(100);
                }else{
                    that.showPlayableCardsLenghtInDeck.text = count;
                }

                if(count < 10){
                    that.showPlayableCardsLenghtInDeck.x = 1100;
                }
                if(count === 0){
                    that.showPlayableCardsLenghtInDeck = that.showPlayableCardsLenghtInDeck.destroy();
                }
            }
        },

        useSounds: function(soundKey){
            if(that.game.options.sounds.value){
                that.game.sounds.play(soundKey);
            }
        },

        useMusic: function(musicKey){
            if(that.game.options.music.value){
                that.game.sounds.play(musicKey);
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
	})

	return Solitaire;
})
