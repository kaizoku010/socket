const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST']
  }
});

app.use(cors());


io.on('connection', (socket) => {
  console.log('New client connected');


  
  socket.on('disconnect', () => {
    console.log('Client disconnected');  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  
  });
});

server.listen(8080, () => {
  console.log('Listening on port 8080');
});
