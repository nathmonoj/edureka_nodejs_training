import { Schema, model } from 'mongoose'
const NewsSchema = new Schema(
  {
    news_title: { type: String, required: true },
    news_data: { type: String, required: true }
  },
  {
    timestamps: true
  })

const NewsModel = model('news', NewsSchema)

export { NewsModel, NewsSchema }