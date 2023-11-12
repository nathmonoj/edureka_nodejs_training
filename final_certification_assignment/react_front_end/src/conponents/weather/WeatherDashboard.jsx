import React, { useState, useEffect } from 'react'
import { countries } from 'country-data';
import moment from 'moment';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import '../Style/weatherStyle.css'
const weatherApiUrl = `${process.env.REACT_APP_NODE_API_DOMAIN}${process.env.REACT_APP_NODE_WEATHER_API_URL}`

export default function WeatherDashboard() {
  // State for the Latitude and Longitude.
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')
  const [weatherData, setWeatherData] = useState([])
  const [weatherDataFetchStatus, setWeatherDataFetchStatus] = useState('fetching')
  const fetchData = async () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
    if (lat && long) {
      try {
        const actualWeatherApiUrl = `${weatherApiUrl}?lat=${lat}&long=${long}`
        console.log(lat, long)
        const weatherResponse = await axios.get(actualWeatherApiUrl)
        let { data } = weatherResponse
        if (data && data.data && data.data[0]) {
          setWeatherData(data.data[0])
          setWeatherDataFetchStatus('')
        }
      }
      catch (err) {
      }
    }
  }
  useEffect(() => {
    fetchData()

  }, [lat, long]);
  return (
    <div className="inner-container" >
      <div className='header'>
        <div className="text">Latest-Weather-Update</div>
        <div className="underline"></div>
      </div>
      <div className="weather-inner-wrapper inner-content">
        {(typeof weatherData.main != 'undefined') ? (
          <WeatherCard weatherData={weatherData} />
        ) : (weatherDataFetchStatus == 'fetching') ? (
          <div className="loader"></div>
        ) : (
          <div className="weather-actual-content no-content">No Weather Data To be Displayed</div>
        )}
      </div>
    </div >
  )
}
