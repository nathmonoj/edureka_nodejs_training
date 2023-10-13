import express from "express";
import * as apiController from "../controller/api_controller.js"


export async function serverInit() {
  const server = express();
  const port = 4000;

  server.get("/get/user-list", async (req, res) => {
    const user_data = await apiController.listUsers()
    res.send(user_data);
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`Application server started at: http://localhost:${port}`)
  })

}