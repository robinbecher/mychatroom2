var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// var bodyParser = require('body-parser')
// app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//     extended: true
// }));
//
// app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded()); // to support URL-encoded bodies


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/index.css', function(req, res){
    res.sendFile(__dirname + '/index.css');
});

app.get('/index.html', function(req, res){
    res.sendFile(__dirname + '/index.html');
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

var allClients=[];
io.on('connection', function(socket){

    socket.on('chat message', function(msg, name){
        if(isValid(msg)){
            io.emit('chat message', name+': '+msg);
        }
  });
    socket.on('user joined', function(name){
        allClients.push(socket);
        io.emit('chat message', name +' has joined the chatroom!');
        emitUserNumber();
    });
    socket.on('disconnect', function () {
      io.emit('Somebody has left the chatroom!');
      var i = allClients.indexOf(socket);
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
};

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
