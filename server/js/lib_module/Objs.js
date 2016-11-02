(function(){
    var my = require("./../../../public/js/lib/myclass.js"); 
    
    var that = null;

    var Objs = my.Class({

        STATIC: {
            ID: 0
        },

        constructor: function(multiplayer){
            this.objs = [];
            this.multiplayer = multiplayer;
            that = this;
        },

        add: function(obj, callback){
            obj.ID = Objs.ID;
            obj.sockID = this.id;
             
            that.objs.push(obj);
            Objs.ID++;
            //if(this.objs[i].socketID !== sockID){
            this.broadcast.emit("share obj", obj);
            //}
            callback(obj);
        },

        remove: function(id){
            var sockID = id;
              
            var tab = [];
            var max = this.objs.length;

            for(var i= 0; i<max; i++){
                if(this.objs[i].sockID === sockID){
                    tab.push(this.objs[i])
                }
            }

            for(var i= 0; i<tab.length; i++){
                this.objs.splice(this.objs.indexOf(tab[i]), 1);
            }
            
            this.multiplayer.socket.emitToAll("removed objs", sockID);
        },

        getObj: function(sock){
            for(var i = 0, max = that.objs.length; i < max; i++){
                if(that.objs[i].socketID !== sock.id){
                     sock.emit("share obj", that.objs[i]);
                }
            }
        },

        update: function(data){
            this.broadcast.emit("update obj", data);
            //this.multiplayer.socket.broadcastToAll("update obj", data, sock);
           
        }
        
    });

    module.exports = Objs;
})();



