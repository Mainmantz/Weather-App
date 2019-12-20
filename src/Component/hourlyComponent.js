import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {convertToFahrenheit, checkWeather} from '../Helpers/helpers.js'
import WeatherCard from './WeatherCard.js';

import './App.css';

class YourComponent extends Component {
    render() {
      const currDay     = this.props.history.location.state.currDay;
      const weatherData = this.props.history.location.state.data[currDay];
      const HourList = [];
      let index         = 0;

      for (let i = 0; i < weatherData.data.length; i++){
          let socialCard = <WeatherCard key={index}
                              className = {'hour-card '}
                              day = {weatherData.hours[i]}
                              image={checkWeather(weatherData, i)}
                              low_temp = {convertToFahrenheit(weatherData.data[i].temp_min)} 
                              high_temp = {convertToFahrenheit(weatherData.data[i].temp_max)} />

          HourList.push(socialCard);
          index++;
      }
      return (
          <div>
              <p>{currDay}'s hourly forecast</p>
              {HourList}
          </div>
      );
    }
}

export default withRouter(YourComponent);