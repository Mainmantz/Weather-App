import Images from './WeatherImages';


export const cardClicked = (day,e) => {
        console.log(day)
        alert(day)
    }
export const convertToFahrenheit = (temp) => {
    return ((temp - 273.15)* 1.8000+ 32.00).toFixed(0)
}
export const checkWeather = (Weather) => {
    if (Weather.weather[0].description.indexOf('cloud') > -1){
        return Images.cloud;
    }
    if (Weather.weather[0].description.indexOf('rain') > -1){
        return Images.rain;
    }
    if (Weather.weather[0].description.indexOf('sun') > -1){
        return Images.sunny;
    }
    else return Images.snow;
    }
export const dateStringToDay = (string) => {
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


export default {cardClicked , convertToFahrenheit, checkWeather, dateStringToDay};