import React, { Component } from 'react';
import './App.css';
import SocialCard from '../SocialCard';
import Weather from '../WeatherData';
import Images from '../WeatherImages';
import axios from 'axios'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


class App extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }
  componentDidMount() {
    const headers = {}
    axios.get('https://samples.openweathermap.org/data/2.5/forecast?id=4463523&appid=0b29cfcd03adcc33d49070a396e7723a',headers )
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
    // fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=10`)
    //   .then(res => res.json())
    //   .then(json => this.setState({ data: json }));
  }
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