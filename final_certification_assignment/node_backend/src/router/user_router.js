import { Router } from 'express'
import * as Validator from "../middleware/validator.js"
import * as userController from "../controller/user_controller.js"

const UserRoute = Router()

// Registration Routes
UserRoute.post('/register', Validator.RegBodyValidator, userController.register)

// Login Routes
UserRoute.post('/login', Validator.LoginBodyValidator, userController.login)

export default UserRoute

