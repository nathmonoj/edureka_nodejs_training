# Day3-Assignment 1 POC
> Assignment to test API to parse JSON Files.

__Table of contents__

  - [System Requirements](#system-requirements)
  - [Application Installation](#application-installation)
  - [Checking Application](#checking-application)
  - [Running Application](#running-application)

## System Requirements

  - Your system must have NodeJs Version 18.0 or above installed in it

## Application Installation

  - Download/Clone the code
  - Go to the project folder "day3_assignments/assignment1"
    - ```bash run command "npm install" ```
  - You will see the "node_modules" folder got generated and the project is ready now

## Running Application

  - Go to the project folder "day3_assignments/assignment1" ::
    - ```bash run command npm start```
    
  - You will see the console output as "Application server started at: http://localhost:3000"

  - Now via Postman/Browser try to access the Employee GET endpoint http://localhost:3000/employee/:id
    - Where the :id is any employee id from employee.json. ex. url http://localhost:3000/employee/rirani

  - Now via Postman/Browser try to access the Project GET endpoint http://localhost:3000/project/:id
    - Where the :id is any project id from project.json. ex. url http://localhost:3000/project/LSC

  - Now via Postman/Browser try to access the Employee Full Details GET endpoint http://localhost:3000/getemployeedetails/:id
    - Where the :id is any employee id from employee.json. ex. url http://localhost:3000/getemployeedetails/rirani

---
**NOTE**

Addons :: 
  - Usage of shorthand operators
  - proper error handling with status codes
  - Reuse of codes via granular functions

---