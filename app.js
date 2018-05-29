var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var num = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    num++;
    io.emit('chat message', 'Somebody has joined the chatroom!');
    emitUserNumber();
    socket.on('chat message', function(msg, name){
    io.emit('chat message', name+': '+msg);
  });
    socket.on('disconnect', function () {
      io.emit('Somebody has left the chatroom!');
      emitUserNumber();
    })

});

function emitUserNumber() {
    io.emit('chat message','there are currently '+num+' people in this chatroom.');
};


http.listen(3000, function(){
  console.log('listening on *:3000');
});
