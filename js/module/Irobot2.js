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
		},

		create: function(){

            that.game.CLASS.BoxDesc = BoxDesc;
            that.game.CLASS.Water = Water;
            that.game.CLASS.Coin = Coin;
            that.game.CLASS.ParticleBox = ParticleBox;
            that.game.CLASS.Box = Box;
            that.game.CLASS.Lift = Lift;
            that.game.CLASS.JumpPlatform = JumpPlatform;
            that.game.CLASS.Lever = Lever;
            that.game.CLASS.Keys = Keys;
            that.game.CLASS.Lock = Lock;
            that.game.CLASS.Switch = Switch;
            that.game.CLASS.Enemy1 = Enemy1;
            
            that.game.VAR.exit = null;
            that.game.VAR.player = null;
            that.game.VAR.ufo = null;

            
            ParticleBox.setupPool(Irobot2.PARTICLEBOX, 'main');
            Water.setupPool(Irobot2.WATER, 'main');
            Coin.setupPool(Irobot2.COINS, 'main');
            BoxDesc.setupPool(Irobot2.BOXDESC, 'main');
            Box.setupPool(Irobot2.BOX, 'main');
            Lift.setupPool(Irobot2.LIFT, 'main');
            JumpPlatform.setupPool(Irobot2.JUMPPLATFORM, 'main');
            Lever.setupPool(Irobot2.LEVER, 'main');
            Keys.setupPool(Irobot2.KEYS, 'main');
            Lock.setupPool(Irobot2.LOCK, 'main');
            Switch.setupPool(Irobot2.SWITCH, 'main');
            Enemy1.setupPool(Irobot2.ENEMY1, 'main');
            
            that.game.add.image('main', 0, 0, 'bg', 3500, 840); 
            
            // tworzy mape
            var map = that.game.add.map('main', 'mapa', that.getMap(Levels.LEVEL), 70, 70, false);
       
            // podstawia pod pola mapy odpowiednie obiekty zdefiniowane w maps/Maps.js 
            map.setElements(that.getElements(Levels.LEVEL));

            // tworzy dynamiczne obiekty zdefinoiwane w maps/Maps.js
            map.createObjOnMap();

            // okresla wielkosc calego swiata
            that.game.world.setPortView(map.mapObj.w * map.w, map.mapObj.h * map.h);
		}
	});

	return Irobot2;
})