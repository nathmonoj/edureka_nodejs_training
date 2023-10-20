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