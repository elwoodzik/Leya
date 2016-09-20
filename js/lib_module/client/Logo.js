define([
	'Class',
], function(my, Levels){
	var that;

	var Logo = my.Class({

		constructor: function(game){
			that = this;
            that.game = game;

            that.TextL = that.game.add.text('main', "L", -500, -2366, 170, "white", null);
            that.TextE = that.game.add.text('main', "e", 2570, -366, 170, "white", null);
            that.TextY = that.game.add.text('main', "y", -1660, -766, 170, "white", null);
            that.TextA = that.game.add.text('main', "a", -740, 1466, 170, "white", null);

            that.TextEngine = that.game.add.text('main', "engine", 590, 2475, 40, "white", null);

            that.TextL.moveToPoint(500 + that.TextL.currentHalfWidth, 366 + that.TextL.currentHalfHeight, 33, null);
            that.TextE.moveToPoint(570 + that.TextE.currentHalfWidth, 366 + that.TextE.currentHalfHeight, 33, null);
            that.TextY.moveToPoint(660 + that.TextY.currentHalfWidth, 366 + that.TextY.currentHalfHeight, 33, null);
            that.TextA.moveToPoint(750 + that.TextA.currentHalfWidth, 366 + that.TextA.currentHalfHeight, 33, function(){
                that.TextEngine.moveToPoint(611 + that.TextA.currentHalfWidth, 245 + that.TextA.currentHalfHeight, 15, function(a){
                    a.doInTime(2500, function(){
                        that.game.callback();
                    })
                });
            });
		},

		create: function(){
			that.startGame();
		},

        startGame: function(){
            
        }
	})
	
	return Logo;
})