import React, { Component } from 'react';
import './App.css';
import AirportsForm from './components/airportsForm.js'
import { Map } from 'google-maps-react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Airport Calculator</h2>
        </div>
        <p className="App-intro">
          To get started, enter two airports in the United States.
        </p>
          <AirportsForm />
          <AirportsForm />

          <button onClick="calculateDistance">Calculate distance</button>
          <Map google={global.google}/>
      </div>
    );
  }

  calculateDistance() {
    console.Log("clicked")
  }
}

export default App;
