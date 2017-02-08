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
    'module/Objects/PotionLife',
    'module/Objects/DialogBox',
    'module/Objects/Trap',
], 
function(my, Maps, Levels, Player, Lift, Coin, BoxDesc, Box, Water, ParticleBox, JumpPlatform, Lever, Keys, Lock, Switch, Enemy1, PotionLife, DialogBox, Trap){
	'use strict';
    var that;

	var Irobot2 = my.Class(null, Maps, {

        STATIC: {
            COINS: 80,
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
            ENEMY1: 5,
            POTION: 10,
            TRAPS: 10
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
            that.game.CLASS.PotionLife = PotionLife;
            that.game.CLASS.DialogBox = DialogBox;
            that.game.CLASS.Trap = Trap;
            
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
            PotionLife.setupPool(Irobot2.POTION, 'main');
            Trap.setupPool(Irobot2.TRAPS, 'main');
            
            // tworzy mape
            var map = that.game.add.map('main', 'mapa', that.getMap(Levels.LEVEL), 70, 70, false);
            
            that.game.add.image('main', 0, 0, 'bg', map.mapObj.w * map.w, map.mapObj.h * map.h); 
            // podstawia pod pola mapy odpowiednie obiekty zdefiniowane w maps/Maps.js 
            map.setElements(that.getElements(Levels.LEVEL));

            // tworzy dynamiczne obiekty zdefinoiwane w maps/Maps.js
            map.createObjOnMap();

            // okresla wielkosc calego swiata
            that.game.world.setPortView(map.mapObj.w * map.w, map.mapObj.h * map.h);

            that.iconToMenu();

            //mobile pad
            that.game.VAR.padRight = this.add.button('>',260, 620 , 140, 100, null, null, 'black', 'green', '#333', null);
            that.game.VAR.padRight.static = true;
            that.game.VAR.padRight.size = 65;
            that.game.VAR.padRight.used = false;
            that.game.VAR.padLeft = this.add.button('<',60, 620 , 140, 100, null, null, 'black', 'green', '#333', null);
            that.game.VAR.padLeft.static = true;
            that.game.VAR.padLeft.size = 65;
            that.game.VAR.padLeft.used = false;
            that.game.VAR.padJump = this.add.button('Skok',1100, 620 , 180, 100, null, null, 'black', 'green', '#333', null);
            that.game.VAR.padJump.static = true;
            that.game.VAR.padJump.size = 57;
            that.game.VAR.padJump.used = false;
            that.game.VAR.padAction = this.add.button('Akcja',870, 620 , 200, 100, null, null, 'black', 'green', '#333', null);
            that.game.VAR.padAction.static = true;
            that.game.VAR.padAction.size = 57;
            that.game.VAR.padAction.used = false;
		},

       

        iconToMenu: function(){
            var b = that.game.add.button("x", that.game.width - 60, 15, 50, 50, 'white', 'green', 'black', 'black', 'black', that.showMenu);
            b.static = true;
        },

        showMenu: function(){
            var d = new that.game.CLASS.DialogBox(that.game, 'main', 350, 150, 700, 450, '#333', 'white');
            d.configure({
                close:true,
                main: function(){},
                headline: {
                    text: 'Opcje',
                    x: 295,
                    y: 60,
                    color: '#333',
                    size: 45
                },
                button1: {
                    text: 'Menu',
                    action: d.loseButton1
                },
                button2: {
                    text: 'Powtórz',
                    action: d.repeatButton1
                }
            })
        }
	});

	return Irobot2;
})