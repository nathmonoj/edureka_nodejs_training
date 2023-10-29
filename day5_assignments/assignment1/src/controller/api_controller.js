import { OrderModel } from '../schema/schema.js'
import { APIResponse, APIError } from '../utils/response_formatter.js'

// Admin Controllers
export async function addMovie(req, res) {
  try {
    const { body } = req
    const newMovie = new OrderModel(body)
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
        movies = await OrderModel.findOne({ name: name })
      }
      else if (achievements) {
        achievements = JSON.parse(`${achievements}`)
        movies = await OrderModel.find({ achievements: { $in: achievements } })
      }
      else if (onlyfield) {
        const findQuery = {}
        findQuery[onlyfield] = { $exists: true }
        movies = await OrderModel.find(findQuery)
      }
      else {
        movies = await OrderModel.find({})
      }
    }
    else {
      movies = await OrderModel.find({})
    }
    res.render("add_order", { title: 'Get Movies', people: movies })
    //new APIResponse(res, [movies], "This is the data for all movies").json();
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
    let movies = await OrderModel.find().sort(sort).limit(queryCount)

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
    let movies = await OrderModel.findByIdAndUpdate({ _id: id }, body)
    movies = await OrderModel.findById({ _id: id })
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