import { Schema, model } from 'mongoose'
const UserSchema = new Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true
  })

const UserModel = model('users', UserSchema)

export { UserModel, UserSchema }