import { Schema, model } from 'mongoose'
const BugSchema = new Schema(
  {
    title: String,
    description: String,
    asignee: String,
  },
  {
    timestamps: true
  })

const BugModel = model('bug_trackers', BugSchema)

export { BugModel, BugSchema }