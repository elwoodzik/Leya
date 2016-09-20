define([
    'Class',
    'module/maps/Maps',
    'module/Levels',
    'module/Objects/Player',
    'module/Objects/Lift',
    'module/Objects/Coin',
    'module/Objects/BoxDesc',
    'module/Objects/Box',
    'module/Objects/Water',
    'module/Objects/ParticleBox',
    'module/Objects/JumpPlatform',
    'module/Objects/Lever',
    'module/Objects/Keys',
    'module/Objects/Lock',
    'module/Objects/Switch',
    'module/Objects/Enemies/Enemy1',
], 
function(my, Maps, Levels, Player, Lift, Coin, BoxDesc, Box, Water, ParticleBox, JumpPlatform, Lever, Keys, Lock, Switch, Enemy1){
	
    var that;

	var Irobot2 = my.Class(null, Maps, {

        STATIC: {
            COINS: 50,
            BOXDESC: 20,
            BOX: 20,
            WATER: 40,
            LIFT: 5,
            PARTICLEBOX: 70,
            JUMPPLATFORM: 5,
            LEVER: 5,
            KEYS: 4,
            LOCK: 4,
            SWITCH: 4,
            ENEMY1: 5
        },

		constructor: function(game){
            that = this;
            that.game = game; 
           
            // that.game.canvas.style.background = 'url("images/bg.png")';
            that.game.CLASS.Coin = Coin;
            that.game.CLASS.BoxDesc = BoxDesc;
            that.game.CLASS.Water = Water;
            that.game.CLASS.ParticleBox = ParticleBox;
            that.game.CLASS.Box = Box;
            that.game.CLASS.Lift = Lift;
            that.game.CLASS.JumpPlatform = JumpPlatform;
            that.game.CLASS.Lever = Lever;
            that.game.CLASS.Keys = Keys;
            that.game.CLASS.Lock = Lock;
            that.game.CLASS.Switch = Switch;
            that.game.CLASS.Enemy1 = Enemy1;
            
            that.game.ARR.map = [];

            that.game.VAR.exit = null;
            that.game.VAR.player = null;
            that.game.VAR.ufo = null;
		},

		create: function(){
            that.game.world.setPortView(3500, 840);
            
            that.game.CLASS.ParticleBox.setupPool(Irobot2.PARTICLEBOX, 'main');
            that.game.CLASS.Coin.setupPool(Irobot2.COINS, 'main');
            that.game.CLASS.BoxDesc.setupPool(Irobot2.BOXDESC, 'main');
            that.game.CLASS.Water.setupPool(Irobot2.WATER, 'main');
            that.game.CLASS.Box.setupPool(Irobot2.BOX, 'main');
            that.game.CLASS.Lift.setupPool(Irobot2.LIFT, 'main');
            that.game.CLASS.JumpPlatform.setupPool(Irobot2.JUMPPLATFORM, 'main');
            that.game.CLASS.Lever.setupPool(Irobot2.LEVER, 'main');
            that.game.CLASS.Keys.setupPool(Irobot2.KEYS, 'main');
            that.game.CLASS.Lock.setupPool(Irobot2.LOCK, 'main');
            that.game.CLASS.Switch.setupPool(Irobot2.SWITCH, 'main');
            that.game.CLASS.Enemy1.setupPool(Irobot2.ENEMY1, 'main');
            
            that.game.add.image('main', 0, 0, 'bg', 3500, 840); 
            
            // tworzy mape
            that.game.ARR.map = that.game.add.map('main', 'mapa', that.getMap(Levels.LEVEL), 70, 70, false);

            // podstawia pod pola mapy odpowiednie obiekty zdefiniowane w maps/Maps.js 
            that.game.ARR.map.setElements(that.getElements(Levels.LEVEL));

            // tworzy dynamiczne obiekty zdefinoiwane w maps/Maps.js
            that.game.ARR.map.createObjOnMap();

            //that.createUfo();
		},

        createUfo: function(){
            that.game.VAR.ufo = that.game.add.image('main', -530, -250, 'ufo');
            that.game.VAR.ufo.moveToPoint(that.game.VAR.player.x+that.game.VAR.player.currentHalfWidth, that.game.VAR.player.y, 30, function(u){
                that.game.VAR.player.used = true;
                u.moveToPoint(-530, -50, 40, function(u){
                    u.used = false
                })
            })     
        }
	});

	return Irobot2;

})