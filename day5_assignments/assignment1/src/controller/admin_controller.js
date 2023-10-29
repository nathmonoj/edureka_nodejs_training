import { OrderModel } from '../schema/schema.js'
import moment from 'moment'

// Add Order Page
export async function dashboardPage(req, res) {
  try {
    const orders = await OrderModel.find({})
    res.render("admin/order_status", { title: 'Order Status', moment: moment, orders: orders })
  }
  catch (err) {
    res.render("admin/order_error", { title: 'Order Error' })
  }
}