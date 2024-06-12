const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Handle incoming messages
  ws.on('message', (message) => {
    console.log('Received message from React:', message.toString());
    // Broadcast the received message to all clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle disconnections
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server listening on port 8080');
