import React from 'react';
import './App.css';
import MapContainer from './components/mapContainer';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {};


  componentDidUpdate() {
    this.google = window.google
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Airport Calculator</h2>
        </div>
          <MapContainer />
          <text className="signature">Nathaniel Sandler</text>
       </div>
    );


}
}

export default App;
