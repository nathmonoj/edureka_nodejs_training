import axios from "axios";
import { APIResponse, APIError } from '../middleware/response_formatter.js'
import dotenv from "dotenv";
dotenv.config();
const GITHUB_USER_INFO_ENDPOINT = process.env.GITHUB_USER_INFO_ENDPOINT;

// Get User Info Details
export async function getUserInfoDetails(req, res) {
  try {
    const { params } = req
    const { id } = params
    let templateData = { data: [], message: '' }
    if (id) {
      let githubActualEndpoint = GITHUB_USER_INFO_ENDPOINT.replace('{{USER_NAME}}', id)
      try {
        const { data } = await axios.get(githubActualEndpoint)
        if (data && data.login) {
          templateData.data = [data]
          templateData.message = `User Git-Hub Profile for user id(${id})`
          new APIResponse(res, templateData.data, templateData.message).json()
        }
        else {
          templateData.data = { error: 'USER_NOT_FOUND' }
          templateData.message = `The requested User for user id(${id}) is not found in Git-Hub.`
          new APIError(res, templateData.data, templateData.message, 404).json()
        }
      }
      catch (error) {
        const { response } = error
        if (response && response.status && (response.status == 404) && response.statusText && (response.statusText == 'Not Found')) {
          templateData.data = { error: 'USER_NOT_FOUND' }
          templateData.message = `The requested User for user id(${id}) is not found in Git-Hub.`
          new APIError(res, templateData.data, templateData.message, 404).json()
        }
        else {
          new APIError(res, { error: 'INTERNAL_SERVER_ERROR' }, "Internal Server Error Occured!!").json()
        }
      }
    }
    else {
      templateData.data = { error: 'MISSING_ID_PARAMETER' }
      templateData.message = 'Missing User Id parameter.'
      new APIError(res, templateData.data, templateData.message).json()
    }
  }
  catch (error) {
    new APIError(res, { error: 'INTERNAL_SERVER_ERROR' }, "Internal Server Error Occured!!").json()
  }
}
