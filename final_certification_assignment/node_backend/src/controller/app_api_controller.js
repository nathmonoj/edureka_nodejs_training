import axios from "axios";
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

// Register User
export async function addNews(req, res) {
  try {
    var { news_title, news_data } = req.body;
    const user = await UserModel.findOne({ email })
    let templateData = { data: [], message: '' }
    let isError = false
    if (user) {
      isError = true
      templateData.data = { error: 'EMAIL_IN_USE' }
      templateData.message = 'This email is already in use'
    }
    else {
      const hashpassword = await Bcrypt.hash(password, 10);
      const role = 'admin'
      let newUser = new UserModel({ fname, lname, role, email, password: hashpassword })
      newUser = await newUser.save()
      const { _id, ...rest } = newUser
      var { password, __v, updatedAt, ...userData } = rest._doc
      templateData.data = [userData]
      templateData.message = `User is created successfully(With Role as ${role})`
    }
    if (!isError) {
      new APIResponse(res, templateData.data, templateData.message).json()
    }
    else {
      new APIError(res, templateData.data, templateData.message, 400).json()
    }
  } catch (error) {
    new APIError(res, { error: 'INTERNAL_SERVER_ERROR' }, "Internal Server Error Occured!!").json()
  }
}
