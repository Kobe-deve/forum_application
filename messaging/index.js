const { WebSocketServer }  = require('ws');
const { Client } = require('pg')

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', async function connection(ws) {
  
	const client = new Client({
		user: process.env.DATABASE_USERNAME,
		host: process.env.DATABASE_HOST,
		database: process.env.DATABASE_NAME,
		password: process.env.DATABASE_PASSWORD,
		port: process.env.DATABASE_PORT,
	})  	  
	
	// initial connection 
	client.connect(function(err) {
		if (err) throw err;	  
	});
    
	// response based on messages sent 
    ws.on('message', async function message(data) {
		const res = await client.query('Select * from message_log where room_id=1;')
		let response = {"messages": JSON.stringify(res.rows)}

		ws.send(JSON.stringify(response));
    });
});
