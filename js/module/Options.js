define(['Class'], function(my){
	var that,
        options,
        showCardButton;

	var Options = my.Class({

		constructor: function(id){
           that = this; 
		},

		create: function(id){
            
            that.game = this;
            options = that.game.loadData('options');

            if(!options){
                options = {
                    showCards: {
                        value: false
                    },
                    sounds: {
                        value: false
                    },
                    music: {
                        value: false
                    }
                }
                that.game.saveData('options', options)
            }
            //that.game.add.text(that.cardsFree[i].color, (freeX + that.game.res.res.cardW/2)-32 , freeY + that.game.res.res.cardH/2, 32, '#333', null);
            that.game.add.text("Opcje", (that.game.canvas.width/2)-112, 140, 102, "white", null);
			that.game.add.button("Zapisz", (that.game.canvas.width/2) -170, 700, 170, 80,'#cccccc','white','white', that.backToMenuWithSave);
            that.game.add.button("Anuluj", (that.game.canvas.width/2) +60, 700, 170, 80,'#cccccc','white','white', that.backToMenuWithOutSave);

            // pokazuj karty
            that.game.add.text("Pokazuj ile kart pozostało: ", (that.game.canvas.width/2)-302, 340, 32, "white", null);
            if(options.showCards.value){
                that.game.add.button("Włączone", (that.game.canvas.width/2) +150, 295, 250, 70,'#18bb06','#25a010','white', that.showCards);
            }else{
                that.game.add.button("Wyłączone", (that.game.canvas.width/2) +150, 295, 250, 70,'red','#dc0000','white', that.showCards);
            }

            // dzwieki
            that.game.add.text("Odgłosy: ", (that.game.canvas.width/2)-302, 440, 32, "white", null);
            if(options.sounds.value){
                that.game.add.button("Włączone", (that.game.canvas.width/2) +150, 395, 250, 70,'#18bb06','#25a010','white', that.sounds);
            }else{
                that.game.add.button("Wyłączone", (that.game.canvas.width/2) +150, 395, 250, 70,'red','#dc0000','white', that.sounds);

            }            
            
            // muzyka
            that.game.add.text("Muzyka: ", (that.game.canvas.width/2)-302, 540, 32, "white", null);
            if(options.music.value){
                that.game.add.button("Włączone", (that.game.canvas.width/2) +150, 495, 250, 70,'#18bb06','#25a010','white', that.music);
            }else{
                that.game.add.button("Wyłączone", (that.game.canvas.width/2) +150, 495, 250, 70,'red','#dc0000','white', that.music);
            }  
        },

        showCards: function(button){
            if(options.showCards.value){
                button.background = 'red';
                button.backgroundHover = '#dc0000';
                button.text = 'Wyłączone';
                options.showCards.value = false;
            }else{
                button.background = '#18bb06';
                button.backgroundHover = '#25a010';
                button.text = 'Włączone';
                options.showCards.value = true;
            }
        }, 

        sounds: function(button){
            if(options.sounds.value){
                button.background = 'red';
                button.backgroundHover = '#dc0000';
                button.text = 'Wyłączone';
                options.sounds.value = false;
            }else{
                button.background = '#18bb06';
                button.backgroundHover = '#25a010';
                button.text = 'Włączone';
                options.sounds.value = true;
            }
        }, 

        music: function(button){
            if(options.music.value){
                button.background = 'red';
                button.backgroundHover = '#dc0000';
                button.text = 'Wyłączone';
                options.music.value = false;
            }else{
                button.background = '#18bb06';
                button.backgroundHover = '#25a010';
                button.text = 'Włączone';
                options.music.value = true;
            }
        },             

        backToMenuWithSave: function(){
            that.game.saveData('options', options)
            that.game.state.start("Menu");    
        },

        backToMenuWithOutSave: function(){
            that.game.state.start("Menu");    
        },
	})

	return Options;
})