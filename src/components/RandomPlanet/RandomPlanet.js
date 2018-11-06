import React, { Component } from 'react';

import SwapiServices from '../../services/SwapiServices';
import Spinner from '../Spinner/Spinner';
import PlanetView from './PlanetView/PlanetView';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';

import './RandomPlanet.css';

export default class RandomPlanet extends Component {

  state = {
    planet: {},
    loading: true,
    error: false
  };

  SwapiServices = new SwapiServices();

  render() {
    const { planet, loading, error } = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet}/> : null;

    return (
      <div className="random-planet jumbotron rounded">
        { errorMessage }
        { spinner }
        { content }
      </div>
    );
  };

  componentDidMount() {
    this.updatePlanet();
  };

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false
    });
  };

  updatePlanet() {
    const id = Math.floor(Math.random()*18) + 2;
    this.SwapiServices
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  };
}
