import React, { useState, useEffect } from 'react'
import axios from 'axios';
import user_icon from '../conponents/Assets/user.png'
import email_icon from '../conponents/Assets/email.png'
import pwd_icon from '../conponents/Assets/pwd.png'
const registerApiUrl = `${process.env.REACT_APP_NODE_API_DOMAIN}${process.env.REACT_APP_NODE_REGISTER_API_URL}`

export default function Register(props) {
  // States for registration
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Submit handler states
  const [successMessages, setSuccessMessages] = useState({})
  const [errorMessages, setErrorMessages] = useState({})

  // Form Submit Handler
  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault()
    console.log(registerApiUrl)
    axios.post(registerApiUrl, { fname, lname, email, password })
      .then((response) => {
        setSuccessMessages({})
        setErrorMessages({})
        setSuccessMessages({ name: 'header_success', message: 'User Registration is successfull' })
      })
      .catch((error) => {
        setSuccessMessages({})
        setErrorMessages({})
        const error_code = error && error.response && error.response.data && error.response.data.data && error.response.data.data.error
        const message = error && error.response && error.response.data && error.response.data.message
        let fieldName = '';
        switch (error_code) {
          case 'INVALID_EMAIL':
          case 'EMAIL_IN_USE':
            fieldName = 'email'
            break;
          case 'INVALID_CRED':
            fieldName = 'password'
            break;
          case 'INCORRECT_USER_DETAILS':
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
      <div className='header'>
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {renderMessage("header_error", 'header')}
        {renderMessage("header_success", 'header', 'success')}
        <form onSubmit={handleSubmit}>
          <div className="input">
            <img src={user_icon} alt="First Name" />
            <input
              type="text"
              name="fname"
              value={fname}
              placeholder='First Name'
              onChange={(e) => setFname(e.target.value)}
              required
            />
            {renderMessage("fname")}
          </div>
          <div className="input">
            <img src={user_icon} alt="Last Name" />
            <input
              type="text"
              name="lname"
              value={lname}
              placeholder='Last Name'
              onChange={(e) => setLname(e.target.value)}
              required
            />
            {renderMessage("lname")}
          </div>
          <div className="input">
            <img src={email_icon} alt="Email" />
            <input
              type="text"
              name="email"
              value={email}
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {renderMessage("email")}
          </div>
          <div className="input">
            <img src={pwd_icon} alt="User Password" />
            <input
              type="password"
              name="password"
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {renderMessage("pass")}
          </div>
          <div className="button">
            <input className="submit-button" type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
