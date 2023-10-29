import { OrderModel } from '../schema/schema.js'
import { APIResponse, APIError } from '../utils/response_formatter.js'

// Add Order Page
export async function addOrderPage(req, res) {
  res.render("user/add_order", { title: 'Add Order' })
}

// Add Order Post
export async function addOrder(req, res) {
  try {
    const { body } = req
    const newOrder = new OrderModel(body)
    await newOrder.save()
    res.redirect('/user/order-placed')
  } catch (error) {
    res.redirect('/user/order-error')
  }
}

// Placed Order Page
export async function placedOrderPage(req, res) {
  res.render("user/order_placed", { title: 'Order Placed' })
}

// Placed Order Page
export async function orderErrorPage(req, res) {
  res.render("user/order_error", { title: 'Order Error' })
}