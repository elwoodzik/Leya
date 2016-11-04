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
	'lib_module/client/Dialog',
	'lib_module/client/Multiplayer',
	], function(my, game, Image, Sprite, TileSprite, Button, ButtonImg, Text, Particles, Rect, Camera, Map, Bar, Pool, Dialog, Multiplayer ){

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

	    button: function (text, x, y, width, height,background, backgroundHover, strokeStyle, strokeStyleHover, textColor, action) {
	        return new Button(this.game, text, x, y, width, height, background, backgroundHover, strokeStyle, strokeStyleHover, textColor, action);
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
		
		rect: function (context, x, y, w, h, s, f) {
	        return new Rect(this.game, false,context, x, y, w, h, s, f);
	    },

	    camera: function( xView, yView, canvasWidth, canvasHeight, worldWidth, worldHeight){
	    	this.game.camera = new Camera(this.game,  xView, yView, canvasWidth, canvasHeight, worldWidth, worldHeight)
	    	return this.game.camera;
	    },

	    map: function (context, key, arr, width, height, scalled) {
	        this.game.map = new Map(this.game, context, key, arr, width, height, scalled);
	        return this.game.map;
	    },

	    bar: function (context, x, y, w, h, s, f, min, max) {
	        return new Bar(this.game, false, context, x, y, w, h, s, f, min, max);
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

		dialog: function(context, x, y, w, h, s, f){
			return new Dialog(this.game, context, x, y, w, h, s, f);
		},
		
		toMulti: function(obj){
			var o = {
				x : obj.x,
				y: obj.y,
				vx: obj.body.velocity.x,
				vy: obj.body.velocity.y,
				key: obj.key,
				w: obj.fW,
				h: obj.fH,
				states: obj.states,
				state: obj.state,
				type: obj.type,
				oClass: obj.oClass
			}
            this.game.multiplayer.emit('add object', o, function(data){
				obj.sockID = data.sockID;
				obj.ID = data.ID;
			});
        }
	});

	return GameObjectFactory;
});