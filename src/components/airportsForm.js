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

    if (!google || !map) return;

    const aref = this.refs.autocomplete;
    const node = ReactDOM.findDOMNode(aref);
    var autocomplete = new google.maps.places.Autocomplete(node);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      this.setState({
        place: place,
        position: place.geometry.location
      });
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
              ref='autocomplete'
              type="text"
              placeholder="Enter a location" />
            <input
              type='submit'
              value='Go' />
          </form>
          <div>
            <div>Lat: {position && position.lat()}</div>
            <div>Lng: {position && position.lng()}</div>
          </div>
        </div>
        <div>
          <Map {...props}
              containerStyle={{
                position: 'relative',
                height: '75%',
                width: '75%'
              }}
              center={this.state.position}
              centerAroundCurrentLocation={false}>
                <Marker position={this.state.position} />
          </Map>
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
          className={'map', 'flex'}
          visible={false}>
            <AirportsForm {...props} />
            <AirportsForm {...props} />
      </Map>
    );
  }
}

export default MapWrapper
