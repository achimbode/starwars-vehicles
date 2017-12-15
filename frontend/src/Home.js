import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import urlify from './util/urlify';

class Home extends Component {

  constructor(props){
    super(props);
    this.curPage = 1;
    this.apiHasNextPage = true;
    this.state = {
      vehicles: [],
    };
    this.fetchVehicles = this.fetchVehicles.bind(this);
    this.pushVehicles = this.pushVehicles.bind(this);
    this.fetchVehicles();
  }

  pushVehicles() {
    var vehicles = JSON.stringify(this.props.vehicles);
    console.log('POSTING vehicles...!');
    fetch("http://localhost:8000/",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: vehicles
    })
   }

  fetchVehicles(fromSource = "api") {
    console.log('fetching from source ' + fromSource);
    if(fromSource === "api") {
      fetch('https://swapi.co/api/vehicles/?page=' + this.curPage++)
      .then(response => response.json())
      .then(data => {
        this.apiHasNextPage = data.next !== null;
        this.props.addVehicles(data.results);
      });
    } else {
      fetch('http://localhost:8000')
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data));
        this.apiHasNextPage = data.next !== null;
        this.props.addVehicles(data.results);
      });
    }
  }

  renderVehiclesList() {
    console.log(this.props.vehicles);
    var vehicles = this.props.vehicles;
    let vehicleDivs = vehicles.map((vehicle, i) => {
      return (
        <div className="vehicle-card" key={i}>
          {vehicle.name}
        </div>
      );
    }); // vehicles.map
    return vehicleDivs;
  }

  render() {
    return (
      <div className="Home">
        <div className="more">
          <button onClick={() => this.fetchVehicles('localhost')}>get local</button>
          <button onClick={this.pushVehicles}>push local</button>
          <button onClick={() => this.fetchVehicles('api')}>get more!</button>
        </div>
        <div className="vehicles-list">
          {this.renderVehiclesList()}
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  vehicles: Object.values(state.vehicles)
});

const mapDispatchToProps = (dispatch) => ({
  addVehicles: (vehiclesObj) => dispatch({ type: 'ADD_VEHICLES', vehicles: vehiclesObj })
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// fetch("http://localhost:8000/",
// {
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     method: "POST",
//     body: JSON.stringify({a: 1, b: 2, results:[{name:'Achim', url:'www.achimbo.de'}]})
// })

const demodata = `{"results":[
{
"name": "Rennstrecke bloodyBody",
"model": "Bloody shit",
"manufacturer": "Mother nature",
"cost_in_credits": "150000",
"length": "36.8",
"max_atmosphering_speed": "30",
"crew": "46",
"passengers": "30",
"cargo_capacity": "50000",
"consumables": "2 months",
"vehicle_class": "wheeled",
"pilots": [],
"films": [
"https://swapi.co/api/films/5/",
"https://swapi.co/api/films/1/"
],
"created": "2014-12-10T15:36:25.724000Z",
"edited": "2014-12-22T18:21:15.523587Z",
"url": "https://swapi.co/api/vehicles/4/"
},
{
"name": "Cookie monster monsterbike",
"model": "T-16 skyhopper",
"manufacturer": "Incom Corporation",
"cost_in_credits": "14500",
"length": "10.4",
"max_atmosphering_speed": "1200",
"crew": "1",
"passengers": "1",
"cargo_capacity": "50",
"consumables": "0",
"vehicle_class": "repulsorcraft",
"pilots": [],
"films": [
"https://swapi.co/api/films/1/"
],
"created": "2014-12-10T16:01:52.434000Z",
"edited": "2014-12-22T18:21:15.552614Z",
"url": "http://grist.org/living/c-is-for-completely-awesome-cookie-monster-bike/"
}
]
}`
