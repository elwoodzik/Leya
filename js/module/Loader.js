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
], function(my, AssetManager, Game, Irobot2, Menu){
    
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
                "mapa": "images/mapa.png",
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
                //"bg2": "images/bg2.png",
            }, this.onComplete, this.onProgress);
        },

        onProgress: function(loaded, total, key, path, success) {

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
            game.state.start("Menu");

        },

        getMessage: function(data){
            console.log(data);
        }
    });

    return new Loader();
});



