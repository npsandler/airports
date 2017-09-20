import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  getInitialState() {
    return {
      origin: null,
      destination: null
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Airport Calculator</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <div className="root">
          <SearchForm>
            <Autocomplete name="origin"
              onPlaceChange={this.updateInput}/>
            <Autocomplete name="destination"
              onPlaceChange={this.updateInput}/>
            <UnitControls {...this.state}/>
          </SearchForm>
          <MapComponent google={this.props.google} {...this.state}/>
        </div>
      </div>
    );
  }



  updateInput(name, latLng) {
    let stateObj = {};
    stateObj[name] = latLng;
    this.setState(stateObj);
  }


}

export default App;
