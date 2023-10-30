import { BugModel } from '../schema/schema.js'
import dotenv from "dotenv";
dotenv.config();
const SUPPORT_TEAM = JSON.parse(process.env.SUPPORT_TEAM);

// Add Bug Page
export async function addBugPage(req, res) {
  res.render("user/add_bug", { title: 'Add Bug' })
}

// Add Bug Post
export async function addBug(req, res) {
  try {
    const keys = Object.keys(SUPPORT_TEAM)
    const randindex = Math.floor(Math.random() * keys.length)
    const randkey = keys[randindex]
    const supportGuy = SUPPORT_TEAM[randkey]
    let { body } = req
    body.asignee = supportGuy.email
    const newBug = new BugModel(body)
    await newBug.save()
    res.redirect('/user/bug-created')
  } catch (error) {
    res.redirect('/user/bug-error')
  }
}

// Placed Bug Page
export async function bugCreatedPage(req, res) {
  res.render("user/bug_created", { title: 'Bug Placed' })
}

// Placed Bug Page
export async function bugErrorPage(req, res) {
  res.render("user/bug_error", { title: 'Bug Error' })
}