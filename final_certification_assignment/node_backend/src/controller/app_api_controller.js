import axios from "axios";
import { NewsModel } from '../schema/news_schema.js'
import { APIResponse, APIError } from '../middleware/response_formatter.js'
import dotenv from "dotenv";
dotenv.config();

export async function getWeather(req, res) {
  try {
    const { query } = req
    const { lat, long } = query
    let templateData = { data: [], message: '' }
    if (lat && long) {
      try {
        // Preparing teh weather app api endpoint
        let getWeatherEndpoint = `${process.env.WEATHER_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.WEATHER_APP_APP_ID}`
        // Getting the data from weather app api
        const { data } = await axios.get(getWeatherEndpoint)
        if (data && data.id && data.name && data.main) {
          templateData.data = [data]
          templateData.message = `Weather Data`
          new APIResponse(res, templateData.data, templateData.message).json()
        }
        else {
          templateData.data = { error: 'Invalid_LAT_LONG' }
          templateData.message = `Invalid Latitude/Longitude.`
          new APIError(res, templateData.data, templateData.message, 404).json()
        }
      }
      catch (error) {
        templateData.data = { error: 'Invalid_LAT_LONG' }
        templateData.message = `Invalid Latitude/Longitude.`
        new APIError(res, templateData.data, templateData.message, 404).json()
      }
    } else {
      templateData.data = { error: 'INCORRECT_QUERY_PARAM' }
      templateData.message = 'lat/long query params is/are missing.'
      new APIError(res, templateData.data, templateData.message, 400).json()
    }
  } catch (error) {
    console.log('error')
    console.log(error)
    new APIError(res, { error: 'INTERNAL_SERVER_ERROR' }, "Internal Server Error Occured!!").json()
  }
}

// Add News
export async function addNews(req, res) {
  try {
    var { news_title, news_data } = req.body;
    const news = await NewsModel.findOne({ news_title })
    let templateData = { data: [], message: '' }
    let isError = false
    if (news) {
      isError = true
      templateData.data = { error: 'NEWS_ALREADY_EXISTS' }
      templateData.message = 'This news is already added'
    }
    else {
      let news = new NewsModel({ news_title, news_data })
      news = await news.save()
      const { _id, ...rest } = news
      var { __v, updatedAt, ...newsData } = rest._doc
      templateData.data = [newsData]
      templateData.message = `News Data is added successfully`
    }
    if (!isError) {
      new APIResponse(res, templateData.data, templateData.message).json()
    }
    else {
      new APIError(res, templateData.data, templateData.message, 400).json()
    }
  } catch (error) {
    console.log(error)
    new APIError(res, { error: 'INTERNAL_SERVER_ERROR' }, "Internal Server Error Occured!!").json()
  }
}

// Add News
export async function getNews(req, res) {
  try {
    var { news_title, news_data } = req.body;
    const allNews = await NewsModel.find({}, { _id: 0, updatedAt: 0, __v: 0 }).sort({ createdAt: -1 })
    let templateData = { data: [], message: '' }
    let isError = false
    if (allNews) {
      templateData.data = allNews
      templateData.message = `All News Data List`
    }
    else {
      isError = true
      templateData.data = { error: 'NO_NEWS_PRESENT' }
      templateData.message = 'There is no news present/currently available'
    }
    if (!isError) {
      new APIResponse(res, templateData.data, templateData.message).json()
    }
    else {
      new APIError(res, templateData.data, templateData.message, 400).json()
    }
  } catch (error) {
    console.log(error)
    new APIError(res, { error: 'INTERNAL_SERVER_ERROR' }, "Internal Server Error Occured!!").json()
  }
}
