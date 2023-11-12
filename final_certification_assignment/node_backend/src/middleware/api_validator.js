
import { APIError } from './response_formatter.js'
import dotenv from "dotenv";
dotenv.config();

export async function weatherQueryValidator(req, res, next) {
  try {
    const { query } = req
    const { lat, long } = query
    if (!query || !lat || !long) {
      new APIError(res, { error: "INCORRECT_QUERY_PARAM" }, 'lat/long query params is/are missing.').json();
    } else {
      next();
      return;
    }
  }
  catch (error) {
    new APIError(res, { error: 'INTERNAL_SERVER_ERROR' }, "Internal Server Error Occured!!").json();
  }

}