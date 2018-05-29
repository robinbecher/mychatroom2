var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var allClients=[];
io.on('connection', function(socket){
    allClients.push(socket);
    io.emit('chat message', 'Somebody has joined the chatroom!');
    emitUserNumber();
    socket.on('chat message', function(msg, name){
    io.emit('chat message', name+': '+msg);
  });
    socket.on('disconnect', function () {
      io.emit('Somebody has left the chatroom!');
      var i = allClients.indexOf(socket);
      allClients.splice(i,1);
      emitUserNumber();
    })

});

function emitUserNumber() {
    io.emit('chat message','there are currently '+allClients.length+' people in this chatroom.');
};


http.listen(3000, function(){
  console.log('listening on *:3000');
});
