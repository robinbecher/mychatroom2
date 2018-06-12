var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/index.css', function(req, res){
    res.sendFile(__dirname + '/index.css');
});

app.get('/index.html', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/canvas/canvas.html', function(req, res){
    res.sendFile(__dirname + '/canvas.html');
});

app.get('/canvas/canvas.css', function(req, res){
    res.sendFile(__dirname + '/canvas.css');
});

app.get('/canvas/canvas.js', function(req, res){
    res.sendFile(__dirname + '/canvas.js');
});

app.get('/chatroom.html', function(req, res){
    //TODO only if user is logged in
    res.sendFile(__dirname + '/chatroom.html');
});

app.get('/files/avatars.png', function(req, res){
    res.sendFile(__dirname + '/files/avatars.png');
});

app.get('/files/logo.png', function(req, res){
    res.sendFile(__dirname + '/files/logo.png');
});

class User{
    constructor(socket, name){
        this.socket = socket;
        this.name=name;
    }
}

let allClients=[];
io.on('connection', function(socket){

    socket.on('chat message', function(msg, name){
        if(isValid(msg)){
            io.emit('chat message', name+': '+msg);
        }
  });
    socket.on('user joined', function(name){
        allClients.push(new User(socket,name));
        io.emit('chat message', name +' has joined the chatroom!');
        emitUserNumber();
    });
    socket.on('disconnect', function (name) {
      io.emit('chat message' ,name+' has left the chatroom!');
      var i = allClients.indexOf(new User(socket,name));
      allClients.splice(i,1);
      emitUserNumber();
    })
});

function isValid(msg){
    msg+="";
    if(msg===""){
        return false;
    }
    return true;
}

function emitUserNumber() {
    io.emit('chat message','there are currently '+allClients.length+' people in this chatroom.');
}
function checkIsCommand(msg){
    msg+="";
    if (msg.substring(0,0)==="/"){
        return true;
    }else{
        return false;
    }
}

http.listen(80, function(){
  console.log('listening on *:80');
});
