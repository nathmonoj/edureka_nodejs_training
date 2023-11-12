import mongoConnect from './src/connector/connector.js'
import nodeServer from './src/server/server.js'
const NODE_APP_PORT = parseInt(process.env.NODE_APP_PORT)

// Connecting to the Mongo DB
const mongoClient = await mongoConnect()

// Initiating the Node server lister
nodeServer.listen(NODE_APP_PORT, (err) => {
  if (err) throw err
  console.log(`Node Application started at: http://localhost:${NODE_APP_PORT}`)
})
