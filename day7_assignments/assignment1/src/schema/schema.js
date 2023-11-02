import { Schema, model } from 'mongoose'
const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: String
  },
  {
    timestamps: true
  })

const UserModel = model('users', UserSchema)

export { UserModel, UserSchema }