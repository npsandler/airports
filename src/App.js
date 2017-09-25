import React from 'react';
import './App.css';
import AirportsForm from './components/airportsForm';
import MapContainer from './components/mapContainer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.google;
    this.state = {
      // this value will eventually render the distance in Nautical miles
      distance: "To get started, enter two airports in the United States."
    }
  }

  state = {};

  componentDidMount() {
    // an inelegant solution to window.google not loading before the initial render()
    window.setTimeout(() => this.forceUpdate(), 2000);

  }

  componentDidUpdate() {
    this.google = window.google
  }

//  ECMAScript 2015 syntax to keep parent scope this
  onPlaceOneChange = (airport1) => {
    this.setState({airport1})
  };

  onPlaceTwoChange = (airport2) => {
    this.setState({airport2})
  };

  updateDistance = () => {
    if (this.state.airport1 && this.state.airport2) {
      const lat1 = this.state.airport1.geometry.location.lat();
      const lng1 = this.state.airport1.geometry.location.lng();
      const lat2 = this.state.airport2.geometry.location.lat();
      const lng2 = this.state.airport2.geometry.location.lng();
      const distance = this.calculateNauticalMiles(lat1, lng1, lat2, lng2);
      this.setState({distance: "Distance between airports: " + distance + " Nautical miles" });
      this.createMarker(this.state.airport1)
      this.createMarker(this.state.airport2)
    } else {
      this.setState({distance: "Try again, Please enter two Airports in the United States"});
    }
  }

  // computation adapted from http://www.geodatasource.com/developers/javascript
  calculateNauticalMiles(lat1, lng1, lat2, lng2) {
  	let radlat1 = Math.PI * lat1/180;
  	let radlat2 = Math.PI * lat2/180;
  	let theta = lng1-lng2;
  	let radtheta = Math.PI * theta/180;
  	let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  	dist = Math.acos(dist);
  	dist = dist * 180/Math.PI;
  	dist = dist * 60 * 1.1515;
  	dist = dist * 0.8684;
    dist = Math.round(dist)
  	return dist;
  }

  createMarker(place) {
    debugger
      var placeLoc = place.geometry.location;
      var marker = new this.google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
    }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Airport Calculator</h2>
        </div>
        <p className="App-intro">
            {this.state.distance}
        </p>
          <div className='flex'>
            {window.google && <AirportsForm google={window.google} onPlaceChange={this.onPlaceOneChange} />}
            {window.google && <AirportsForm google={window.google} onPlaceChange={this.onPlaceTwoChange} />}
            <button className="button" onClick={this.updateDistance}>Calculate</button>
          </div>
          <MapContainer createMarker={this.createMarker}/>
          <text className="signature">Nathaniel Sandler</text>
       </div>
    );


}
}

export default App;
