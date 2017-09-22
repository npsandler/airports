import React, { Component } from 'react';
import './App.css';
import AirportsForm from './components/airportsForm';
import MapContainer from './components/mapContainer';

class App extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    const map = <MapContainer key={1}/>

    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Airport Calculator</h2>
        </div>
        <p className="App-intro">
          To get started, enter two airports in the United States.
        </p>
          <AirportsForm google={global.google} map={MapContainer}/>
          <br></br>
           {map}
          <text className="signature">Nathaniel Sandler</text>
       </div>
    );
  }

}

export default App;
