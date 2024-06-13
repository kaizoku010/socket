const http = require('http');
const { Server } = require('socket.io');

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Socket.io server running\n');
});

// Initialize Socket.io with CORS settings
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for CORS
    methods: ['GET', 'POST'] // Allow GET and POST methods
  }
});

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log('Client connected');

  // Handle 'message' event
  socket.on('message', (message) => {
    console.log('Received message:', message);
    socket.emit('messageResponse', { response: 'Message received' });
  });

  // Handle 'battery' event
  socket.on('battery', (data) => {
    console.log('Device battery: ', data);
    socket.emit('batteryResponse', { response: 'Battery data received' });
  });

  // Handle 'location' event
  socket.on('location', (data) => {
    console.log('Device Location: ', data);
    socket.emit('locationResponse', { response: 'Location data received' });
  });

  // Handle 'mediaData' event
  socket.on('mediaData', (data) => {
    console.log('Data Sent from React (MEDIA DATA): ', data);
    socket.emit('mediaDataResponse', { response: 'Media data received' });
  });

  socket.on('hello', (data) => {
    console.log('Titles: ', data);
    socket.emit('helloResponse', { response: 'Hello data received' });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server on port 8080
server.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
