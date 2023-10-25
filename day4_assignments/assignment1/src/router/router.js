import { Router } from 'express'
import * as apiController from "../controller/api_controller.js"

const MoviesRoute = Router()

MoviesRoute.post('/add', apiController.addMovie)
MoviesRoute.get('/', apiController.getMovies)
MoviesRoute.get('/sorted', apiController.getMoviesSorted)
MoviesRoute.put('/:id', apiController.updateMovie)


export default MoviesRoute

