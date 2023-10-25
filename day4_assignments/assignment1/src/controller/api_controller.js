import { MoviesModel } from '../schema/movies_schema.js'

export async function addMovie(req, res) {
  try {
    const { body } = req
    const newMovie = new MoviesModel(body)
    await newMovie.save()
    res.json({
      message: 'New Movie Added Successfully'
    })
  } catch (error) {
    res.json({
      message: 'Couldnot add New Movie'
    })
  }
}

export async function getMovies(req, res) {
  try {
    let movies = {}
    if (req && req.query && req.query) {
      let { name, achievements, onlyfield } = req.query
      if (name) {
        movies = await MoviesModel.findOne({ name: name })
      }
      else if (achievements) {
        achievements = JSON.parse(`${achievements}`)
        movies = await MoviesModel.find({ achievements: { $in: achievements } })
      }
      else if (onlyfield) {
        const findQuery = {}
        findQuery[onlyfield] = { $exists: true }
        movies = await MoviesModel.find(findQuery)
      }
      else {
        movies = await MoviesModel.find({})
      }
    }
    else {
      movies = await MoviesModel.find({})
    }
    res.json({
      data: [movies]
    })
  }
  catch (err) {
    console.log('err==', err)
    res.json({
      message: 'Couldnot find Movie'
    })
  }
}

export async function getMoviesSorted(req, res) {
  try {
    let queryCount = req && req.query && req.query.count || ''
    let sort = (req && req.query && req.query.sort) ? { rating: req.query.sort } : { rating: -1 }
    let movies = await MoviesModel.find().sort(sort).limit(queryCount)

    res.json({
      data: [movies]
    })
  }
  catch (err) {
    console.log('err==', err)
    res.json({
      message: 'Couldnot find Movie'
    })
  }
}

export async function updateMovie(req, res) {
  try {
    const { params, body } = req
    const { id } = params
    let movies = await MoviesModel.findByIdAndUpdate({ _id: id }, body)
    movies = await MoviesModel.findById({ _id: id })
    res.json({
      message: 'Movie updated successfully',
      data: [movies]
    })
  }
  catch (err) {
    res.json({
      message: 'Couldnot find Movie'
    })
  }
}