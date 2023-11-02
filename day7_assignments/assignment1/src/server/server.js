import express from "express";
import session from 'express-session'
import bodyParser from "body-parser";
import { userLoginPage } from "../controller/user_controller.js"
import UserRoute from "../router/user_router.js";
import AdminRoute from "../router/admin_router.js";
import path from "path";
import ejsExtended from 'express-ejs-extend'
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

export async function serverInit() {
  const server = express()
  const port = 3000
  server.set('trust proxy', 1) // trust first proxy
  server.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {}
  }))

  server.set("view engine", "ejs");
  server.engine('ejs', ejsExtended)
  server.set('layout', path.join(process.cwd(), "src/views/html_layout"))
  server.set("views", path.join(process.cwd(), "src/views"));

  server.use(express.json())
  server.use(bodyParser.urlencoded({
    extended: true
  }));

  server.get('/', userLoginPage)
  server.use('/user', UserRoute)
  server.use('/admin', AdminRoute)

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`Application server started at: http://localhost:${port}`)
  })

}