import React, { Component } from 'react';
import './App.css';
import AirportsForm from './components/airportsForm';
import MapContainer from './components/mapContainer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // this value will eventually render the distance in Nautical miles 
      distance: "Please enter two U.S. Airports"
    }
  }

  state = {};

  componentDidMount() {
    // an inelegant solution to window.google not loading before the initial render()
    window.setTimeout(() => this.forceUpdate(), 2000);
  }

//  ECMAScript 2015 syntax to keep parent scope this
  onPlaceOneChange = (airport1) => {
    this.setState({airport1})
  };

  onPlaceTwoChange = (airport2) => {
    this.setState({airport2})
  };

  calculateDistance = () => {


    let distance;
    const lat = this.state.airport1.geometry.location.lat;
    this.setState({distance: "Distance between airports: " + distance + " Nautical miles" })
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Airport Calculator</h2>
        </div>
        <p className="App-intro">
          To get started, enter two airports in the United States.
        </p>
          <div className='flex'>
            {window.google && <AirportsForm google={window.google} onPlaceChange={this.onPlaceOneChange} />}
            {window.google && <AirportsForm google={window.google} onPlaceChange={this.onPlaceTwoChange} />}
            <button className="button" onClick={this.calculateDistance}>Calculate</button>
          </div>
          <br></br>
          {this.state.distance}
          <br></br>
          <br></br>
           <MapContainer />
          <text className="signature">Nathaniel Sandler</text>
       </div>
    );


}
}

export default App;
