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
	
	client.connect(function(err) {
	  if (err) throw err;
	  console.log("Connected!");
	  
	});
    
	const res = await client.query('Select * from message_log where room_id=1;')
	console.log(res.rows)
	
  ws.on('message', function message(data) {
    
	console.log('received: %s', data);
  });

  ws.send('something');
});
