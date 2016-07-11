define([
    'Class',
    'AssetManager',
    'Game',
    'module/Solitaire',
    'module/Menu',
    'module/Settings',
    'module/Options',
], function(my, AssetManager, Game, Solitaire, Menu, Settings, Options){
    
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
                "revers": "images/revers1.jpg",
                "cards2": "images/poker-deck1.jpg",
                "deck_960": "images/deck_960.jpg",
                "revers_960": "images/revers_960.jpg",
                "znaczki": "images/znaczki1.png",
                "cardPlace3": "sounds/cardSlide3.wav"
            }, this.onComplete, this.onProgress);
        },

        onProgress: function(loaded, total, key, path, success) {

        },

        onComplete: function(){
            // game = new Game(960, 540);
            // game.res = new Settings(0);
           
            game = new Game(1920, 1080);
            game.res = new Settings(1);
            game.scallable(true);
            game.add.sounds(that.assetManager);
            
            console.log(game.res)
            
            game.mouse.initialize();
            game.keyboard.initialize();
            
            game.state.add("Menu", Menu);
            game.state.add("Solitaire", Solitaire);
            game.state.add("Options", Options);
            game.state.start("Menu");
        }
    });

    return new Loader();
});



