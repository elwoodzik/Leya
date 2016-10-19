  /**
 * Moduł odpowiedzialny za poczatkowe ładownie.
 * @Module Loader
 */
define([
    'Class',
    'AssetManager',
    'Game',
    'module/Irobot2',
    'module/Menu',
    'module/Intro',
], function(my, AssetManager, Game, Irobot2, Menu, Intro){
    
    //variable
    var that;
    var game;
    var Loader = my.Class({
		
        constructor: function(){
            that = this;
            this.assetManager = new AssetManager();
            //
            this.create();
        },

        create: function(){
            this.assetManager.load({
                "mapa": "images/mapa1.png",
                //"player1": "images/player1.png",
                "player2": "images/player2.png",
                "player3": "images/player3.png",
                "bg": "images/bg.png",
                "levels": "images/levels.png",
                "levels1": "images/levels1.png",
                "exit": "images/exit.png",
                "coin": "images/coin.png",
                "coin1": "images/coins_new.png",
                "life": "images/life.png",
                "particleBox": "images/particleBox.png",
                "left": "images/left.png",
                "right": "images/right.png",
                "jump": "images/jump.png",
                "items": "images/items.png",
                "hud": "images/hud.png",
                "ufo": "images/ufo.png",
                "galactic": "images/galactic.jpg",
                "enemies": "images/enemies.png",
                "bg2": "images/bg2.png",
                "menu-bg": "images/menu-bg.png",
                "coin-take": "sounds/coin-take.wav",
                "jump-platform": "sounds/jump.wav",
                "player-jump":"sounds/player-jump.wav"
            }, this.onComplete, this.onProgress);
        },

        onProgress: function(loaded, total, key, path, success) {
            // domyslny sposob wyswietlenia paska postepu
            that.assetManager.preload(loaded, total);
        },

        onComplete: function(){    
            new Game(1366, 768, false, function(){
                //this.createBgCanvas();
               // this.createOnBgCanvas(6);
               // this.scallable(false)

                this.showFPS();
                
                this.add.multiplayer('http://localhost:4000');
                this.multiplayer.onSocket('message', that.getMessage);
                this.add.sounds(that.assetManager);

                this.sounds.useSounds(false);
                
                
                this.mouse.initialize();
                this.keyboard.initialize();
                
                this.state.add("Irobot2", Irobot2);
                this.state.add("Menu", Menu);
                this.state.add("Intro", Intro);
                this.state.start("Menu");
            });
            //
           
            
        },

        getMessage: function(data){
            console.log(this)
            console.log(data);
        }
    });

    return new Loader();
});



