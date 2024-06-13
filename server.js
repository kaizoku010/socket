io.on('connection', (socket) => {
  console.log('Client connected');

  // Emit 'hello' message for testing purposes
  setInterval(() => {
    console.log('Emitting hello from server');
    socket.emit('hello', 'Hello from server');
  }, 5000);

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
    console.log('Received media data:', data);
    socket.emit('media', 'Media data received');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
