var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(3000);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on("connection",function(socket){
    // Display a connected message
    console.log("Server-Client Connected!");
    
    socket.emit("message", "This is my message");
    // When we receive a message...
    socket.on("message",function(data){
        // We got a message... I dunno what we should do with this...
    });
});