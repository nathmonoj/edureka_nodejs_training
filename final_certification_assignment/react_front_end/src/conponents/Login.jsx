import React, { useState, useEffect } from 'react'
import axios from 'axios';
import email_icon from '../conponents/Assets/email.png'
import pwd_icon from '../conponents/Assets/pwd.png'
const loginApiUrl = `${process.env.REACT_APP_NODE_API_DOMAIN}${process.env.REACT_APP_NODE_LOGIN_API_URL}`

export default function Login(props) {
  // States for registration
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Submit handler states
  const [errorMessages, setErrorMessages] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Form Submit Handler
  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault()
    axios.post(loginApiUrl, { email, password })
      .then((response) => {
        const { data } = response
        const { profile, token } = data.data && data.data[0] && data.data[0]
        setErrorMessages({})
        if (token) {
          window.sessionStorage.setItem('access-token', token)
          props.loggedInSetter({ loggedIn: true, user: profile });
        }
        else {
          setErrorMessages({ name: 'header_error', message: 'Internal Server Error Occured!!' })
          props.loggedInSetter({ loggedIn: false });
        }
      })
      .catch((error) => {
        setErrorMessages({})
        const error_code = error && error.response && error.response.data && error.response.data.data && error.response.data.data.error
        const message = error && error.response && error.response.data && error.response.data.message
        let fieldName = '';
        console.log(error_code)
        switch (error_code) {
          case 'INVALID_EMAIL':
            fieldName = 'email'
            break;
          case 'INVALID_CRED':
            fieldName = 'password'
            break;
          case 'INCORRECT_USER_DETAILS':
          case 'USER_NOT_FOUND':
          case 'INTERNAL_SERVER_ERROR':
            fieldName = 'header_error'
            break;
        }
        setErrorMessages({ name: fieldName, message: message })
        props.loggedInSetter({ loggedIn: false });
      });

  }
  // Generate JSX code for message
  const renderMessage = (name, messageSetion = 'field') =>
    name === errorMessages.name && (
      <div className={`${messageSetion}-message error`}>{errorMessages.message}</div>
    );
  return (
    <div className="inner-container">
      <div className='header'>
        <div className="text">Sign In</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {renderMessage("header_error", 'header')}
        <form onSubmit={handleSubmit}>
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
            {renderMessage("password")}
          </div>
          <div className="button">
            <input className="submit-button" type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
