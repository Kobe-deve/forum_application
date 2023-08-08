The config file that holds the secret for generating the JWT is defined under the 
"backend\backend\src\main\resources\application.properties" file

application.properties format:

server.port=(localhost port #)
spring.datasource.url=(postgres url)
spring.datasource.username=(postgres username)
spring.datasource.password=(postgres password)
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.hibernate.ddl-auto=(Create - create new database, update - update database)
 
jwt.signature = (String for secret)