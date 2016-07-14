var io = require("socket.io").listen(3000);
io.sockets.on("connection",function(socket){
    // Display a connected message
    console.log("Server-Client Connected!");
    
    socket.emit("message", "This is my message");
    // When we receive a message...
    socket.on("message",function(data){
        // We got a message... I dunno what we should do with this...
    });
});