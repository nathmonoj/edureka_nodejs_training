import { Router } from 'express'
import * as userController from "../controller/user_controller.js"

const UserRoute = Router()

UserRoute.get('/add-order', userController.addOrderPage)
UserRoute.get('/order-placed', userController.placedOrderPage)
UserRoute.get('/order-error', userController.orderErrorPage)
UserRoute.post('/add-order', userController.addOrder)

export default UserRoute

