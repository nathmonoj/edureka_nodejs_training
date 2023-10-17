import express from "express";
import path from "path";
import * as apiController from "../controller/api_controller.js"


export async function serverInit() {
  const server = express();
  const port = 3000;

  server.set('view engine', 'ejs')
  server.set("views", path.join(process.cwd(), "src/views"))

  server.use(express.json());

  server.get("/employee-list", apiController.getEmployeeList)

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`Application server started at: http://localhost:${port}`)
  })

}