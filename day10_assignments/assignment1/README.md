# Day10-Assignment 1 POC
> Assignment to Test the Git Hub API to get user information based on user name.

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
  - Go to the project folder "day10_assignments/assignment1"
    - ```bash run command "npm install" ```
  - You will see the "node_modules" folder got generated and the project is ready now

## Checking Application

  - Go to the project folder "day10_assignments/assignment1"
    - ```bash run command "npm start" ```

## Running Application

  - Get the User Information from Git-Hub ::    
      Via POSTMAN access http://localhost:3000/user/github-info/{{username}} :: [[Method type GET to return user information from Git-Hub]]

[[*Note: Internally cals the https://api.github.com/users/{{USER_NAME}} Git-Hub API]]

