import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AirportsForm from './airportsForm.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Airport Calculator</h2>
        </div>
        <p className="App-intro">
          To get started, enter two airports in the United States.
        </p>
          <AirportsForm />
      </div>
    );
  }
}

export default App;
