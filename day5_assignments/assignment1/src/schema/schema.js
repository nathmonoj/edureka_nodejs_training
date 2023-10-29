import { Schema, model } from 'mongoose'
const OrderSchema = new Schema(
  {
    fname: String,
    lname: String,
    address: String,
    email: String
  },
  {
    timestamps: true
  })

const OrderModel = model('orders', OrderSchema)

export { OrderModel, OrderSchema }