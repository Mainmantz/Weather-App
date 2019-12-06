import React from 'react';

class SocialCard extends React.Component {

  render() {
    return (
      <section className="social-card"  onClick = {this.props.click}>
        <h2>
          {this.props.firstName} {this.props.lastName}
          <small>{this.props.email}</small>
        </h2>
        <img src={this.props.image} alt="" />
      </section>
    );
  }
}

export default SocialCard;