import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
const addNewsApiUrl = `${process.env.REACT_APP_NODE_API_DOMAIN}${process.env.REACT_APP_NODE_ADD_NEWS_API_URL}`

export default function AdminDashboard() {
  const [newsTitle, setNewsTitle] = useState('');
  const [newsData, setNewsData] = useState('');
  // Submit handler states
  const [successMessages, setSuccessMessages] = useState({})
  const [errorMessages, setErrorMessages] = useState({})
  const logoutDashboard = (e) => {
    e.preventDefault()
    if (window.sessionStorage.getItem('access-token')) {
      window.sessionStorage.removeItem('access-token')
    }
    window.location.reload();
  }
  // Form Submit Handler
  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault()
    //axios.post(registerApiUrl, { fname, lname, email, password })
  }
  // Generate JSX code for message
  const renderMessage = (name, messageSetion = 'field', messageType = 'error') => {
    const messagesData = (messageType == 'success') ? successMessages : errorMessages
    return name === messagesData.name && (
      <div className={`${messageSetion}-message ${messageType}`}>{messagesData.message}</div>
    );
  }
  return (
    <div className="inner-container">
      <div className='logout'>
        <a href='#' className="logout" onClick={logoutDashboard}>Logout</a>
      </div>
      <div className='header'>
        <div className="text">Add News</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {renderMessage("header_error", 'header')}
        <form onSubmit={handleSubmit}>
          <div className="input">
            <input
              type="text"
              name="news_title"
              value={newsTitle}
              placeholder='News Ttitle'
              onChange={(e) => setNewsTitle(e.target.value)}
              required
            />
            {renderMessage("news_title")}
          </div>
          <div className="input">
            <input
              type="textarea"
              name="news_data"
              value={newsData}
              placeholder='News Data'
              onChange={(e) => setNewsData(e.target.value)}
              required
            />
            {renderMessage("news_data")}
          </div>
          <div className="button">
            <input className="submit-button" type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
