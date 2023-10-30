import express from "express";
import bodyParser from "body-parser";
import UserRoute from "../router/user_router.js";
import AdminRoute from "../router/admin_router.js";
import path from "path";
import ejsExtended from 'express-ejs-extend'

export async function serverInit() {
  const server = express()
  const port = 3000

  server.set("view engine", "ejs");
  server.engine('ejs', ejsExtended)
  server.set('layout', path.join(process.cwd(), "src/views/html_layout"))
  server.set("views", path.join(process.cwd(), "src/views"));

  server.use(express.json())
  server.use(bodyParser.urlencoded({
    extended: true
  }));

  server.use('/user', UserRoute)
  server.use('/admin', AdminRoute)

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`Application server started at: http://localhost:${port}`)
  })

}