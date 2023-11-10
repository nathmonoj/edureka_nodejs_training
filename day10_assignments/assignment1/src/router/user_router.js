import { Router } from 'express'
import * as userController from "../controller/user_controller.js"

const UserRoute = Router()

// Get User Info Route
UserRoute.get("/github-info", userController.getUserInfoDetails)
UserRoute.get("/github-info/:id", userController.getUserInfoDetails)

export default UserRoute

