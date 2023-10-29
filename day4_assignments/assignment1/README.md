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
    - ```bash run command "npm start" ```

## Running Application

  - Open Postman and try the below command s for different MongoDb Features
    - Qst 1. Add 5 movies to the collection, every movie document should include the following properties:
      name, genre, rating (out of 10)and languageTo
      API to Add new movie :: http://localhost:3000/movies/add [[Method type POST]]
      ```
      Internal Query Running ::
      const newMovie = new MoviesModel(body)
      await newMovie.save()
      ```
      Sample movie json body ::  
      ```
      {
        "name": "The Twilight Saga: New Moon",
        "genre": "Drama",
        "rating": "7.8",
        "language": "English"
      }
      ```
    - Qst 2. Write a query that returns all the movies
      API to Get All movies :: http://localhost:3000/movies [[Method type GET]]
      ```
      let movies = await MoviesModel.find()
      ```
    - Qst 3. Write a query to find a movie name using findOne method (Donot use limit() method)
      API to Find a single movie by name :: http://localhost:3000/movies?name="The Twilight Saga: New Moon" [[Method type GET]]
      ```
      let movies = await MoviesModel.findOne({ name: queryName })
      ```
    - Qst 4. Write a query that returns the three highest rated movies
      API to Get Movies(Sorted) :: 
      http://localhost:3000/movies/sorted [[Method type GET]] :: To get the list of all movies sorted descending on rating
      http://localhost:3000/movies/sorted?sort=1 [[Method type GET]] :: To get the list of all movies sorted ascending on rating
      http://localhost:3000/movies/sorted?sort=1&count=2 [[Method type GET]] :: To get the list of sorted ascending on rating with limit/count of result
      ```
      let queryCount = req && req.query && req.query.count || ''
      let sort = (req && req.query && req.query.sort) ? { rating: req.query.sort } : { rating: -1 }
      let movies = await MoviesModel.find().sort(sort).limit(queryCount)
      ```
    - Qst 5. Add a key called achievements in any two documents. One document should have ‘Super hit’
      and other should have ‘Super Duper Hit’ as value to key achievements. This task should be performed in two ways.
      i. Using update() method
      ii.Using save() method
      Hint: For save, you have to query the object andstore it in a variable first
      API to Add new key "achievements" by id  :: http://localhost:3000/movies/653310d8b10b70c8b0074ab3 [[Method type PUT]]
      ```
      const { params, body } = req
      const { id } = params
      let movies = await MoviesModel.findByIdAndUpdate({ _id: id }, body)
      ```
      Sample movie json body ::  
      ```
      {
        "achievements": "Super Hit"
      }
      OR
      ```
      {
        "achievements": "Super Duper Hit"
      }
      ```
    - Qst 6. Write a query that returns all the movies that have both the ‘Super Hit’ and the ‘Super Duper Hit’
      achievements
      API to Find movie by achievements :: http://localhost:3000/movies?achievements=[["Super Hit", "Super Duper Hit"]][[Method type GET]]
      ```
        achievements = JSON.parse(`${achievements}`)
        movies = await MoviesModel.find({ achievements: { $in: achievements } })
      ```
    - Qst 7. rite a query that returns only those movies that have achievements
      API to Find movie having achievements :: http://localhost:3000/movies?onlyfield=achievements[[Method type GET]]
      ```
        const findQuery = {}
        findQuery[onlyfield] = { $exists: true }
        movies = await MoviesModel.find(findQuery)
      ```

