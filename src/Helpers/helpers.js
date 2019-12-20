import Images from './WeatherImages';

export const cardClicked = (day,e) => {
        console.log(day)
        alert(day)
  }
export const convertToFahrenheit = (temp) => {
    return ((temp - 273.15)* 1.8000+ 32.00).toFixed(0)
  }
export const checkWeather = (Weather, i) => {
    if (!i){
      i = 0;
    }
    if (Weather.weather[i][0].description.indexOf('cloud') > -1){
        return Images.cloud;
    }
    if (Weather.weather[i][0].description.indexOf('rain') > -1){
        return Images.rain;
    }
    if (Weather.weather[i][0].description.indexOf('sun') > -1){
        return Images.sunny;
    }
    else return Images.snow;
  }
export const formatFiveDayForecast = (data) => {
  data.forEach((obj) => {
    obj.day_text = dateStringToDay(obj.dt_txt);
  });

  const formattedWeatherDays = {};

  data.forEach((obj) => {
    if (!formattedWeatherDays.hasOwnProperty(obj.day_text)){
      formattedWeatherDays[obj.day_text] = {temps_low : [], temps_high : [], weather : []};
    }
    formattedWeatherDays[obj.day_text].temps_low.push(obj.main.temp_min);
    formattedWeatherDays[obj.day_text].temps_high.push(obj.main.temp_max);
    formattedWeatherDays[obj.day_text].weather.push(obj.weather);
  });

  for (let key in formattedWeatherDays){
    let minTemp = Math.min.apply(Math, formattedWeatherDays[key].temps_low);
    formattedWeatherDays[key].temps_low = minTemp

    let maxTemp = Math.max.apply(Math, formattedWeatherDays[key].temps_high);
    formattedWeatherDays[key].temps_high = maxTemp
  }

  return formattedWeatherDays;
  }
export const formatHourlyForecast = (data) => {
  data.forEach((obj) => {
    obj.day_text = dateStringToDay(obj.dt_txt);
  });

  const formattedWeatherDays = {};

  data.forEach((obj) => {
    if (!formattedWeatherDays.hasOwnProperty(obj.day_text)){
      formattedWeatherDays[obj.day_text] = {data : [], hours : [], weather : []};
    }
    formattedWeatherDays[obj.day_text].data.push(obj.main);
    formattedWeatherDays[obj.day_text].weather.push(obj.weather);
    formattedWeatherDays[obj.day_text].hours.push((obj.dt_txt).substring(11,obj.dt_txt.length));

  });
  return formattedWeatherDays;
  }
const dateStringToDay = (string) => {
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var dayNum = new Date(string).getDay();
    return weekday[dayNum];
}


export default {formatFiveDayForecast, cardClicked , convertToFahrenheit, checkWeather};