  /**
 * Moduł odpowiedzialny za poczatkowe ładownie.
 * @Module Loader
 */
define([
    'Class',
    'AssetManager',
    'Game',
    'module/Irobot2',
], function(my, AssetManager, Game, Irobot2){
    
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
                "player": "images/player.png",
                "player2": "images/player2.png",
                "player3": "images/player3.png",
                "ground": "images/ground.png",
                "bg": "images/bg.jpg",
            }, this.onComplete, this.onProgress);
        },

        onProgress: function(loaded, total, key, path, success) {

        },

        onComplete: function(){    
            game = new Game(1400, 700, false, true);
            game.createBgCanvas();
            game.createOnBgCanvas();
            
           // game.scallable(true);
            game.useFpsCounter = true;
            //game.add.multiplayer('http://localhost:3000');

            //game.multiplayer.onSocket('message', that.getMessage);
           
            game.mouse.initialize();
            game.keyboard.initialize();
            
            game.state.add("Irobot2", Irobot2);
            game.state.start("Irobot2");
        },

        getMessage: function(data){
            console.log(data);
        }
    });

    return new Loader();
});



