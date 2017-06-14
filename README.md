#CMMI Template project by using Hapi and MongoDB
This version is able to 
1.	Create server and login
2.	Display user 
3.	Edit role and permission 

Requirement 
1.	Node JS  , Path to download: https://nodejs.org/en/download/ 
2.	Database : MongoDB, Path to download: https://www.mongodb.com/download-center 
Note: I did not use Mysql as database because I don’t have access when I was coding. 

Folder structure 
-	Public  (front end code)
-	Src (back end code)

Configuration 
1.	Set IP to connect backend server : ./public/js/config/api.js
2.	Set server port and database server : ./src/config/index.js
3.	Set redmine server IP : ./src/services/redmine.js 

How to run server:
-	Once mongodb server has been started, just type following command in terminal on the root folder
“node index.js”
