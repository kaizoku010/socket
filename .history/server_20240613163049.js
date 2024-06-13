const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for CORS
    methods: ['GET', 'POST'] // Allow GET and POST methods
  }
});

// Middleware to set CSP headers
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-eval'; connect-src 'self' wss://socket-yzb8.onrender.com;");
  next();
});

app.get('/', (req, res) => {
  res.send('Socket.io server running\n');
});



io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('message', (message) => {
    console.log('Received message:', message);
  });


  
  socket.on('battery', (data) => {
    console.log('Device battery:', data);
  });
  socket.on('location', (data) => {
    console.log('Device Location:', data);
  });
  socket.on('mediaData', (data) => {
    console.log('Data Sent from React (MEDIA DATA):', data);
  });
  socket.on('hello', (data) => {
    console.log('Titles:', data);
    socket.emit("hello", data)
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(8080, () => {
  console.log('Server is listening on port 8080');
});
