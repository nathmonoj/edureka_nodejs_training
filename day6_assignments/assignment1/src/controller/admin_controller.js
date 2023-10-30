import { BugModel } from '../schema/schema.js'
import moment from 'moment'

// Add Bug Page
export async function dashboardPage(req, res) {
  try {
    const bugs = await BugModel.find({})
    res.render("admin/bug_status", { title: 'Bug Status', moment: moment, bugs: bugs })
  }
  catch (err) {
    res.render("admin/bug_error", { title: 'Bug Error' })
  }
}