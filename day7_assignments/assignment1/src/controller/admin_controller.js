import { UserModel } from '../schema/schema.js'
import { jwtTokenVerifier } from "../utils/common.js";
import moment from 'moment'

// Add Bug Page
export async function dashboardPage(req, res) {
  let userSession = req.session && req.session && req.session.user;
  if (userSession && (userSession.role == 'admin') && userSession && userSession.loggedIn && userSession.jwtToken) {
    const userData = await jwtTokenVerifier(userSession.jwtToken)
    if (userData._id) {
      req.session.user = userSession = { ...req.session.user, data: userData }
      req.session.save(async function (err) {
        const userList = await UserModel.find({})
        res.render("admin/logged_in", { title: 'Admin Dashboard', moment: moment, user: userSession.data, userList })
      })
    }
    else {
      res.redirect('/user/login')
    }
  }
  else {
    res.redirect('/user/login')
  }
}