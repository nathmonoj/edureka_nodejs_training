import { Router } from 'express'
import * as apiController from "../controller/api_controller.js"

const OrderRoute = Router()

OrderRoute.get('/add', apiController.addOrderPage)


/* OrderRoute.post('/add', apiController.addMovie)
OrderRoute.get('/', apiController.getMovies)
OrderRoute.get('/sorted', apiController.getMoviesSorted)
OrderRoute.put('/:id', apiController.updateMovie) */


export default OrderRoute

