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
		Test
			gradlew test 

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
			Create Room 
			Join Room
			Friends Page 
			Friend Chat 
			Settings 
			
		Administrator:
			View users
			View rooms 
	
Resources:
https://studygyaan.com/spring-boot/how-to-connect-postgresql-database-in-spring-boot-project
https://www.amarjanica.com/externalize-sql-statements-in-java
https://medium.com/@xoor/jwt-authentication-service-44658409e12c
