import React from 'react';
import AirportsForm from './airportsForm';
import { InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Map from './map';

class MapContainer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      // this value will eventually render the distance in Nautical miles
      distance: "To get started, enter two airports in the United States."
    };
     this.onMapClicked = this.onMapClicked.bind(this);
  }

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

    updateDistance = () => {
      if (this.state.airport1 && this.state.airport2) {
        const lat1 = this.state.airport1.geometry.location.lat();
        const lng1 = this.state.airport1.geometry.location.lng();
        const lat2 = this.state.airport2.geometry.location.lat();
        const lng2 = this.state.airport2.geometry.location.lng();
        const distance = this.calculateNauticalMiles(lat1, lng1, lat2, lng2);
        this.setState({distance: "Distance between airports: " + distance + " Nautical miles" });
        // this.createMarker(this.state.airport1)
        // this.createMarker(this.state.airport2)
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




  render() {

    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    // map to pass to autocomplete forms
    const map = this.props.google.maps
    
    return (
      <div>
        <p className="App-intro">
            {this.state.distance}
        </p>
        <div className='flex'>
          {window.google && <AirportsForm google={window.google} map={map} onPlaceChange={this.onPlaceOneChange} />}
          {window.google && <AirportsForm google={window.google} map={map} onPlaceChange={this.onPlaceTwoChange} />}
          <button className="button" onClick={this.updateDistance}>Calculate</button>
        </div>
        <Map google={this.props.google}
            style={{width: '75%', height: '75%', position: 'fixed'}}
            className={'map'}
            zoom={14}
            containerStyle={{}}
            centerAroundCurrentLocation={true}
            onClick={this.onMapClicked}
            onDragend={this.onMapMoved} />
        </div>
    )
  }

//  google maps boilerplate
  onMapMoved(props, map) {
    const center = map.center;
  }



  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onInfoWindowClose() {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
  }

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

};

export default GoogleApiWrapper({
  // free, sharable API key from FullstackReact.com
  apiKey: "AIzaSyCXzADzYNZ-dRKKhRrg0PgoGXE88O1FlTI"
})(MapContainer)
