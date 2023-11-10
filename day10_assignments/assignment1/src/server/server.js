import express from "express"
import cors from 'cors'
import bodyParser from "body-parser"
import UserRoute from "../router/user_router.js"
import dotenv from "dotenv"
dotenv.config();

const server = await express()
await server.use(cors({
  origin: '*'
}));

await server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

await server.use(express.json())
await server.use(bodyParser.urlencoded({
  extended: true
}))

await server.use('/user', UserRoute)

export default server