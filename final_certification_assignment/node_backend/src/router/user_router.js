import { Router } from 'express'
import * as userValidator from "../middleware/user_validator.js"
import * as userController from "../controller/user_controller.js"

const UserRoute = Router()

// Registration Routes
UserRoute.post('/register', userValidator.RegBodyValidator, userController.register)

// Login Routes
UserRoute.post('/login', userValidator.LoginBodyValidator, userController.login)

export default UserRoute

