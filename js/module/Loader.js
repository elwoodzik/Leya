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
            console.log('pp')
        },

        create: function(){
            this.assetManager.load({
                "mapa": "images/mapa1.png",
                //"player1": "images/player1.png",
                "player2": "images/player2.png",
                "player3": "images/player3.png",
                "ground": "images/ground.png",
                "bg": "images/bg.png",
                "levels": "images/levels.png",
                "exit": "images/exit.png",
                "coin": "images/coin.png",
                "life": "images/life.png",
                "particleBox": "images/particleBox.png",
                "left": "images/left.png",
                "right": "images/right.png",
                "jump": "images/jump.png",
                "items": "images/items.png",
                "hud": "images/hud.png",
                "ufo": "images/ufo.png",
                "galactic": "images/galactic.jpg",
                "enemies": "images/enemies.png"
                //"bg2": "images/bg2.png",
            }, this.onComplete, this.onProgress);
        },

        onProgress: function(loaded, total, key, path, success) {
            // domyslny sposob wyswietlenia paska postepu
            that.assetManager.preload(loaded, total);
        },

        onComplete: function(){    
            game = new Game(1366, 768, false, true);
            //game.createBgCanvas();
            //game.createOnBgCanvas(6);
            
            game.scallable(true);
           
            game.showFPS();
            //game.add.multiplayer('http://localhost:3000');

            //game.multiplayer.onSocket('message', that.getMessage);
           
            game.mouse.initialize();
            game.keyboard.initialize();
            
            game.state.add("Irobot2", Irobot2);
            game.state.add("Menu", Menu);
            game.state.add("Intro", Intro);
            game.state.start("Menu");

        },

        getMessage: function(data){
            console.log(data);
        }
    });

    return new Loader();
});



