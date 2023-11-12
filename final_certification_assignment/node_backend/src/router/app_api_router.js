import { Router } from 'express'
import * as apiValidator from "../middleware/api_validator.js"
import * as appApiController from "../controller/app_api_controller.js"

// Weather Api Routes
const weatherAPIRoute = Router()
// Get Weather API Route
weatherAPIRoute.get('/weather', apiValidator.weatherQueryValidator, appApiController.getWeather)

// News Api Routes
const newsAPIRoute = Router()
// Get Latest news API Route
newsAPIRoute.post('/', apiValidator.addNewsValidator, appApiController.addNews)
newsAPIRoute.get('/', appApiController.addNews)

export { weatherAPIRoute, newsAPIRoute }

