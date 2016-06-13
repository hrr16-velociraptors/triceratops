var app = require('./server/app.js');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var port = process.env.PORT || 8080;

// var server = app.listen(port, function(){
//   console.log(`server is now listening on port ${port}`);
// });

var i = 0;

io.on('connection', function(socket){
  socket.on('chat message',function(msg){
    console.log('message: '+msg);
    io.emit('chat message', {message: msg, id: i++});
  });
});


http.listen(port, function(){
  console.log(`server is now listening on port ${port}`);
})
