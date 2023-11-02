# Day6-Assignment 1 POC
> Assignment to create Bug Tracker Application.

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
  - Go to the project folder "day6_assignments/assignment1"
    - ```bash run command "npm install" ```
  - You will see the "node_modules" folder got generated and the project is ready now

## Checking Application

  - Create a folder as the path "C:\MongoDbData\db" and Start the mongod service by running the below command
    - ```bash run command "mongod --dbpath=C:\MongoDbData\db" ```
  - Go to the project folder "day6_assignments/assignment1"
    - ```bash run command "npm start" ```

## Running Application

  - User Related Activities ::    
      Go To http://localhost:3000/ :: Site Home page/Login Page(also can be accessed as /user/login) [[Method type GET to display the page]]
        - Has Registration link too in bottom as /user/register [[Method type GET to display the page]]
          [[*Note: By default all the users shal be created with user role. For admin user atleast assign one user with role as 'admin' manually in mongodb backend(via atlas)]]  
      
      - Part 1 :: For Normal Users(after login)
        - /user/dashboard [[Method type GET to display the page]]
        - /user/logout [[Method type GET to logout the user and destroy the session]]

    - Part 2 :: For Admin Users(after login) =>
        - /admin/dashboard [[Method type GET to display the page and user lists]]
        - /user/logout [[Method type GET to logout the user and destroy the session]]

