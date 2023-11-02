import { UserModel } from '../schema/schema.js'
import moment from 'moment'

// Add Bug Page
export async function dashboardPage(req, res) {
  var userSession = req.session && req.session;
  if (userSession.user && userSession.user && userSession.user.loggedIn && (userSession.user.role == 'admin')) {
    const userList = await UserModel.find({})
    console.log(userList)
    res.render("admin/logged_in", { title: 'Admin Dashboard', moment: moment, user: userSession.user, userList })
  }
  else {
    res.redirect('/user/login')
  }
}