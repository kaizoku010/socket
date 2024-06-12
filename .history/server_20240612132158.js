const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 }); 

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received message:', message.toString());
    // Broadcast message to all connected clients (optional)
    // ws.send('Server response'); // Example response
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server listening on port 8080');
