define(['Class', 'Socket'], function(my, io){

    var that;

    var Multiplayer = my.Class({

        constructor: function(game, _ip){
            that = this;
            that.socket = io.connect(_ip);
            // require(, function(io){
            //     console.log(io)
              
            // });
        },

        onSocket: function(name, callback){
            if(typeof callback === 'function'){
                that.socket.on(name, callback);
            }else{
                throw 'Metoda przyjmuje dwa parametry. Nazwe Socketu (String) i callback (Function)';
            }
        },
        
        emit: function(name, data){
            if(!name){
                throw 'musisz podac jako pierwszy parametr nazwe socketu';
            }
            that.socket.emit(name, data);
        }
    });

    return Multiplayer;
})
