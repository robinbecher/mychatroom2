var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/chatroom.html', function(req, res){
    //TODO only if user is logged in
    res.sendFile(__dirname + '/chatroom.html');
});

app.get('/files/avatars.png', function(req, res){
    res.sendFile(__dirname + '/files/avatars.png');
});



var allClients=[];
io.on('connection', function(socket){
    allClients.push(socket);
    io.emit('chat message', 'Somebody has joined the chatroom!');
    emitUserNumber();
    socket.on('chat message', function(msg, name){
        // if (checkIsCommand(msg)){

        // }else{
            io.emit('chat message', name+': '+msg);
        // }
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

function checkIsCommand(msg){
    msg+="";
    if (msg.startsWith("/")){
        return true;
    }else{
        return false;
    }
}

http.listen(80, function(){
  console.log('listening on *:80');
});
