const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Socket.io server running\n');
});

const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (message) => {
    console.log('Received message:', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


socket.on('mediaData', (data) => {
  console.log('Received media data:', data);
  // Handle received media data here
});


server.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
