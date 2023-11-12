import React, { useState, useEffect } from 'react'
import SocketIOClient from "socket.io-client";
const socket = SocketIOClient("http://localhost:4000")
let dashboardInitialised = false

export default function MessengerDashboard() {
  if (!dashboardInitialised) {
    socket.emit("sign_in", window.sessionStorage.getItem('access-token'))
    dashboardInitialised = true
  }

  const [chat, setChat] = useState([])
  const [message, setMessage] = useState([])
  const [friends, setFriends] = useState([])
  const [selectedFriend, setSelectedFriend] = useState('')

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat([...chat, data])
    });
    socket.on("new_user", (data) => {
      data = JSON.parse(data)
      setFriends(data);
    });
    socket.on("friend_list", (data) => {
      data = JSON.parse(data)
      setFriends(data);
    });
  }, [chat]);

  function sendMessage(e) {
    e.preventDefault();
    const messageToSend = { message, friend: selectedFriend }
    socket.emit("send_message", messageToSend)
    setMessage("");
    setChat([...chat, { ...messageToSend, isMyMessage: true }])
  }

  return (
    <div className="inner-container">
      <div className='header'>
        <div className="text">Messenger Dashboard</div>
        <div className="underline"></div>
      </div>
      <div className="messenger-inner-wrapper">
        <div className='friends-list'>
          <ul>
            {friends.map((friend, index) => {
              return (
                <li
                  style={{
                    fontWeight: friend === selectedFriend ? "bold" : "normal",
                  }}
                  onClick={() => {
                    setSelectedFriend(friend);
                  }}
                  key={index}
                >
                  {friend}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className='chat-box'>
        <div className='chat'>
          <ul>
            {chat.map((message, index) => {
              return (
                <li
                  key={index}
                  style={{ color: message.isMyMessage ? "blue" : "green" }}
                >
                  {console.log(message)}
                  {message.isMyMessage ? "me" : message.sender}: {message.message}
                </li>
              );
            })}
          </ul>
        </div>


        <div className='chat-form'>
          <form onSubmit={sendMessage}>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}
