import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import './App.css';
import WeatherCard from './WeatherCard.js';
import {formatFiveDayForecast, formatHourlyForecast, convertToFahrenheit, checkWeather} from '../Helpers/helpers.js'
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
            let currDay = weatherObj[key];
            let socialCard = <WeatherCard key={index}
                            className = {'day-card'}
                            day = {key}
                            image={checkWeather(currDay)}
                            click = {this.handleClick.bind(this, key, hourlyData, index)}
                            low_temp = {convertToFahrenheit(currDay.temps_low)} 
                            high_temp = {convertToFahrenheit(currDay.temps_high)} />

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