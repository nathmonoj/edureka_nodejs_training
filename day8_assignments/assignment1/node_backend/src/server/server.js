import express from "express";
import cors from 'cors'
import bodyParser from "body-parser"

import UserRoute from "../router/user_router.js"

import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { IOHandler } from '../socketio_server/socket_handler.js'

import dotenv from "dotenv";
dotenv.config();

export async function serverInit() {
  const port = 4000
  // Generating the API Server
  const apiServer = express()

  // Generating the Socket IO Server
  const httpServer = http.createServer(apiServer)
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*",
    },
  })

  IOHandler(io)

  apiServer.use(cors({
    origin: '*'
  }));

  apiServer.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // Startin the API Server
  apiServer.use(express.json())

  apiServer.use(bodyParser.urlencoded({
    extended: true
  }))

  apiServer.use('/user', UserRoute)

  httpServer.listen(port, (err) => {
    if (err) throw err
    console.log(`Application server started at: http://localhost:${port}`)
  })

}