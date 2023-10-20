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
    const allMovies = await MoviesModel.find()
    res.json({
      data: [allMovies]
    })
    response.json(allMovies)
  }
  catch {
    res.json({
      message: 'Coulnot get the Movies list'
    })
  }
}