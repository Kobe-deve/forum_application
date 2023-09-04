const WebSocket = require('ws');
var socket;

socket = new WebSocket("ws://localhost:8081/sockettest");

socket.onerror = function(e) {
	console.log("Could not connect");
}

// Connection opened
socket.addEventListener("open", (event) => {
  socket.send("{\"room_id\": 1}");
  console.log("OPEN ");
});

// Listen for messages
socket.addEventListener("message", (event) => {
	let response = JSON.parse(event.data);
	console.log(JSON.parse(response["messages"]));
	socket.close();
});
