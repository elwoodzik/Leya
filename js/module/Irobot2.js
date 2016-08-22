define([
    'Class',
    'module/maps/Maps',
    'module/Levels',
    'module/Objects/Player',
    'module/Objects/Lift',
    'module/Objects/Coin',
    'module/Objects/BoxDesc',
    'module/Objects/Water',
    'module/Objects/ParticleBox',
], 
function(my, Maps, Levels, Player, Lift, Coin, BoxDesc, Water, ParticleBox){
	
    var that;
    var ct = 0;
    var time= 200;
    var count = 1000;
    var cc = 0;

	var Irobot2 = my.Class(null, Maps, {

        STATIC: {
            COINS: 90,
            DESCBOX: 15,
            WATER: 30,
            LIFTS: 5,
            PARTICLEBOX: 60
        },

		constructor: function(game){
            that = this;
            that.game = game; 

            that.game.ARR.Tab_coins = [];
            that.game.ARR.Tab_boxDescBlocks = [];
            that.game.ARR.Tab_waterBlocks = [];
            that.game.ARR.Tab_lifts = [];


            that.game.ARR.coins = [];
            that.game.ARR.boxDescBlocks = [];
            that.game.ARR.waterBlocks = [];
            that.game.ARR.lifts = [];
            that.game.ARR.particleBox = [];

            that.game.ARR.map = [];
           
            // to create an instance :
            
            
           // that.game.ARR.particleBoxYellow = [];  
		},

		create: function(){
            that.game.world.setPortView(3500,840);

            that.game.poolParticleBoxDesc = that.game.add.pool(ParticleBox, Irobot2.PARTICLEBOX);
            that.game.poolParticleBoxDesc.createSprite(that.game, 'main', -1100, -1100, 'particleBox');

            that.game.poolCoin = that.game.add.pool(Coin, Irobot2.COINS);
            that.game.poolCoin.createSprite(that.game,'main', -1100, -1100, 'coin');

            that.game.poolWater = that.game.add.pool(Water, Irobot2.WATER);
            that.game.poolWater.createSprite(that.game,'main', -1100, -1100, 'mapa');

            that.game.poolBoxDesc = that.game.add.pool(BoxDesc, Irobot2.DESCBOX);
            that.game.poolBoxDesc.createSprite(that.game,'main', -1100, -1100, 'mapa');
           
             var b = Coin.setupPool(2000);
            console.log(that.game.gameObject.length)

           
             //console.log(coin)
            // for(var i=0; i<count; i++){
                
           
            //     var r = this.rand( 100, 500);
            //     var y = this.rand( 100, 500);
            //     new Coin(that.game ,'main', r, y, 'coin');
            
            // }
            // that.createCoins();
            // that.createDescBox();
            // that.createWater();
            // that.createLifts();
            // tworzy tlo
            that.game.add.image('background', 0, 0, 'bg', 3500, 840);
            
            // tworzy mape
            that.game.ARR.map = that.game.add.map('main', 'mapa', that.getMap(Levels.LEVEL), 70, 70, false);

            // podstawia pod pola mapy odpowiednie obiekty zdefiniowane w maps/Maps.js 
            that.game.ARR.map.setElements(that.getElements());

            // tworzy dynamiczne obiekty zdefinoiwane w maps/Maps.js
            that.game.ARR.map.createObjOnMap('main');



    // if(Levels.LEVEL === 1){
    //     for (var i=0; i<35; i++){
    //         that.game.add.particles(9*70+34,4*70+10);
    //     }
    //     var liftsCords = [
    //         { x:  70*10, y: 70*3, dis: 170, dir: 'down'},
    //     ] 

    //     for (var i=0; i<liftsCords.length; i++){
    //         let cords = liftsCords[i];
    //         var lift = new Lift(that.game, 'main', cords.x, cords.y, 'mapa');
    //         lift.thereAndBack(cords.dis, cords.dir, 100);
            
    //         that.game.ARR.lifts.push(lift);
    //     }
    // }


		},

		update: function(dt){
        
		},

        // createCoins: function(){
        //     var coin, i=0;
        //     //
        //     for(i=0; i<Irobot2.COINS; i++){
        //         coin = new Coin(that.game ,'main', -100, -200, 'coin');
        //         coin.body.immoveable = true;
        //         coin.used = false;
        //         that.game.ARR.Tab_coins.push(coin);
        //     }
        // },

        // createDescBox: function(){
        //     var box, i=0;
        //     //
        //     for(i=0; i<Irobot2.DESCBOX; i++){
        //         box = new BoxDesc(that.game ,'main', -100, -200, 'mapa');
                
        //         box.used = false;
        //         that.game.ARR.Tab_boxDescBlocks.push(box);
        //     }
        // },

        // createWater: function(){
        //     var water, i=0;
        //     //
        //     for(i=0; i<Irobot2.WATER; i++){
        //         water = new Water(that.game ,'main', -100, -200, 'mapa');
               
        //         water.used = false;
        //         that.game.ARR.Tab_waterBlocks.push(water);
        //     }
        // },

        // createLifts: function(){
        //     var lift, i=0;
        //     //
        //     for(i=0; i<Irobot2.LIFTS; i++){
        //         lift = new Lift(that.game ,'main', -100, -200, 'mapa');
        //         lift.used = false;
        //         that.game.ARR.Tab_lifts.push(lift);
        //     }
        // },
        
        // createParticleBox: function(){
        //     var particle, i=0;
        //     //
        //     for(i=0; i < Irobot2.PARTICLEBOX; i++){
        //         particle = new ParticleBox(that.game ,'main', -100, -200, 'mapa');
        //         particle.used = false;
        //         that.game.ARR.Tab_particleBox.push(particle);
        //     }
        // }
	});

	return Irobot2;

})