Overview:

A generalized chat web application allowing users to 
-create an account
-log in,
-enter rooms through public rooms or private rooms that can be accessed with a code
-send text messages in rooms
-send friend requests to users
-accept friend requests
-message users they are friends with

Running commands:
	Frontend:
		Run:
			npm start 
		Test
			npm test -- --coverage --watchAll=false
			
	Backend:
		Run:
			gradlew bootRun

Data structure:
-Users (forum_user)
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
		
	-Status
		-Is the user currently online/offline?
	
-Rooms (forum_room)
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
		
-Message (message_log)
	-Text 
		-Message body 
	-Time_stamp
		-When the message was sent 
	-User_ID
		-The id of the user who sent the message 
	-Room_ID
		-The room the message is in, acts as a foreign key

Stack/Technologies:
-(Desktop) Frontend:
	React/JavaScript
-Backend:
	Spring Boot/Java
-Database:
	PostgreSQL
	
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
	
Resources:
https://studygyaan.com/spring-boot/how-to-connect-postgresql-database-in-spring-boot-project