define(['Class', 'Socket'], function(my, io){

    var that;

    var Multiplayer = my.Class({

        constructor: function(game, _ip){
            that = this;
            that.socket = io.connect(_ip);
            that.game = game;

            that.initialize();
        },

        initialize: function(){
            that.onSocket('share obj', that.shareObj); 
            that.onSocket('removed objs', that.removeAllObjects); 
            that.onSocket('update obj', that.updateObject); 
        },

        onSocket: function(name, callback){
            if(typeof callback === 'function'){
                that.socket.on(name, callback);
            }else{
                throw 'Metoda przyjmuje dwa parametry. Nazwe Socketu (String) i callback (Function)';
            }
        },
        
        emit: function(name, data, callback){
            if(!name){
                throw 'musisz podac jako pierwszy parametr nazwe socketu';
            }
            that.socket.emit(name, data, callback);
        },

        removeAllObjects: function(data){
            var tab = [];
            
            for(var i=0; i<that.game.gameObject.length; i++){
                if(that.game.gameObject[i].sockID === data ){
                    tab.push(that.game.gameObject[i])
                }
            }

            for(var i=0; i<tab.length; i++){
                that.game.gameObject.splice(that.game.gameObject.indexOf(tab[i]), 1);
            }
        },

        shareObj: function(data){
            var obj = that.game.add[data.type]('main', data.x, data.y, data.key, data.w, data.h);
            obj.sockID = data.sockID;
		},

        updateObject: function(data){
            console.log(data)
        }
    });

    return Multiplayer;
})
