# Final-Certification-Assignment 1 POC
> Assignment to build a Media App.
  Description :: Application has two parts.
  Customer Front End :: To display Latest News, Weather Update, Sign In and Sign Up sections
  Admin Back End :: To display Latest News, Weather Update, Sign Up and Sign In users

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
  - Go to the project folder "final_certification_assignment" and download as directed below ::
    Backend(Node) :: "node_backend"
      - ```bash run command "npm install" ```
      - You will see the "node_modules" folder got generated and the project is ready now
      [[*Note :: If windows user and doesnot have a local certificate issued, can run command ```bash "export NODE_TLS_REJECT_UNAUTHORIZED=0"``` to resolve the api certificate issue while calling  the weather apis]]

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


  - Weather-Update ::    
      Go To http://localhost:3000/ :: Click on the "Weather-Update" section and you shall get the weather of your current location(uses the Node  http://localhost:4000/weather/api/v1/weather) [[Method type POST to get the latest weather update]]

  - Latest News ::    
      Go To http://localhost:3000/ :: Click on the "Weather-Update" section and you shall get the weather of your current location(uses the Node  http://localhost:4000/news) [[Method type POST to get the latest news update]]

  - User Signup ::    
      Go To http://localhost:3000/ :: Click on the "Sign Up" and register(uses the Node  http://localhost:4000/user/register) [[Method type POST to register user as ADMIN]]

  - User Sign In ::    
      Go To http://localhost:3000/ :: Click on the "Sign In" and Login(uses the Node  http://localhost:4000/user/login) [[Method type POST to login user user as ADMIN]]
