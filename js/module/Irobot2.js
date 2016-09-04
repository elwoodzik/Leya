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
], 
function(my, Maps, Levels, Player, Lift, Coin, BoxDesc, Box, Water, ParticleBox){
	
    var that;
    var ct = 0;
    var time= 200;
    var count = 1000;
    var cc = 0;

	var Irobot2 = my.Class(null, Maps, {

        STATIC: {
            COINS: 0,
            DESCBOX: 0,
            WATER: 0,
            LIFTS: 0,
            PARTICLEBOX: 0
        },

		constructor: function(game){
            that = this;
            that.game = game; 

            that.game.CLASS.Coin = Coin;
            that.game.CLASS.BoxDesc = BoxDesc;
            that.game.CLASS.Water = Water;
            that.game.CLASS.ParticleBox = ParticleBox;
            that.game.CLASS.Box = Box;
            that.game.CLASS.Lift = Lift;

            that.game.ARR.map = [];
		},

		create: function(){
            that.game.world.setPortView(3500, 840);
            
            that.game.VAR.ufo = that.game.add.image('main', -530, -250, 'ufo');
            that.game.VAR.ufo.moveToPoint(320, 270, 30, function(u){
                that.game.VAR.player.used = true;
                u.moveToPoint(-530, -50, 40, function(u){
                    u.used = false
                })
            })

            that.game.CLASS.ParticleBox.setupPool(70, 'main');
            that.game.CLASS.Coin.setupPool(30, 'main');
            that.game.CLASS.BoxDesc.setupPool(20, 'main');
            that.game.CLASS.Water.setupPool(40, 'main');
            that.game.CLASS.Box.setupPool(20, 'main');
            that.game.CLASS.Lift.setupPool(5, 'main');
            
            //that.game.add.image('main', 0, 0, 'bg', 3500, 840); 
            
            // tworzy mape
            that.game.ARR.map = that.game.add.map('main', 'mapa', that.getMap(Levels.LEVEL), 70, 70, false);

            // podstawia pod pola mapy odpowiednie obiekty zdefiniowane w maps/Maps.js 
            that.game.ARR.map.setElements(that.getElements());

            // tworzy dynamiczne obiekty zdefinoiwane w maps/Maps.js
            that.game.ARR.map.createObjOnMap();

            if(Levels.LEVEL === 1){
                // var liftsCords = [
                //     { x:  70*5, y: 70*5, dis: 170, dir: 'down'},
                // ] 
                // for (var i=0; i<liftsCords.length; i++){
                //     let cords = liftsCords[i];
                //     var lift = that.game.CLASS.Lift.pnew(that.game, true, 'main', cords.x, cords.y, 'mapa');
                //     lift.thereAndBack(cords.dis, cords.dir, 100);
                // }
               
              
                // for (var i=0; i<35; i++){
                //     that.game.add.particles(9*70+34,4*70+10);
                // }
                // var liftsCords = [
                //     { x:  70*10, y: 70*3, dis: 170, dir: 'down'},
                // ] 

                // for (var i=0; i<liftsCords.length; i++){
                //     let cords = liftsCords[i];
                //     var lift = new Lift(that.game, 'main', cords.x, cords.y, 'mapa');
                //     lift.thereAndBack(cords.dis, cords.dir, 100);
                    
                //     that.game.ARR.lifts.push(lift);
                // }
            }
           
		}
	});

	return Irobot2;

})