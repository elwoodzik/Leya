define(['Class', 'Socket'], function(my, io){
    'use strict';
    var that;

    var Multiplayer = my.Class({

        constructor: function(game, _ip){
            that = this;
            that.socket = io.connect(_ip);
            that.game = game;

            that.initialize();
        },

        initialize: function(){
            that.onSocket('not connected', function(data) {
                console.error(data)
                //that.emit("get object");
            });
            
        },
        
        init: function(){
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
            that.switchType(data);
		},

        updateObject: function(data){
            var obj = that.getObjById(data.ID);
            obj.x = data.x;
            obj.y = data.y;
        },

        getObjById: function(id){
            for(var i=0; i<that.game.gameObject.length; i++){
                if(id === that.game.gameObject[i].ID){
                    return that.game.gameObject[i];
                }
            }
        },

        switchType: function(data){
            var obj = null;
           
            if(data.oClass){
                // var req = require('module/Objects/Player')
                // console.log(req)
                // obj = new req(that.game, false, 'main', data.x, data.y, data.key, data.w, data.h );
                // console.log('poszlo')
            }else{
                switch(data.type){
                    case 'image':
                        obj = that.game.add[data.type]('main', data.x, data.y, data.key, data.w, data.h);
                        break;
                    case 'sprite':
                        obj = that.game.add[data.type]('main', data.x, data.y, data.key, data.w, data.h);
                        break;
                }
            }
           
            obj.sockID = data.sockID;
            obj.ID = data.ID;

            return obj;
        }
    });

    return Multiplayer;
})
