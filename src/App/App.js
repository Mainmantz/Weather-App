import React, { Component } from 'react';
import './App.css';
import SocialCard from '../Helpers/SocialCard';
import axios from 'axios'
import {cardClicked , convertToFahrenheit, checkWeather, dateStringToDay} from '../Helpers/helpers.js'


class App extends Component {
  constructor() {
    super();
    this.state = { data: [], cityName : '' };
  }
  componentDidMount() {
    this.WeatherList();
  }
  WeatherList() {
    axios.get('http://api.openweathermap.org/data/2.5/forecast?id=4463523&appid=0b29cfcd03adcc33d49070a396e7723a')
    .then(response => {
      
      const fiveDayWeather = this.formatFiveDayForecast(response.data.list);
      console.log(response.data.list)
      console.log(fiveDayWeather)
      this.setState({hourData : response.data.list, cityName : response.data.city.name, fiveDayData : fiveDayWeather})
    })
    .catch(error => {
      console.log(error);
    });
  }
  formatFiveDayForecast(data){
    data.forEach((obj) => {
      obj.day_text = dateStringToDay(obj.dt_txt);
    });

    const formattedWeatherDays = {};

    data.forEach((obj) => {
      if (!formattedWeatherDays.hasOwnProperty(obj.day_text)){
        formattedWeatherDays[obj.day_text] = {temps_low : [], temps_high : [], weather : obj.weather};
      }
      formattedWeatherDays[obj.day_text].temps_low.push(obj.main.temp_min);
      formattedWeatherDays[obj.day_text].temps_high.push(obj.main.temp_max);
    });

    for (let key in formattedWeatherDays){
      let minTemp = Math.min.apply(Math, formattedWeatherDays[key].temps_low);
      formattedWeatherDays[key].temps_low = minTemp

      let maxTemp = Math.max.apply(Math, formattedWeatherDays[key].temps_high);
      formattedWeatherDays[key].temps_high = maxTemp
    }

    return formattedWeatherDays;
  }
  render() {
    const weatherObj  = this.state.fiveDayData;
    const WeatherList = [];
    let index         = 0;
    for (let key in weatherObj){
      let currDay = weatherObj[key];
      let socialCard = <SocialCard key={index}
                        day = {key}
                        image={checkWeather(currDay)}
                        click = {cardClicked.bind(this, key)}
                        low_temp = {convertToFahrenheit(currDay.temps_low)} 
                        high_temp = {convertToFahrenheit(currDay.temps_high)} />

      WeatherList.push(socialCard)
      index++;
    }
    return (
      <div className="App">
        <p>{this.state.cityName}'s 5 Day Forecast</p>
        {WeatherList}
      </div>
    );
  }
}

export default App;