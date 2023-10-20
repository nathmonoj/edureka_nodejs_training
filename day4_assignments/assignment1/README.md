# Day4-Assignment 1 POC
> Assignment to try and run Mongo Db Queries.

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
  - Go to the project folder "day4_assignments/assignment1"
    - ```bash run command "npm install" ```
  - You will see the "node_modules" folder got generated and the project is ready now

## Checking Application

  - Create a folder as the path "C:\MongoDbData\db" and Start the mongod service by running the below command
    - ```bash run command "mongod --dbpath=C:\MongoDbData\db" ```
  - Go to the project folder "day4_assignments/assignment1"
    - ```bash run command "npm install" ```
    - ```bash run command "npm start" ```

## Running Application

  - Open Postman and try the below command s for different MongoDb Features
    - To Add new movie :: http://localhost:3000/movies/add [[Method type POST]]
      ```
      Internal Query Running ::
      const newMovie = new MoviesModel(body)
      await newMovie.save()
      ```
      Sample movie json body ::  
      ```
      {name": "The Twilight Saga: New Moon",
        "genre": "Drama",
        "rating": "7.8",
        "language": "English"
      }
      ```
    - To Get All movies :: http://localhost:3000/movies [[Method type GET]]
      ```
      const allMovies = await MoviesModel.find()
      ```

