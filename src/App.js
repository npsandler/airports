import React, { Component } from 'react';
import './App.css';
import AirportsForm from './components/airportsForm';
import MapContainer from './components/mapContainer';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {};

  componentDidMount() {
    // an inelegant solution to window.google not loading before the initial render()
    window.setTimeout(() => this.forceUpdate(), 2000);
  }

//  ECMAScript 2015 syntax to keep parent scope this
  onPlaceOneChange = (place) => {
    this.setState({place1: place})
  };

  onPlaceTwoChange = (place) => {
    this.setState({place2: place})
  };

  calculateDistance() {
    console.log("CALCULATING")
  }

  render() {
    console.log(this.state)
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
          </div>
          <br></br>
          <button onClick={this.calculateDistance()}>Calculate</button>
          <br></br>
           <MapContainer key={1}/>
          <text className="signature">Nathaniel Sandler</text>
       </div>
    );


}
}

export default App;
