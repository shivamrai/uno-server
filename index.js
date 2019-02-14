const app = require('./server/app');
const config = require('./server/config/config');
const http = require('http');
const socketService = require('./server/service/socket.service');
// const io = require('socket.io');

const server = http.createServer(app);
const port = config.server.port;
// const scoketIo = io(server);

const onError = (error)=> {
  if(error.syscall !== 'listen') throw error;

  switch(error.code) {
    case 'EACCES':
      console.error(`${port} requires elevated privileges.`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${port} is already in use.`);
      process.exit(1);
      break;
    default: throw error;
  }
}

const onListen = () => {
  const address = server.address();
  const msg = typeof address === 'string' ? address : `port ${address.port}`;

  console.log(`server is listening on ${msg}`);
}

// scoketIo.on('connection', socket => {
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });

//   socket.on('test', console.log);
// });

// scoketIo.on('test', msg => {
//   console.log(msg);
// });

socketService.init(server);
server.listen(port);
server.on('error', onError);
server.on('listening', onListen);

module.exports = server;