import { jwtTokenVerifier } from "../utils/helper.js";
var users = {};

export async function IOHandler(io) {
  io.on("connection", (socket) => {
    console.log(`New Client connected: ${socket.id}`)

    socket.on("sign_in", (jwtToken) => {
      if (jwtToken) {
        jwtTokenVerifier(jwtToken).then(
          user => {
            users[user._id] = socket
            socket.data = user._id
            socket.broadcast.emit("new_user", JSON.stringify(Object.keys(users)))
            socket.broadcast.emit("friend_list", JSON.stringify(Object.keys(users)))
          }
        )
      }
    });

    socket.on("send_message", (data) => {
      console.log('send_message')
      socket.broadcast.emit("receive_message", { ...data, sender: socket.data })
      socket.broadcast.emit("friend_list", JSON.stringify(Object.keys(users)))
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}
