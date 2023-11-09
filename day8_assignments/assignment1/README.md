# Day8-Assignment 1 POC
> Assignment to create Dynamic Client-Server Interaction Application Using Socket.IO.

__Table of contents__

  - [System Requirements](#system-requirements)
  - [Application Installation](#application-installation)
  - [Checking Application](#checking-application)
  - [Running Application](#running-application)

## System Requirements

  - Your system must have NodeJs Version 18.0 or above installed in it
  - Mongo Db :: Download the suitable version as per your system from https://www.mongodb.com/try/download/community
  - While installing the Mongo Db, select the MongoDB Atlas option to be downloaded and installed

## Application Installation

  - Download/Clone the code
  - Go to the project folder "day8_assignments" and download as directed below ::
    Backend(Node) :: "node_backend"
      - ```bash run command "npm install" ```
      - You will see the "node_modules" folder got generated and the project is ready now
    Frontend(React) :: "react_front_end"
      - ```bash run command "npm install" ```
      - You will see the "node_modules" folder got generated and the project is ready now

## Checking Application

  - Create a folder as the path "C:\MongoDbData\db" and Start the mongod service by running the below command
    - ```bash run command "mongod --dbpath=C:\MongoDbData\db" ```
  - Go to the project folder "node_backend"
    - ```bash run command "npm start" ```
  And
  - Go to the project folder "react_front_end"
    - ```bash run command "npm start" ```

## Running Application
  
  The Front End site shall run in port 3000 as http://localhost:3000/ and Back Node site shall run in port 4000 as http://localhost:4000/. You shall interact for the project only throug the front end(React site)

  - User Signup ::    
      Go To http://localhost:3000/ :: Click on the "Sign Up" and register(uses the Node  http://localhost:4000/user/register) [[Method type POST to register user]]

  - User Sign In ::    
      Go To http://localhost:3000/ :: Click on the "Sign In" and Login(uses the Node  http://localhost:4000/user/login) [[Method type POST to login user]]

  - Messenger Dashboard(Socket Io) ::    
      Post login it opens "Messenger Dashboard" :: Send Messages(uses the Node Socket Io feature "node_backend => socketio_server)

