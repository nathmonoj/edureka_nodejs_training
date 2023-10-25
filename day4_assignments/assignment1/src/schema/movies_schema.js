import { Schema, model } from 'mongoose'
const MoviesSchema = new Schema({
  name: String,
  genre: String,
  rating: Schema.Types.Decimal128,
  language: String,
  achievements: String
})

const MoviesModel = model('movies', MoviesSchema, 'movies')

export { MoviesModel, MoviesSchema }