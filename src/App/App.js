import React, { Component } from 'react';
import './App.css';
import SocialCard from '../SocialCard';
import Weather from '../WeatherData';
import Images from '../WeatherImages';

class App extends Component {
  cardClicked = (item,e) => {
    console.log(item);
    alert(item.first_name)
  }
  checkWeather = (Weather) => {
    console.log(Weather)
    if (Weather.low_temp > 40) return Images.sunny;
    else return Images.cloud;
  }
  render() {
    const WeatherList = Weather.map((Weather, index) =>
      <SocialCard key={index}
        day = {Weather.day}
        image={this.checkWeather(Weather)}
        click = {this.cardClicked.bind(this, Weather)}
        low_temp = {Weather.low_temp} 
        high_temp = {Weather.high_temp} />
    );
    return (
      <div className="App">
        <p>social card: a stateless React component</p>
        {WeatherList}
      </div>
    );
  }
}

export default App;