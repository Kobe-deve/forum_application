const WebSocket = require('ws');
var socket = new WebSocket("ws://localhost:8081/sockettest");

// Connection opened
socket.addEventListener("open", (event) => {
  socket.send("{\"message\": \"This is a test\"}");
  console.log("OPEN ");
});

// Listen for messages
socket.addEventListener("message", (event) => {
  console.log("Message from server }", event.data);
});