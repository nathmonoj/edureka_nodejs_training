import { Router } from 'express'
import * as Validator from "../middleware/validator.js"
import * as userController from "../controller/user_controller.js"

const UserRoute = Router()

// CURD Routes
// CREATE(Registration Routes)
UserRoute.post('/register', Validator.RegBodyValidator, userController.register)

// READ(Get/Read Routes)
UserRoute.get("/all", userController.getPeopleDetails)
UserRoute.get("/:id", userController.getPeopleDetails)

// UPDATE(Update Routes)
UserRoute.put("/:id", Validator.UpdateBodyValidator, userController.updatePerson)

// DELETE(Delete Routes)
UserRoute.delete("/:id", userController.deletePerson)

// Login Route
UserRoute.post('/login', Validator.LoginBodyValidator, userController.login)

export default UserRoute

