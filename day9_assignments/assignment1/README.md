# Day9-Assignment 1 POC
> Assignment to Test the API's(Using Mocha and Chai).

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
  - Go to the project folder "day9_assignments/assignment1"
    - ```bash run command "npm install" ```
  - You will see the "node_modules" folder got generated and the project is ready now

## Checking Application

  - Create a folder as the path "C:\MongoDbData\db" and Start the mongod service by running the below command
    - ```bash run command "mongod --dbpath=C:\MongoDbData\db" ```
  - Go to the project folder "day9_assignments/assignment1"
    - ```bash run command "npm start" ```

## Running Application

  - Test the application ::
    - Go To "day9_assignments/assignment1" and run :: 
      ```bash run command "npm test" ```

      You Must get output like below ::
      ```testOutput
      Check Server & APIs
        ✔ Server started without crashing
        ✔ GET:: /user/all

      Calculator Util Test
        ✔ should add 2 number and provide result
        ✔ should return null if a is null
      ```

