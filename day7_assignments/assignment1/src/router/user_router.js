import { Router } from 'express'
import * as userController from "../controller/user_controller.js"

const UserRoute = Router()

// Registration Routes
UserRoute.get('/register', userController.userRegisterPage)
UserRoute.post('/register', userController.registerUser)



// Login Routes
UserRoute.get('/login', userController.userLoginPage)
UserRoute.post('/login', userController.loginUser)
UserRoute.get('/logout', userController.logoutUser)
UserRoute.get('/dashboard', userController.userLoggedInPage)
UserRoute.get('/registered', userController.userRegisteredPage)
UserRoute.get('/error', userController.userErrorPage)

export default UserRoute

