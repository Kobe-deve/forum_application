const { WebSocketServer }  = require('ws');
const { Client } = require('pg')

const backendEndpoint = "http://localhost:8081";
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
		let JSONdata = JSON.parse(data);
		// TODO: verify jwt 

		// get room information
		if(typeof JSONdata["room_id"] === 'number')
		{
			const res = await client.query('Select * from message_log where room_id='+JSONdata["room_id"]+';')
			let response = {"messages": JSON.stringify(res.rows)}

			ws.send(JSON.stringify(response));

			// if there's a message being sent, go through process to send the message 
			if(JSONdata["Message"])
			{
				// get user info 
				await fetch(backendEndpoint+"/users/getByUsername/"+JSONdata["User"],
				{
					method: "GET",
					headers: {
						'Accept': 'application/json, text/plain, */*',
						'Content-Type': 'application/json;charset=UTF-8'
					},
				})
				.then(async (response)=>{
					let userData = await response.json();
					let userID = userData["id"];
					
					let body = {
						"room_id":JSONdata["room_id"], 
						"text":JSONdata["Message"], 
						"user_id":userID
					}

					// send message 
					await fetch(backendEndpoint+"/message/send",
					{
						method: "POST",
						headers: {
							'Accept': 'application/json, text/plain, */*',
							'Content-Type': 'application/json;charset=UTF-8'
						},
						body: JSON.stringify(body)
					})
				})
			}
		}
	});
});
