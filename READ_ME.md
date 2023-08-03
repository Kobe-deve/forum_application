Overview:

A generalized chat web application allowing users to 
-create an account
-log in,
-enter rooms through public rooms or private rooms that can be accessed with a code
-send text messages in rooms
-send friend requests to users
-accept friend requests
-message users they are friends with

Data structure:
-Users
	-User_ID
		-Specific database Id for the user 
	-Username
		-Username of the account 
	-Password
		-Password of the account 
	-Email
		-Email used for registration 

	-Friends
		-Users the user is friends with 
	-Accessible_Rooms
		-Rooms the user can access 
	
-Rooms
	-Room_ID
		-Id of the room 
	-Message_Log
		-Log of all messages sent 
	-Time_Created
		-The time the room was created
	-Active_status
		-Whether the room is open/locked/closed
	-Room_Password
		-Password for the room 
		
-Message 
	-Text 
		-Message body 
	-Time_stamp
		-When the message was sent 
	-User_ID
		-The id of the user who sent the message 

Stack/Technologies:
-(Desktop) Frontend:
	React/JavaScript
-Backend:
	Django
-Database:
	Postgres
	
Design:
	
	Pages:
		
		Initial:
			Login Page
			Create User Page
			Error (Not Found)
			
		Logged In:
			Dashboard
			Chatroom
			Friends Page 
			Friend Chat 
			Settings 
			
		Administrator:
			View users
			View rooms 
	
		