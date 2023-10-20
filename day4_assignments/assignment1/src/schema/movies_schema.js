import { Schema, model } from 'mongoose'
const MoviesSchema = new Schema({
  name: String,
  genre: String,
  ratinng: Schema.Types.Decimal128,
  language: String
})

const MoviesModel = model('movies', MoviesSchema, 'movies')

export { MoviesModel, MoviesSchema }