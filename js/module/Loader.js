define([
    'Class',
    'AssetManager',
    'Game',
    'module/Irobot',
], function(my, AssetManager, Game, Irobot){
    
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
                "irobot": "images/irobot.png",
                "ok1": "images/ok1.png",
                "ok2": "images/ok2.png",
                "ok3": "images/ok3.png",
                "ok4": "images/ok4.png",
                "ok5": "images/ok5.png",
                "ok6": "images/ok6.png",
                "ok7": "images/ok7.png",
                "ok8": "images/ok8.png",
                "ok9": "images/ok9.png",
                'logo': "images/logo.jpg",
                'zamknij': "images/zamknij.png",
                'zamknij_hover': 'images/zamknij_hover.png'
            }, this.onComplete, this.onProgress);
        },

        onProgress: function(loaded, total, key, path, success) {

        },

        onComplete: function(){    
            game = new Game(600, 600);
            
            //game.scallable(true);
            //game.useFpsCounter = true;
            //game.add.multiplayer('http://localhost:3000');

            //game.multiplayer.onSocket('message', that.getMessage);
           
            game.mouse.initialize();
            
            game.state.add("Irobot", Irobot);
            game.state.start("Irobot");
        },

        getMessage: function(data){
            console.log(data);
        }
    });

    return new Loader();
});



