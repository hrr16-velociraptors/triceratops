var express = require('express');
var path = require('path');
var morgan = require('morgan');



var app = express();
app.use(morgan('dev'));
//app.use(express.static(path.resolve(__dirname, '../build')))
//app.use('/', express.static(path.resolve(__dirname, '../build/index_chat.html')));
app.use('/', function(req, res){
  res.sendFile(path.resolve(__dirname, '../build/index_chat.html'))
});


var http = require('http').Server(app);
//var io = require('socket.io')(http);
var port = process.env.PORT || 3000;


var server = app.listen(port, function(){
  console.log(`server is now listening on port ${port}`);
});

var io = require('socket.io').listen(server);
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected')
  })
  socket.on('chat message',function(msg){
    console.log('message: '+msg);
    io.emit('chat message', msg);
  });
});


