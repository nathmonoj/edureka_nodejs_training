import express from "express";
import MoviesRoute from "../router/router.js";


export async function serverInit() {
  const server = express()
  const port = 3000

  server.use(express.json())
  server.use('/movies', MoviesRoute)

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`Application server started at: http://localhost:${port}`)
  })

}