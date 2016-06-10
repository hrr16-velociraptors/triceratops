var app = require('./server/app.js');
var http = require('http').Server(app);
//var io = require('socket.io')(http);
var port = process.env.PORT || 8080;









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
