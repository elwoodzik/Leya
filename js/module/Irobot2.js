define([
    'Class',
    'module/maps/Maps',
    'module/Levels',
    'module/Objects/Player',
    'module/Objects/Lift',
    ], function(my, Maps, Levels, Player, Lift){
	
    var that;
    var par;

	var Irobot2 = my.Class(null, Maps, {

		constructor: function(game){
            that = this;
            that.game = game; 
           
            that.game.ARR.map = [];
            that.game.ARR.lifts = [];

            that.game.ARR.parti = [];
		},

		create: function(){
            that.game = this;
            
            // tworzy tlo
            that.game.add.image('background', 0, 0, 'bg', 2800, 700);

            // tworzy mape
            that.game.ARR.map = that.game.add.map('main', 'mapa', that.getMap(Levels.LEVEL), 70, 70, false);

            // podstawia pod pola mapy odpowiednie obiekty zdefiniowane w maps/Maps.js 
            that.game.ARR.map.setElements(that.getElements());

            // tworzy dynamiczne obiekty zdefinoiwane w maps/Maps.js
            that.game.ARR.map.createObjOnMap('main');

            for (var i=0; i<20; i++){
                that.game.add.particles(9*70+34,4*70+10);
            }

            par = that.game.add.rect(200,200, 20, 10, null, 'brown');
            
            par.body.platformer.ddy = -(70 * 440);    
            

            var liftsCords = [
                { x:  70*10, y: 70*3, dis: 300, dir: 'down'},
            ] 

            for (var i=0; i<liftsCords.length; i++){
                let cords = liftsCords[i];
                var lift = new Lift(that.game, 'main', cords.x, cords.y, 'mapa');
                lift.thereAndBack(cords.dis, cords.dir, 100, 2000);
                
                that.game.ARR.lifts.push(lift);
            }

            that.game.world.setPortView(2800,700);
		},

		update: function(dt){
            par.body.platformer.collision(dt);
		}
	});

	return Irobot2;

})