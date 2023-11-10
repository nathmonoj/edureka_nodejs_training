import Bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from '../schema/schema.js'
import { APIResponse, APIError } from '../middleware/response_formatter.js'
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;
const PWD_HASH_SALT_ROUND = parseInt(process.env.PWD_HASH_SALT_ROUND)

// Register User
export async function register(req, res) {
  try {
    var { fname, lname, email, password } = req.body
    const user = await UserModel.findOne({ email })
    let templateData = { data: [], message: '' }
    let isError = false
    if (user) {
      isError = true
      templateData.data = { error: 'EMAIL_IN_USE' }
      templateData.message = 'This email is already in use'
    }
    else {
      const hashpassword = await Bcrypt.hash(password, PWD_HASH_SALT_ROUND)
      let newUser = new UserModel({ email, fname, lname, password: hashpassword })
      newUser = await newUser.save()
      const { _id, ...rest } = newUser
      var { password, __v, updatedAt, ...userData } = rest._doc
      templateData.data = [userData]
      templateData.message = 'User is created successfully'
    }
    if (!isError) {
      new APIResponse(res, templateData.data, templateData.message).json()
    }
    else {
      new APIError(res, templateData.data, templateData.message, 400).json()
    }
  } catch (error) {
    console.log(error)
    new APIError(res, { error: 'INTERNAL_SERVER_ERROR' }, "Internal Server Error Occured!!").json()
  }
}

// Get User/Users
export async function getPeopleDetails(req, res) {
  try {
    const { params } = req;
    const { id } = params;
    let templateData = { data: [], message: '' }
    if (id) {
      try {
        const user = await UserModel.findById(id)
        if (user) {
          templateData.data = [user]
          templateData.message = `User Profile for user id(${id})`
          new APIResponse(res, templateData.data, templateData.message).json()
        }
        else {
          templateData.data = { error: 'USER_NOT_FOUND' }
          templateData.message = 'The requested User is not found.'
          new APIError(res, templateData.data, templateData.message, 404).json()
        }
      }
      catch (error) {
        templateData.data = { error: 'USER_NOT_FOUND' }
        templateData.message = 'The requested User is not found.'
        new APIError(res, templateData.data, templateData.message, 404).json()
      }
    }
    else {
      const users = await UserModel.find({})
      templateData.data = [users]
      templateData.message = 'All User Profiles'
      new APIResponse(res, templateData.data, templateData.message).json()
    }
  } catch (error) {
    new APIError(res, { error: 'INTERNAL_SERVER_ERROR' }, "Internal Server Error Occured!!").json()
  }
}

// Update User
export async function updatePerson(req, res) {
  try {
    const { params, body } = req;
    const { id } = params;
    let templateData = { data: [], message: '' }
    if (body.password) {
      body.password = await Bcrypt.hash(body.password, PWD_HASH_SALT_ROUND);
    }
    let user = await UserModel.findByIdAndUpdate({ _id: id }, body)
    user = await UserModel.findById({ _id: id }, '-password -__v')
    templateData.data = [user]
    templateData.message = 'User updated successfully'
    new APIResponse(res, templateData.data, templateData.message).json()
  } catch (error) {
    new APIError(res, { error: 'INTERNAL_SERVER_ERROR' }, "Internal Server Error Occured!!").json()
  }
}

// Delete User
export async function deletePerson(req, res) {
  try {
    const { params } = req;
    const { id } = params;
    let templateData = { data: [], message: '' }
    await UserModel.findByIdAndDelete(id);
    templateData.message = 'User deleted successfully'
    new APIResponse(res, templateData.data, templateData.message).json()
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
      new APIError(res, templateData.data, templateData.message, 404).json()
    }
  } catch (error) {
    new APIError(res, { error: 'INTERNAL_SERVER_ERROR' }, "Internal Server Error Occured!!").json()
  }
}
