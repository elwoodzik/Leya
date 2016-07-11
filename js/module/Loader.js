define([
    'Class',
    'AssetManager',
    'Game'
], function(my, AssetManager, Game){
    
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
                //"revers": "images/revers1.jpg",
            }, this.onComplete, this.onProgress);
        },

        onProgress: function(loaded, total, key, path, success) {

        },

        onComplete: function(){    
            game = new Game(1920, 1080);
            game.scallable(true);
            game.add.sounds(that.assetManager);
            
            game.mouse.initialize();
            game.keyboard.initialize();
            
            game.state.add("Menu", Menu);
            game.state.start("Menu");
        }
    });

    return new Loader();
});



