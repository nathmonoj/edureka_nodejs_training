import mongoConnect from './src/connector/connector.js'
import server from './src/server/server.js'
const APP_PORT = parseInt(process.env.APP_PORT)

server.listen(APP_PORT, (err) => {
  if (err) throw err
  console.log(`Application started at: http://localhost:${APP_PORT}`)
})
const mongoClient = await mongoConnect()
/* mongoClient.close().then(() => {
  console.log('closed');
}); */


/* 
const appServerInstance = await serverInit()
appServerInstance.on("listening", function () {
  console.log(`Application Started at: http://localhost:${APP_PORT}`)
}) */
