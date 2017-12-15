import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import urlify from './util/urlify';
import Home from './Home';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span className="App-title">Meet the vehicles of the universe...</span>
        </header>
        <p className="App-intro">
          Star Wars Vehicles
        </p>
        <div className="body">
          <Home/>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  //vehicles: Object.values(state.vehicles)
});

const mapDispatchToProps = (dispatch) => ({
  //addVehicles: (vehiclesObj) => dispatch({ type: 'ADD_VEHICLES', vehicles: vehiclesObj })
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
