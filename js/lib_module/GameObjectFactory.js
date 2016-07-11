define([
	'Class',
	'Game',
	'lib_module/Image',
	'lib_module/Sprite',
	'lib_module/TileSprite',
	'lib_module/Button',
	'lib_module/ButtonImg',
	'lib_module/Text',
	'lib_module/Particles',
	'lib_module/Rect',
	'lib_module/Camera',
	'lib_module/Map',
	'lib_module/Bar'
	], function(my, game, Image, Sprite, TileSprite, Button, ButtonImg, Text, Particles, Rect, Camera, Map, Bar){

	var GameObjectFactory = my.Class( {
		
		constructor: function(game){
		 	this.game = game;
		},

	  	image: function (x, y, key, w, h, f) {
	        return new Image(this.game, x, y, key, w, h, f);
	    },

	    tileSprite: function(x, y, key, w, h){
	    	return new TileSprite(this.game, x, y, key, w, h);
	    },

	    sprite: function(x, y, key, w, h){
	    	return new Sprite(this.game, x, y, key, w, h);
	    },

	    button: function (text, x, y, width, height,background, backgroundHover, textColor, action) {
	        return new Button(this.game, text, x, y, width, height, background, backgroundHover, textColor, action);
	    },
		
		buttonImg: function (key, keyHover, x, y, width, height, action) {
	        return new ButtonImg(this.game, key, keyHover, x, y, width, height, action);
	    },

	    text: function (text, x, y, size, color, action) {
	        return new Text(this.game, text, x, y, size, color, action);
	    },
		
		particles: function (x, y, options) {
	        return new Particles(this.game, x, y, options);
	    },
		
		rect: function (x, y, w, h, s, f) {
	        return new Rect(this.game, x, y, w, h, s, f);
	    },

	    camera: function(player){
	    	this.game.camera = new Camera(this.game, player)
	    	return this.game.camera
	    },

	    map: function (key, arr, width, height) {
	        this.game.map = new Map(this.game, key, arr, width, height);
	        return this.game.map;
	    },

	    bar: function (x, y, w, h, s, f, min, max) {
	        return new Bar(this.game, x, y, w, h, s, f, min, max);
	    },

	    sounds: function(sounds){
	    	return this.game.sounds = sounds;
	    }
	});

	return GameObjectFactory;
});