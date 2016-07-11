define([
    'Class',
    'lib_module/AssetManager',
    'lib_module/Game',
    'module/Menu',
    'module/Gra'
], function(my, AssetManager, Game, Menu, Gra ){
    
    var game;

    var Loader = my.Class({
		
        constructor: function(){
            this.assetManager = new AssetManager();
            //
            this.create();
        },

        create: function(){
            this.assetManager.load({
                "sky": "images/a.jpg",
                "pp": "images/rainbowdash.png",
                "coin": "images/coin.png"
            },this.onComplete, this.onProgress);
        },

        onProgress: function(loaded, total, key, path, success) {
            
        },

        onComplete: function(){
            
            game = new Game(960, 540);

            game.mouse.initialize();
            game.keyboard.initialize();

            game.state.add("Menu", Menu);
            game.state.add("Gra", Gra);
            game.state.start("Menu");
        }
    });

    return new Loader();
});



