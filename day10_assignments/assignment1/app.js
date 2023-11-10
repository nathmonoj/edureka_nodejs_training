import server from './src/server/server.js'
const APP_PORT = parseInt(process.env.APP_PORT)

server.listen(APP_PORT, (err) => {
  if (err) throw err
  console.log(`Application started at: http://localhost:${APP_PORT}`)
})