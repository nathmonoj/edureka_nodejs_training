import express from "express";
import * as apiController from "../controller/api_controller.js"


export async function serverInit() {
  const server = express();
  const port = 3000;

  server.use(express.json());

  server.post('/movies/add', apiController.addMovie)


  server.listen(port, (err) => {
    if (err) throw err
    console.log(`Application server started at: http://localhost:${port}`)
  })

}