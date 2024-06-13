const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Socket.io server running\n');
});

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('Client connected');

  // Test data emission
  setInterval(() => {
    // console.log('Emitting hello from server');
    socket.emit('hello', 'Hello from server');
  }, 5000);

  socket.on('message', (message) => {
    console.log('Received message:', message);
    socket.emit('response', 'Message received: ' + message); // Emit a response back to the client
  });

  socket.on('battery', (data) => {
    console.log('Received battery data:', data);
    socket.emit('batteryStatus', 'Battery level: ' + data.batteryLevel); // Emit battery status back to the client
  });

  socket.on('location', (data) => {
    console.log('Received location data:', data);
    socket.emit('locationStatus', 'Location received: ' + JSON.stringify(data)); // Emit location status back to the client
  });

  socket.on('mediaData', (data) => {
    console.log('Received media data:', data);
    socket.emit('mediaStatus', 'Media data received'); // Emit media data status back to the client
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
