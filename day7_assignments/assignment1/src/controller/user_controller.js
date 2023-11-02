import Bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from '../schema/schema.js'
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

// Register Page
export async function userRegisterPage(req, res) {
  res.render("user/register", { title: 'Register User', message: '' })
}

// Register User Post
export async function registerUser(req, res) {
  try {
    const { email, name, password, confirm_password } = req.body;
    const user = await UserModel.findOne({ email })
    let templateData = { title: 'Register User', message: '' }
    if (user) {
      templateData.message = { error: 'This email is already in use' }
      res.render('user/register', templateData)
    } else if (password !== confirm_password) {
      templateData.message = { error: 'Password and Confirm Password doesnot match' }
      res.render("user/register", templateData)
    }
    else {
      const hashpassword = await Bcrypt.hash(password, 10);
      const newUser = new UserModel({ email, name, password: hashpassword, role: 'user' })
      await newUser.save()
      res.redirect('/user/registered')
    }
  } catch (error) {
    res.redirect('/user/error')
  }
}
// User Created Page
export async function userRegisteredPage(req, res) {
  res.render("user/user_created", { title: 'Bug Placed' })
}
// Login Page
export async function userLoginPage(req, res) {
  req.session.destroy(function (err) {
    res.render("user/login", { title: 'User Login', message: '' })
  })
}

export async function loginUser(req, res) {
  try {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email })
      let templateData = { title: 'User Login', message: '' }
      if (user) {
        const { email, password: _password, name: _name, role, _id } = user
        const payload = await Bcrypt.compare(password, _password)
        if (payload) {
          const token = await jwt.sign({ id: _id }, SECRET_KEY)
          req.session.user = {
            name: _name,
            email: email,
            id: _id,
            loggedIn: true,
            token: token,
            role: role
          }
          req.session.save(function (err) {
            const redirectTo = (role == 'admin') ? '/admin/dashboard' : '/user/dashboard'
            console.log('role', role)
            console.log('redirectTo', redirectTo)
            res.redirect(redirectTo)
          })
        } else {
          templateData.message = { error: 'Invalid Credentials!!' }
          res.render("user/login", templateData)
        }
      } else {
        templateData.message = { error: 'User Not Found!!' }
        res.render("user/login", templateData)
      }
    } catch (error) {
      templateData.message = { error: 'Internal Server Error!!' }
      res.render("user/login", templateData)
    }
  } catch (error) {
    templateData.message = { error: 'Internal Server Error!!' }
    res.render("user/login", templateData)
  }
}
// Logged in Page
export async function userLoggedInPage(req, res) {
  var userSession = req.session && req.session;
  if (userSession.user && userSession.user && userSession.user.loggedIn) {
    res.render("user/logged_in", { title: 'User Logged In', user: userSession.user })
  }
  else {
    res.redirect('/user/login')
  }
}
export async function logoutUser(req, res) {
  req.session.destroy(function (err) {
    res.redirect('/user/login')
  })
}

// User Error Page
export async function userErrorPage(req, res) {
  res.render("user/user_error", { title: 'Internal Server Error!!' })
}