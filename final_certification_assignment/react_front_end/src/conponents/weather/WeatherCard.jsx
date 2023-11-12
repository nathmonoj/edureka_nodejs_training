import React from 'react'
import { Button } from 'semantic-ui-react';
import { countries } from 'country-data';
import moment from 'moment';

export default function WeatherCard({ weatherData }) {
  const refresh = () => {
    window.location.reload();
  }
  const { all } = countries
  console.log(weatherData)
  console.log(countries)
  const country = (weatherData.sys && weatherData.sys.country && countries[weatherData.sys.country]) ? `(${countries[weatherData.sys.country].name})` : ''
  return (
    <div className="weather-actual-content">
      <div className="top">
        <p className="city">{weatherData.name}{country}</p>
      </div>

      <div className="flex">
        <p className="day">{moment().format('dddd')}, <span>{moment().format('LL')}</span></p>
        <p className="description">{weatherData.weather[0].main}</p>
      </div>
      <div className="flex">
        <p className="temp">Temprature: {weatherData.main.temp} &deg;C</p>
        <p className="temp">Humidity: {weatherData.main.humidity} %</p>
      </div>
      <div className="flex">
        <p className="sunrise-sunset">Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
        <p className="sunrise-sunset">Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
      </div>
    </div>
  )
}
