define([
	'Class',
	'Game',
	'lib_module/client/Image',
	'lib_module/client/Sprite',
	'lib_module/client/TileSprite',
	'lib_module/client/Button',
	'lib_module/client/ButtonImg',
	'lib_module/client/Text',
	'lib_module/client/Particles',
	'lib_module/client/Rect',
	'lib_module/client/Camera',
	'lib_module/client/Map',
	'lib_module/client/Bar',
	'lib_module/client/Pool',
	'lib_module/client/Multiplayer',
	], function(my, game, Image, Sprite, TileSprite, Button, ButtonImg, Text, Particles, Rect, Camera, Map, Bar, Pool, Multiplayer ){

	var GameObjectFactory = my.Class( {
		
		constructor: function(game){
		 	this.game = game;
		},

	  	image: function (context, x, y, key, w, h, f) {
	        return new Image(this.game, false, context, x, y, key, w, h, f);
	    },

	    tileSprite: function(context, x, y, key, w, h){
	    	return new TileSprite(this.game, false, context, x, y, key, w, h);
	    },

	    sprite: function(context, x, y, key, w, h){
	    	return new Sprite(this.game, false, context, x, y, key, w, h);
	    },

	    button: function (text, x, y, width, height,background, backgroundHover, textColor, action) {
	        return new Button(this.game, text, x, y, width, height, background, backgroundHover, textColor, action);
	    },
		
		buttonImg: function (context, key, keyHover, x, y, width, height, action) {
	        return new ButtonImg(this.game, false, context, key, keyHover, x, y, width, height, action);
	    },

	    text: function (context, text, x, y, size, color, action) {
	        return new Text(this.game, context, text, x, y, size, color, action);
	    },
		
		particles: function (x, y, options) {
	        return new Particles(this.game, x, y, options);
	    },
		
		rect: function (x, y, w, h, s, f) {
	        return new Rect(this.game, x, y, w, h, s, f);
	    },

	    camera: function( xView, yView, canvasWidth, canvasHeight, worldWidth, worldHeight){
	    	this.game.camera = new Camera(this.game,  xView, yView, canvasWidth, canvasHeight, worldWidth, worldHeight)
	    	return this.game.camera;
	    },

	    map: function (context, key, arr, width, height, scalled) {
	        this.game.map = new Map(this.game, context, key, arr, width, height, scalled);
	        return this.game.map;
	    },

	    bar: function (x, y, w, h, s, f, min, max) {
	        return new Bar(this.game, x, y, w, h, s, f, min, max);
	    },

		multiplayer: function (id) {
			this.game.multiplayer = new Multiplayer(this.game, id);
	        return this.game.multiplayer;
	    },

	    sounds: function(sounds){
	    	return this.game.sounds = sounds;
	    },

		pool: function(obj, count){
			return new Pool(this.game, obj, count);
	    },
	});

	return GameObjectFactory;
});