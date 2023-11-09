# Day6-Assignment 1 POC
> Assignment to create Shopping cart application using jwt.

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
    - Part 1 :: To PLace Bug =>
      Go To http://localhost:3000/user/add-bug :: To Create the bug
        - /user/add-bug [[Method type GET to display the page]]
        - /user/add-bug [[Method type POST to post the bug forms data and create bug]]
        - /user/bug-created [[Method type GET Success page to be redirected to after bug is created]]
        - /user/bug-error [[Method type GET Error page to be redirected to if any issue occurs]]

    - Part 2 :: Admin Dashboard =>
      Go To http://localhost:3000/admin/dashboard :: To Show the Bugs and the status
        - If buged date and current date of system is same then set status as In progress
        - if buged date is one day more than the current date then set status as Dispatched
        - if buged date is two days more than the current date then set status as Delivered
[[*Note: Special usage of environmemt config(.env file) and assigning support team to each ticket while creation]]

