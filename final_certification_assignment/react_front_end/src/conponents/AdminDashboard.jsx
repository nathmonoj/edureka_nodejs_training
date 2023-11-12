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
    await axios.post(addNewsApiUrl, { news_title: newsTitle, news_data: newsData })
      .then((response) => {
        setSuccessMessages({})
        setErrorMessages({})
        setSuccessMessages({ name: 'header_success', message: 'News is added successfully' })
      })
      .catch((error) => {
        setSuccessMessages({})
        setErrorMessages({})
        const error_code = error && error.response && error.response.data && error.response.data.data && error.response.data.data.error
        const message = error && error.response && error.response.data && error.response.data.message
        console.log(error)
        console.log(error_code)
        console.log(message)
        let fieldName = '';
        switch (error_code) {
          case 'NEWS_ALREADY_EXISTS':
          case 'INTERNAL_SERVER_ERROR':
            fieldName = 'header_error'
            break;
        }
        setErrorMessages({ name: fieldName, message: message })
      });

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
      {addNewsApiUrl}
      <div className='logout'>
        <a href='#' className="logout" onClick={logoutDashboard}>Logout</a>
      </div>
      <div className='header'>
        <div className="text">Add News</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {renderMessage("header_error", 'header')}
        {renderMessage("header_success", 'header', 'success')}
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
          </div>
          <div className="input input-textarea">
            <textarea
              name="news_data"
              value={newsData}
              placeholder='News Data'
              onChange={(e) => setNewsData(e.target.value)}
              required
            />
          </div>
          <div className="button">
            <input className="submit-button" type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
