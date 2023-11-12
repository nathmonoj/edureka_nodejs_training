import Bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from '../schema/user_schema.js'
import { NewsModel } from '../schema/news_schema.js'
import { APIResponse, APIError } from '../middleware/response_formatter.js'
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

// Register User
export async function register(req, res) {
  try {
    var { fname, lname, email, password } = req.body;
    const user = await UserModel.findOne({ email })
    let templateData = { data: [], message: '' }
    let isError = false
    if (user) {
      isError = true
      templateData.data = { error: 'EMAIL_IN_USE' }
      templateData.message = 'This email is already in use'
    }
    else {
      const hashpassword = await Bcrypt.hash(password, 10);
      const role = 'admin'
      let newUser = new UserModel({ fname, lname, role, email, password: hashpassword })
      newUser = await newUser.save()
      const { _id, ...rest } = newUser
      var { password, __v, updatedAt, ...userData } = rest._doc
      templateData.data = [userData]
      templateData.message = `User is created successfully(With Role as ${role})`
    }
    if (!isError) {
      new APIResponse(res, templateData.data, templateData.message).json()
    }
    else {
      new APIError(res, templateData.data, templateData.message, 400).json()
    }
  } catch (error) {
    new APIError(res, { error: 'INTERNAL_SERVER_ERROR' }, "Internal Server Error Occured!!").json()
  }
}

export async function login(req, res) {
  try {
    const { email, password: password } = req.body;
    let user = await UserModel.findOne({ email }, '-__v -updatedAt')
    let templateData = { data: [], message: '' }
    if (user) {
      const { password: _password, _id, ...userData } = user
      const payload = await Bcrypt.compare(password, _password)
      if (payload) {
        const token = await jwt.sign({ id: _id }, SECRET_KEY)
        var { password: _excludedPwd, ...userProfile } = userData._doc
        templateData.data = [
          {
            'profile': userProfile,
            'token': token
          }
        ]
        templateData.message = 'User is Logged in successfully'
        new APIResponse(res, templateData.data, templateData.message).json()
      } else {
        templateData.data = { error: 'INVALID_CRED' }
        templateData.message = 'Invalid Credential.'
        new APIError(res, templateData.data, templateData.message, 400).json()
      }
    } else {
      templateData.data = { error: 'USER_NOT_FOUND' }
      templateData.message = 'The requested User is not found.'
      new APIError(res, templateData.data, templateData.message, 400).json()
    }
  } catch (error) {
    new APIError(res, { error: 'INTERNAL_SERVER_ERROR' }, "Internal Server Error Occured!!").json()
  }
}
