import React, { Component } from 'react';

import SwapiServices from '../../services/SwapiServices';

import './RandomPlanet.css';

export default class RandomPlanet extends Component {

  constructor() {
    super();
    this.updatePlanet();
  };

  state = {
    planet: {}
  };

  SwapiServices = new SwapiServices();

  render() {
    const { planet: {id, population, rotationPeriod, diameter} } = this.state;
    
    return (
      <div className="random-planet jumbotron rounded">
        <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
        <div>
          <h4></h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  onPlanetLoaded = (planet) => {
    this.setState({planet});
  };

  updatePlanet() {
    const id = Math.floor(Math.random()*18) + 2;
    this.SwapiServices.getPlanet(id).then(this.onPlanetLoaded);
  };
}
