import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {convertToFahrenheit, checkWeatherType, getWeatherImg} from '../Helpers/helpers.js'
import WeatherCard from './WeatherCard.js';

import './App.css';

class YourComponent extends Component {
    render() {
      const currDay     = this.props.history.location.state.currDay;
      const weatherData = this.props.history.location.state.data[currDay];
      const HourList = [];
      let index         = 0;

      for (let i = 0; i < weatherData.data.length; i++){
        let lowTemp     = convertToFahrenheit(weatherData.data[i].temp_min);
        let highTemp    = convertToFahrenheit(weatherData.data[i].temp_max);
        let weatherType = checkWeatherType(weatherData, i);
        let weatherImg  = getWeatherImg(weatherType);
        
        let socialCard = <WeatherCard key={index}
                            className = {'hour-card ' + weatherType}
                            day = {weatherData.hours[i]}
                            image={weatherImg}
                            low_temp = {lowTemp} 
                            high_temp = {highTemp} />

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