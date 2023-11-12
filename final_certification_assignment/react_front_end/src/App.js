import { useState, useEffect } from 'react'
import './App.css'
import './conponents/Style/Style.css'
import Login from './conponents/Login'
import Register from './conponents/Register'
import WeatherDashboard from './conponents/weather/WeatherDashboard'
import AdminDashboard from './conponents/AdminDashboard'

function App() {
  const [tabAction, setTabAction] = useState('weather')
  const [loggedInState, setLoggedInState] = useState(false)
  const isLoggedIn = (data) => {
    if (data && data.loggedIn) {
      setLoggedInState(data && data.loggedIn)
    }
  }
  useEffect(() => {
    if (window.sessionStorage.getItem('access-token')) {
      setLoggedInState(true)
    }
  }, [])
  let adminComponent = null
  if (loggedInState) {
    adminComponent = (
      <div className='admin-container'>
        <AdminDashboard />
      </div>
    )
  }
  return (
    <div className='main-container' >
      {(adminComponent === null) ? (
        <div className={`${(!loggedInState) ? '' : 'hide-element'} anonymous-user-container`}>
          <div className='tab-container'>
            <span
              id='news'
              className={`${(tabAction == 'news') ? 'active-tab' : ''} tab-label`}
              onClick={() => { setTabAction('news') }}
            >
              Latest News
            </span>
            <span
              id='weather'
              className={`${(tabAction == 'weather') ? 'active-tab' : ''} tab-label`}
              onClick={() => { setTabAction('weather') }}
            >
              Weather-Update
            </span>
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
            <section className={`${(tabAction == 'news') ? '' : 'hide-element'} news-wrapper`} >
              <Login loggedInSetter={isLoggedIn} />
            </section>
            <section className={`${(tabAction == 'weather') ? '' : 'hide-element'} weather-wrapper`} >
              <WeatherDashboard />
            </section>
            <section className={`${(tabAction == 'sign-in') ? '' : 'hide-element'} sign-in-wrapper`} >
              <Login loggedInSetter={isLoggedIn} />
            </section>
            <section className={`${(tabAction == 'sign-up') ? '' : 'hide-element'} sign-up-wrapper`} >
              <Register />
            </section>
          </div>
        </div>
      ) : (
        <div className="admin-dashboard">{adminComponent}</div>
      )}
    </div >
  );
}

export default App;
