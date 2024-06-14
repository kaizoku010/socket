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




    socket.on('message', (message) => {
      console.log('Received message:', message);
      socket.emit('response', 'Message received: ' + message);
    });
  
    socket.on('battery', (data) => {
      console.log('Received battery data:', data);
      socket.emit('batteryStatus', 'Battery level: ' + data.batteryLevel);
    });
  
    socket.on('location', (data) => {
      console.log('Received location data:', data);
      socket.emit('locationStatus', 'Location received: ' + JSON.stringify(data));
    });
    socket.on('media', (data) => {
      try {
        console.log('Received media data:', data);
        const mediaData = {
          adID: data.adID,
          adName: data.adName,
          type: data.type
        };
        console.log('Emitting media data:', mediaData);
        socket.emit('media', mediaData);
      } catch (error) {
        console.error('Error emitting media data:', error);
      }
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  
  });
});

server.listen(8080, () => {
  console.log('Listening on port 8080');
});
