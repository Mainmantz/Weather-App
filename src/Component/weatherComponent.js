import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import './App.css';
import WeatherCard from './WeatherCard.js';
import {formatFiveDayForecast, formatHourlyForecast, convertToFahrenheit, checkWeatherType, getWeatherImg} from '../Helpers/helpers.js'
import axios from 'axios'

const apiKey = '4463523&appid=0b29cfcd03adcc33d49070a396e7723a';

class YourComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {hourData : [], cityName : '', fiveDayData : [], referrer: '/forecast',};
      }
      componentDidMount() {
        axios.get('http://api.openweathermap.org/data/2.5/forecast?id='+apiKey)
        .then(response => {
          const fiveDayWeather = formatFiveDayForecast(response.data.list);
          const hourlyWeather  = formatHourlyForecast(response.data.list);
          this.setState({hourData : hourlyWeather, cityName : response.data.city.name, fiveDayData : fiveDayWeather });
        })
        .catch(error => {
          console.log(error);
        });
      }
    handleClick = (currDay, data, index) => {
        this.props.history.push('/daily'+index, {
            currDay: currDay,
            data : data
          })
    }

    render() {
        const hourlyData  = this.state.hourData;
        const weatherObj  = this.state.fiveDayData;
        const WeatherList = [];
        let index         = 0;
        for (let key in weatherObj){
            let currDay     = weatherObj[key];
            let lowTemp     = convertToFahrenheit(currDay.temps_low);
            let highTemp    = convertToFahrenheit(currDay.temps_high);
            let weatherType = checkWeatherType(currDay);
            let weatherImg  = getWeatherImg(weatherType);

            let socialCard = <WeatherCard key={index}
                            className = {'day-card ' + weatherType}
                            day = {key}
                            image={weatherImg}
                            click = {this.handleClick.bind(this, key, hourlyData, index)}
                            low_temp = {lowTemp} 
                            high_temp = {highTemp} />

            WeatherList.push(socialCard)
            index++;
        }
        return (
            <div>
              <p>Weekly Forecast</p>
                {WeatherList}
            </div>
        );
    }
}

export default withRouter(YourComponent);