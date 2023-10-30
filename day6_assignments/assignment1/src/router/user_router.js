import { Router } from 'express'
import * as userController from "../controller/user_controller.js"

const UserRoute = Router()

UserRoute.get('/add-bug', userController.addBugPage)
UserRoute.get('/bug-created', userController.bugCreatedPage)
UserRoute.get('/bug-error', userController.bugErrorPage)
UserRoute.post('/add-bug', userController.addBug)

export default UserRoute

