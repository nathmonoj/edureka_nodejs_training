import { useState, useEffect } from 'react'
import './App.css'
import './conponents/Style/Style.css'
import Login from './conponents/Login'
import Register from './conponents/Register'
import MessengerDashboard from './conponents/MessengerDashboard'

function App() {
  const [tabAction, setTabAction] = useState('sign-in')
  const [loggedInState, setLoggedInState] = useState(false)
  const isLoggedIn = (data) => {
    console.log('data', data)
    if (data && data.loggedIn) {
      setLoggedInState(data && data.loggedIn)
    }
  }
  useEffect(() => {
    if (window.sessionStorage.getItem('access-token')) {
      setLoggedInState(true)
    }
  }, [])
  let messenGerComponent
  if (loggedInState) {
    console.log('pp')
    messenGerComponent = (
      <div className='messenger-container'>
        <MessengerDashboard />
      </div>
    )
  }


  return (
    <div className='main-container' >
      <div className={`${(!loggedInState) ? '' : 'hide-element'} login-register-container`}>
        <div className='tab-container'>
          <span
            id='sign-in'
            className={`${(tabAction == 'sign-in') ? 'active-tab' : ''} tab-label`}
            onClick={() => { setTabAction('sign-in') }}
          >
            Sign In
          </span>
          <span
            id='sign-up'
            className={`${(tabAction == 'sign-up') ? 'active-tab' : ''} tab-label`}
            onClick={() => { setTabAction('sign-up') }}
          >
            Sign Up
          </span>
        </div>
        <div className='section-wrapper'>
          <section className={`${(tabAction == 'sign-in') ? '' : 'hide-element'} sign-in-wrapper`} >
            <Login loggedInSetter={isLoggedIn} />
          </section>
          <section className={`${(tabAction == 'sign-up') ? '' : 'hide-element'} sign-up-wrapper`} >
            <Register />
          </section>
        </div>
      </div>
      {messenGerComponent}

    </div>
  );
}

export default App;
