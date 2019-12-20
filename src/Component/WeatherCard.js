import React from 'react';

class WeatherCard extends React.Component {

  render() {
    return (
      <figure className={this.props.className} onClick = {this.props.click}>
        <div>{this.props.day}</div>
        <img src={this.props.image} alt="" />
        <figcaption>
        {this.props.high_temp}° {this.props.low_temp}°
        </figcaption>
      </figure>
    );
  }
}

export default WeatherCard;