import { Router } from 'express'
import * as adminController from "../controller/admin_controller.js"

const AdminRoute = Router()

AdminRoute.get('/dashboard', adminController.dashboardPage)

export default AdminRoute

