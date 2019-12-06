import React, { Component } from 'react';
import './App.css';
import SocialCard from '../SocialCard';
import People from '../PeopleData';

class App extends Component {
  cardClicked = (item,e) => {
    console.log(item);
    alert(item.first_name)
  }
  render() {
  
    const peopleList = People.map((person, index) =>
      <SocialCard key={index}
        firstName={person.first_name}
        lastName={person.last_name}
        email={person.email}
        image={person.image}
        click = {this.cardClicked.bind(this, person)} />
    );
    return (
      <div className="App">
        <p>social card: a stateless React component</p>
        {peopleList}
      </div>
    );
  }
}

export default App;