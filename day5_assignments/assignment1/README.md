# Day5-Assignment 1 POC
> Assignment to create Order Management and Status App.

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
  - Go to the project folder "day5_assignments/assignment1"
    - ```bash run command "npm install" ```
  - You will see the "node_modules" folder got generated and the project is ready now

## Checking Application

  - Create a folder as the path "C:\MongoDbData\db" and Start the mongod service by running the below command
    - ```bash run command "mongod --dbpath=C:\MongoDbData\db" ```
  - Go to the project folder "day5_assignments/assignment1"
    - ```bash run command "npm start" ```

## Running Application

  - User Related Activities ::
    - Part 1 :: To PLace Order =>
      Go To http://localhost:3000/user/add-order :: To PLace Order
        - /user/add-order [[Method type GET to display the page]]
        - /user/add-order [[Method type POST to post the order forms data and create order]]
        - /user/order-placed [[Method type GET Success page to be redirected to after order is placed]]
        - /user/order-error [[Method type GET Error page to be redirected to if any issue occurs]]

    - Part 2 :: Admin Dashboard =>
      Go To http://localhost:3000/user/add-order :: To PLace Order
        - /user/add-order [[Method type GET to display the page]]
        - /user/add-order [[Method type POST to post the order forms data and create order]]
        - /user/order-placed [[Method type GET Success page to be redirected to after order is placed]]
        - /user/order-error [[Method type GET Error page to be redirected to if any issue occurs]]


