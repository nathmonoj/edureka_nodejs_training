import express from "express";
import cors from 'cors'
import bodyParser from "body-parser"
import dotenv from "dotenv";

import UserRoute from '../router/user_router.js'
import { weatherAPIRoute, newsAPIRoute } from '../router/app_api_router.js'

dotenv.config();

// Initialising the API Server
const nodeServer = express()

// Alowing CORS to the API Server
await nodeServer.use(cors({
  origin: '*'
}));
await nodeServer.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Startin the API Server
nodeServer.use(express.json())
nodeServer.use(bodyParser.urlencoded({
  extended: true
}))
nodeServer.use('/admin', UserRoute)
nodeServer.use('/weather/api/v1', weatherAPIRoute)
nodeServer.use('/news', newsAPIRoute)


export default nodeServer