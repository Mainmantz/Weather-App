import React from 'react';

class SocialCard extends React.Component {

  render() {
    return (
      <figure className="social-card"  onClick = {this.props.click}>
        <div>{this.props.day}</div>
        <img src={this.props.image} alt="" />
        <figcaption>
        {this.props.high_temp}° {this.props.low_temp}°
        </figcaption>
      </figure>
    );
  }
}

export default SocialCard;