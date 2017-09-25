import React from 'react';
import ReactDOM from 'react-dom';

import {Marker} from 'google-maps-react';
import Map from './map';

class AirportsForm  extends React.Component{

  constructor(props) {

    super(props);
    this.state = {
      place: null,
      position: null
    };
    this.createMarker = this.createMarker.bind(this);
  }


  onSubmit(e) {
    e.preventDefault();
  }

  componentDidMount() {
    this.renderAutoComplete();
  }

  componentDidUpdate(prevProps) {
    const { map } = this.props;
    if (map !== prevProps.map) {
      this.renderAutoComplete();
    }
  }

  renderAutoComplete() {
    const {google, map} = this.props;
    if (!google || !map) {
      return;
    }
    const aref = this.refs.autocomplete;
    const node = ReactDOM.findDOMNode(aref);

    // options  to ensure that our autocomplete filters by American Airports
    const placeFilters = {
      componentRestrictions: { country: 'us'}
      // types: ['airport']
    }

    var autocomplete = new google.maps.places.Autocomplete(node, placeFilters);
    autocomplete.bindTo('bounds', map);
    // autocomplete.setTypes(['airport']);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      debugger
      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      this.props.onPlaceChange(place);
      this.createMarker(place);

      this.setState({
        place: place,
        position: place.geometry.location
      });
    });
  }

  createMarker(place) {
    const {google} = this.props
    const map =  new google.maps.Map(document.getElementById('map'))
    debugger
      var placeLoc = place.geometry.location;
      var marker = new Marker({
        map: map,
        position: placeLoc
      });
    }

  render() {
    const props = this.props;
    const {position} = this.state;

    return (
      <div>
        <div>
          <form onSubmit={this.onSubmit}>
            <input
              height = '20px'
              width = '50px'
              ref='autocomplete'
              type="text"
              placeholder="Enter a location" />
          </form>
        </div>
      </div>
    )
  }
}

class MapWrapper extends React.Component{
  render() {
    const props = this.props;
    const {google} = this.props;

    return (
      <Map google={google}
        id="map"
          height='50px !important'
          visible={false}>
            <AirportsForm {...props} />
      </Map>
    );
  }
}

export default MapWrapper
